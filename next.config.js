/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    images:{
        // domains: []
        domains:["i.redd.it", "play-lh.googleusercontent.com", "foxcolab.s3.ap-south-1.amazonaws.com", "drive.google.com"]
    },
    webpack: (config) => {
           config.resolve.alias.canvas = false;
           return config;
    },
    
        
}

module.exports = nextConfig
