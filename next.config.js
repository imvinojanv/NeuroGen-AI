/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    images: {
        domains: [
            "oaidalleapiprodscus.blob.core.windows.net",
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    }
}

module.exports = nextConfig
