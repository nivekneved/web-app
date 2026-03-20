-- Function to handle booking creation (v1) - SECURE VERSION
CREATE OR REPLACE FUNCTION public.create_booking_v1(p_booking_data jsonb, p_items_data jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER -- Run with elevated privileges but validate permissions inside
AS $function$
DECLARE
  v_booking_id UUID;
  v_customer_id UUID;
  v_current_user_id UUID;
  v_is_valid_user BOOLEAN;
  v_result JSONB;
BEGIN
  -- Get the current user ID from the session
  v_current_user_id := auth.uid();
  
  -- Validate input data
  IF p_booking_data IS NULL OR p_items_data IS NULL THEN
    RAISE EXCEPTION 'Booking data cannot be null';
  END IF;
  
  -- Validate customer ownership (only allow current user or admin to create booking)
  v_customer_id := (p_booking_data->>'customer_id')::UUID;
  
  -- Check if the user is authorized to create a booking for this customer
  -- Either it's their own customer ID or they have admin rights
  IF v_current_user_id IS NOT NULL AND v_customer_id = v_current_user_id THEN
    v_is_valid_user := TRUE;
  ELSIF public.is_admin_or_staff() THEN
    v_is_valid_user := TRUE;
  ELSE
    -- For guest bookings, check if customer email matches authenticated user
    -- or if this is a new customer being created
    v_is_valid_user := EXISTS (
      SELECT 1 FROM public.customers 
      WHERE id = v_customer_id AND email = auth.email()
    );
  END IF;
  
  IF NOT v_is_valid_user THEN
    RAISE EXCEPTION 'Unauthorized: Cannot create booking for this customer';
  END IF;

  -- Validate required fields
  IF p_booking_data->>'start_date' IS NULL OR 
     p_booking_data->>'activity_type' IS NULL OR 
     p_booking_data->>'activity_name' IS NULL THEN
    RAISE EXCEPTION 'Required booking fields are missing';
  END IF;

  -- Validate date order
  IF (p_booking_data->>'start_date')::TIMESTAMP WITH TIME ZONE > 
     COALESCE((p_booking_data->>'end_date')::TIMESTAMP WITH TIME ZONE, (p_booking_data->>'start_date')::TIMESTAMP WITH TIME ZONE) THEN
    RAISE EXCEPTION 'Start date cannot be after end date';
  END IF;

  -- Insert the booking in a transaction
  INSERT INTO bookings (
    customer_id,
    start_date,
    end_date,
    status,
    payment_status,
    pax_adults,
    pax_children,
    amount,
    tax_amount,
    activity_type,
    activity_name,
    description,
    created_at,
    updated_at
  ) VALUES (
    v_customer_id,
    (p_booking_data->>'start_date')::TIMESTAMP WITH TIME ZONE,
    (p_booking_data->>'end_date')::TIMESTAMP WITH TIME ZONE,
    COALESCE(p_booking_data->>'status', 'pending'),
    COALESCE(p_booking_data->>'payment_status', 'pending'),
    GREATEST(COALESCE((p_booking_data->>'pax_adults')::INTEGER, 1), 1), -- At least 1 adult
    GREATEST(COALESCE((p_booking_data->>'pax_children')::INTEGER, 0), 0), -- Non-negative children
    GREATEST(COALESCE((p_booking_data->>'amount')::NUMERIC, 0), 0), -- Non-negative amount
    GREATEST(COALESCE((p_booking_data->>'tax_amount')::NUMERIC, 0), 0), -- Non-negative tax
    p_booking_data->>'activity_type',
    p_booking_data->>'activity_name',
    LEFT(p_booking_data->>'description', 2000), -- Limit description length
    COALESCE((p_booking_data->>'created_at')::TIMESTAMP WITH TIME ZONE, NOW()),
    NOW()
  ) RETURNING id INTO v_booking_id;

  -- Insert booking items in the same transaction
  INSERT INTO booking_items (
    booking_id,
    service_id,
    service_name,
    service_category,
    amount,
    created_at
  )
  SELECT 
    v_booking_id,
    (item->>'service_id')::UUID,
    LEFT(item->>'service_name', 255), -- Limit name length
    LEFT(item->>'service_category', 50), -- Limit category length
    GREATEST(COALESCE((item->>'amount')::NUMERIC, 0), 0), -- Non-negative amount
    NOW()
  FROM jsonb_array_elements(p_items_data) AS item
  WHERE item->>'service_id' IS NOT NULL 
    AND item->>'service_name' IS NOT NULL 
    AND item->>'service_category' IS NOT NULL;

  -- Build and return result
  v_result := jsonb_build_object(
    'id', v_booking_id,
    'success', TRUE,
    'customer_id', v_customer_id
  );

  RETURN v_result;
EXCEPTION 
  WHEN raise_exception THEN
    -- Re-raise custom exceptions
    RAISE;
  WHEN OTHERS THEN
    -- Log error and re-raise
    RAISE;
END;
$function$;