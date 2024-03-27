"use client";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const search = useSearchParams()
    console.log(search?.title)
    return <div>

    </div>
}