/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains: ["http://localhost:8080"],
    },
    experimental: {
        serverActions:true,
    }
}

module.exports = nextConfig
