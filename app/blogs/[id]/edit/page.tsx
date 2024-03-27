"use client";

import EditBlog from "@/pages/blogs/EditBlog";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: number } }) {

    return (
        <main className="mx-auto max-w-screen-2xl min-h-screen">
            <EditBlog params={{ id: params.id }} />
        </main>
    )
}
