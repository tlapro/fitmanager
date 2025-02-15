import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["res.cloudinary.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.imgur.com",
			},
			{
				protocol: "https",
				hostname: "t3.ftcdn.net",
			},
			{
				protocol: "https",
				hostname: "www.georgetown.edu",
			},
			{
				protocol: "https",
				hostname: "media.istockphoto.com",
			},
			{
				protocol: "https",
				hostname: "as2.ftcdn.net",
			},
			
		],
	},
};

export default nextConfig;
