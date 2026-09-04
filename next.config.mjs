/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: '*.supabase.co',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    async redirects() {
        return [
            // Old /category/:slug → /:slug  (301 permanent — passes SEO equity)
            {
                source: '/category/:slug',
                destination: '/:slug',
                permanent: true,
            },
            // Old /product/:slug → /p/:slug  (resolver looks up category in DB)
            {
                source: '/product/:slug',
                destination: '/p/:slug',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
