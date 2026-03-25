
export function resolveImageUrl(path: string | null | undefined, fallback: string = '/assets/placeholders/service-placeholder.jpg'): string {
    if (!path) return fallback;

    // 1. If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // 2. Handle local assets in public/assets/
    if (path.startsWith('/assets/')) return path;

    // 3. Handle Supabase storage paths
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (SUPABASE_URL) {
        // Assume it's a storage path if it doesn't start with /assets
        // and it's not a local file
        let storagePath = path;
        
        // Ensure the path has the bucket name (matches Admin App logic)
        if (!storagePath.startsWith('bucket/')) {
            storagePath = `bucket/${storagePath}`;
        }
        
        return `${SUPABASE_URL}/storage/v1/object/public/${storagePath}`;
    }

    // Default fallback
    return path.startsWith('/') ? path : `/${path}`;
}
