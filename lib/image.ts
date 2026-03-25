const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

export function resolveImageUrl(path: string | null | undefined, fallback: string = '/assets/placeholders/service-placeholder.jpg'): string {
    if (!path) return fallback;

    // If it's already a full URL, return it
    if (path.startsWith('http')) return path;

    // If it's a relative path that looks like a Supabase storage path
    // Usually starts with a bucket name, e.g., 'services/image.jpg'
    // But in our admin app, we sometimes save it as just the path
    // We expect the SUPABASE_URL to be defined
    if (SUPABASE_URL && (path.includes('/') || !path.startsWith('/assets'))) {
        // Assume it's a storage path if it doesn't start with /assets
        // and it's not a local file
        return `${SUPABASE_URL}/storage/v1/object/public/${path}`;
    }

    // Default to local asset or fallback
    return path.startsWith('/') ? path : `/${path}`;
}
