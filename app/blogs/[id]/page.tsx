import { Spinner } from "@/components";
import BlogDetails from "@/pages/blogs/BlogDetails";

import { Suspense } from "react";


export default function Page({ params }: { params: { id: number } }) {
    return <>
        <Suspense fallback={<Spinner className="h-12 w-12 mx-auto text-center min-h-screen" />}>
            <BlogDetails params={{ id: params.id }} />
        </Suspense>
    </>
}