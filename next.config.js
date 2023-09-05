/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:slug*',
                destination: '<http://localhost:3333/:slug*>'
            },
        ]
    },
}

module.exports = nextConfig
