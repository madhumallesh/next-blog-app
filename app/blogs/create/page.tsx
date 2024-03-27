import { Metadata } from "next";
import CreateBlog from "@/pages/blogs/CreateBlog";
import { Suspense, useEffect } from "react";

export const metadata: Metadata = {
	title: "create blog"
}

export default function Home({ props }: any) {
	return (
		<>
			<main className="mx-auto max-w-screen-2xl min-h-screen">
				<CreateBlog />
			</main>
		</>
	);
}

