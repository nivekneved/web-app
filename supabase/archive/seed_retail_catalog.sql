-- Seed data for retail catalog functionality

-- Insert a super admin user (assuming we have a user with a known ID)
-- In practice, you would have created this user during auth setup
DO $$
DECLARE
    super_admin_user_id UUID := (SELECT id FROM auth.users LIMIT 1);  -- Using first user as example
BEGIN
    -- Insert super admin record if user exists
    IF super_admin_user_id IS NOT NULL THEN
        INSERT INTO public.admins (id, name, email, role, permissions)
        VALUES (
            super_admin_user_id,
            'System Administrator',
            (SELECT email FROM auth.users WHERE id = super_admin_user_id),
            'super_admin',
            '{"permissions": ["manage_products", "manage_categories", "manage_users", "manage_orders"]}'::jsonb
        ) ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;

-- Create product categories with hierarchy (Essentials > Accessories)
DO $$
DECLARE
    cat_essentials UUID;
    cat_accessories UUID;
BEGIN
    -- Insert Essentials category
    INSERT INTO public.product_categories (name, slug, description, image_url, display_order, is_active)
    VALUES (
        'Essentials',
        'essentials',
        'Travel essentials for your journey',
        '/categories/travel-essentials.jpg',
        1,
        true
    ) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO cat_essentials;

    -- Insert Accessories category as child of Essentials
    INSERT INTO public.product_categories (name, slug, description, parent_id, image_url, display_order, is_active)
    VALUES (
        'Accessories',
        'accessories',
        'Travel accessories to enhance your trip',
        cat_essentials,
        '/categories/accessories.jpg',
        2,
        true
    ) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO cat_accessories;

    -- Insert a few more sample categories
    INSERT INTO public.product_categories (name, slug, description, image_url, display_order, is_active)
    VALUES 
    ('Clothing', 'clothing', 'Travel clothing and apparel', '/categories/clothing.jpg', 3, true),
    ('Electronics', 'electronics', 'Travel electronics and gadgets', '/categories/electronics.jpg', 4, true),
    ('Health & Beauty', 'health-beauty', 'Travel health and beauty products', '/categories/health-beauty.jpg', 5, true)
    ON CONFLICT (slug) DO NOTHING;

    -- Insert the Premium Passport Cover product in the Accessories category
    INSERT INTO public.products (name, slug, description, short_description, price, sku, stock_quantity, image_urls, is_active, is_featured)
    VALUES (
        'Premium Passport Cover',
        'premium-passport-cover',
        'Protect your passport in style with this premium cover. Made from durable materials with RFID blocking technology to protect your personal information. Features multiple card slots for boarding passes and credit cards.',
        'Premium RFID-blocking passport cover with card slots',
        850.00,
        'PPC-001',
        50,
        ARRAY['/products/passport-cover-1.jpg', '/products/passport-cover-2.jpg'],
        true,
        true
    ) ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO cat_accessories;  -- Reusing the variable for product ID temporarily

    -- Assign the product to the Accessories category
    INSERT INTO public.product_category_assignments (product_id, category_id, is_primary)
    SELECT cat_accessories, cat_accessories, true  -- cat_accessories holds the product ID temporarily
    WHERE NOT EXISTS (
        SELECT 1 FROM public.product_category_assignments 
        WHERE product_id = cat_accessories AND category_id = (SELECT id FROM public.product_categories WHERE slug = 'accessories')
    );
    
    -- Actually assign the passport cover to the accessories category
    WITH passport_cover AS (
        SELECT id FROM public.products WHERE slug = 'premium-passport-cover'
    ),
    accessories_cat AS (
        SELECT id FROM public.product_categories WHERE slug = 'accessories'
    )
    INSERT INTO public.product_category_assignments (product_id, category_id, is_primary)
    SELECT pc.id, ac.id, true
    FROM passport_cover pc, accessories_cat ac
    ON CONFLICT (product_id, category_id) DO NOTHING;

    -- Insert some additional travel products
    INSERT INTO public.products (name, slug, description, short_description, price, sku, stock_quantity, image_urls, is_active, is_featured)
    VALUES 
    (
        'Travel Neck Pillow',
        'travel-neck-pillow',
        'Memory foam neck pillow for comfortable sleeping during travel. Compact and lightweight design with a washable cover.',
        'Memory foam travel neck pillow',
        1250.00,
        'TNP-001',
        30,
        ARRAY['/products/neck-pillow-1.jpg'],
        true,
        true
    ),
    (
        'Universal Power Adapter',
        'universal-power-adapter',
        'Multi-port USB power adapter compatible with outlets worldwide. Includes 2 USB-A ports and 1 USB-C port.',
        'Worldwide power adapter with multiple ports',
        2450.00,
        'UPA-001',
        25,
        ARRAY['/products/power-adapter-1.jpg'],
        true,
        false
    ),
    (
        'Travel Toiletry Kit',
        'travel-toiletry-kit',
        'Water-resistant toiletry bag with multiple compartments. Perfect for organizing your travel essentials.',
        'Water-resistant toiletry bag',
        1850.00,
        'TTK-001',
        40,
        ARRAY['/products/toiletry-kit-1.jpg'],
        true,
        true
    );
    
    -- Assign additional products to appropriate categories
    WITH essentials AS (
        SELECT id FROM public.product_categories WHERE slug = 'essentials'
    ),
    electronics AS (
        SELECT id FROM public.product_categories WHERE slug = 'electronics'
    ),
    essentials_prod AS (
        SELECT id FROM public.products WHERE slug = 'travel-neck-pillow'
    ),
    electronics_prod AS (
        SELECT id FROM public.products WHERE slug = 'universal-power-adapter'
    )
    INSERT INTO public.product_category_assignments (product_id, category_id, is_primary)
    SELECT ep.id, e.id, true FROM essentials_prod ep, essentials e
    WHERE NOT EXISTS (
        SELECT 1 FROM public.product_category_assignments 
        WHERE product_id = ep.id AND category_id = e.id
    )
    UNION ALL
    SELECT elp.id, el.id, true FROM electronics_prod elp, electronics el
    WHERE NOT EXISTS (
        SELECT 1 FROM public.product_category_assignments 
        WHERE product_id = elp.id AND category_id = el.id
    );

END $$;