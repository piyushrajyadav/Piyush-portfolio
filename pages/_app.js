import { Analytics } from '@vercel/analytics/next';
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";

import "@/styles/globals.css";

import { PreLoader } from "@/components/Loader";

// Load Poppins font through Next.js for better performance
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-poppins",
});

export default function App({ Component, pageProps }) {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 2000); // Reduced from 3000ms to 2000ms
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (loading) {
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "auto";
		}
	}, [loading]);

	const title = "Portfolio | Piyush Yadav";
	const description =
		"Hello! I'm Piyush Yadav, a passionate software developer and AI enthusiast from Kolkata. Welcome to my portfolio";
	const avatar =
		"https://res.cloudinary.com/dyle3hnpw/image/upload/v1696091629/portfolio/WhatsApp_Image_2023-09-30_at_10.02.55_PM_jk44v9.jpg";
	const url = "https://piyush-yadav-portfolio.vercel.app/";

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} key="desc" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta property="og:title" content={title} />
				<meta property="og:site_name" content={title}></meta>
				<meta property="og:description" content={description} />
				<meta property="og:image" content={avatar} />
				<meta property="og:image:width" content="612" />
				<meta property="og:image:height" content="612" />
				<meta property="og:url" content={url} />
				<meta property="og:type" content="website" />

				<meta property="twitter:image" content={avatar} />
				<meta property="twitter:card" content="summary_large_image" />
				<meta name="twitter:creator" content="@piyushyadav" />
				<meta property="twitter:title" content={title} />
				<meta property="twitter:description" content={description} />

				<link rel="canonical" href={url} />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/assets/piyush .jpeg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="32x32"
					href="/assets/piyush .jpeg"
				/>
				<link
					rel="icon"
					type="image/jpeg"
					sizes="16x16"
					href="/assets/piyush .jpeg"
				/>
				<link
					rel="manifest"
					href="/assets/icons/favicon/site.webmanifest"
				/>
			</Head>

			<ThemeProvider attribute="class" defaultTheme="dark">
				<main className={`${poppins.variable} font-sans`}>
					<Component {...pageProps} loading={loading} />
				</main>
                <Analytics />
				{loading && <PreLoader />}
			</ThemeProvider>
		</>
	);
}
