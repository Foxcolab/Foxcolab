/** @type {import('next').NextConfig} */
const path = require('path');
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
    // webpack: (config) => {
    //        config.resolve.alias.canvas = false;
    //        return config;
           
    // },
    webpack: (config, { dev, isServer }) => {
      // Skip type checking during the build process
      if (!dev && !isServer) {
        config.module.rules.push({
          test: /\.tsx?$/,
          exclude: path.resolve(__dirname, 'node_modules'),
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        });
      }
      return config;
    },
    
        
}

module.exports = nextConfig
