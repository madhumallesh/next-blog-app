"use client";
import { Spinner, Typography, Input, Button } from "@/components";
import { Metadata } from "next";
import Blogslist from "@/pages/blogs/BlogsList";
import { Suspense, useState } from "react";

type Post = {
	title: string,
	img: string,
	link: string,
	time: string,
}


export default function Home() {
	const [search, setSearch] = useState<string | null>(null);
	const [title, setTitle] = useState<any>()
	return (
		<>
			<main className="mx-auto max-w-screen-2xl min-h-screen">
				<div className="flex justify-between">
					<Typography variant="h3" color="blue">Blogs</Typography>
					<div className="relative flex w-full gap-2 md:w-max">
						<Input
							type="search"
							color="black"
							label="Search"
							className=""
							containerProps={{
								className: "min-w-[288px]",
							}}
							value={!title ? "" : title}
							onChange={e => setTitle(e.target.value)}
						/>
					</div>
				</div>
				<Suspense fallback={<Spinner className="h-12 w-12 mx-auto text-center min-h-screen" />}>
					<Blogslist params={{ title: title }} />
				</Suspense>
			</main>
		</>
	);
}

