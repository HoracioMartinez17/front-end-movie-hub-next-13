/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ["res.cloudinary.com"],
        unoptimized: true,
    },
    experimental: {
        serverActions:true,
    }
}

module.exports = nextConfig
