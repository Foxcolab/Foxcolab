/** @type {import('next').NextConfig} */
const nextConfig = {
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
