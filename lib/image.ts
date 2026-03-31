interface ImageOptions {
    width?: number
    height?: number
    quality?: number
    resize?: 'cover' | 'contain' | 'fill'
}

export function resolveImageUrl(
    path: string | null | undefined, 
    fallback: string = '/assets/placeholders/service-placeholder.jpg',
    options?: ImageOptions
): string {
    if (!path) return fallback;

    // 1. If it's already a full URL
    if (path.startsWith('http')) {
        // If it's a Supabase URL, we can still append params if it doesn't already have them
        if (path.includes('supabase.co') && options) {
            const url = new URL(path);
            if (options.width) url.searchParams.set('width', options.width.toString());
            if (options.height) url.searchParams.set('height', options.height.toString());
            if (options.quality) url.searchParams.set('quality', options.quality.toString());
            if (options.resize) url.searchParams.set('resize', options.resize);
            return url.toString();
        }
        return path;
    }

    // 2. Handle local assets in public/assets/
    if (path.startsWith('/assets/')) return path;

    // 3. Handle Supabase storage paths
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const BUCKET_NAME = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'bucket';

    if (SUPABASE_URL) {
        let storagePath = path;
        
        // Ensure the path has the bucket name
        if (!storagePath.startsWith(`${BUCKET_NAME}/`)) {
            storagePath = `${BUCKET_NAME}/${storagePath}`;
        }
        
        const baseUrl = `${SUPABASE_URL}/storage/v1/object/public/${storagePath}`;
        
        if (options) {
            const url = new URL(baseUrl);
            if (options.width) url.searchParams.set('width', options.width.toString());
            if (options.height) url.searchParams.set('height', options.height.toString());
            if (options.quality) url.searchParams.set('quality', options.quality.toString());
            if (options.resize) url.searchParams.set('resize', options.resize);
            return url.toString();
        }

        return baseUrl;
    }

    // Default fallback
    return path.startsWith('/') ? path : `/${path}`;
}
