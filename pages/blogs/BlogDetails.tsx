"use client";
import { Button, ButtonGroup, Card, Typography } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
    "id": number,
    "title": string,
    "content": string,
    "read_time": string,
    "image": string
}



export default async function BlogDetails({ params }: { params: { id: number } }) {
    const [data, setData] = useState({})
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            const res = (await fetch(`http://localhost:3000/api/blogs/${params.id}`, { cache: 'no-store' }));
            const data: Post = await res.json()
            setData(data)
        }
        fetchData();
    }, [])
    // await new Promise(r => setTimeout(r, 2000));

    const handleDelete = async (id: number) => {
        const req = await fetch(`http://localhost:3000/api/blogs/${id}/delete`, {
            method: "DELETE"
        })
        if (req.ok) {
            router.push("/")
        }
    }

    return <div className="mx-auto max-w-screen-lg">
        <div className="flex justify-between items-center">
            <Typography variant="h2" color="blue-gray" className="mb-2">
                {data?.title}
            </Typography>
            <div>
                <div className="flex gap-x-2">
                    <Link href={`/blogs/${params.id}/edit`} ><Button color="green">Edit</Button></Link>
                    <Button color="red" onClick={() => handleDelete(params.id)}>Delete</Button>
                </div>
            </div>
        </div>
        <Card className="mb-12 overflow-hidden h-[30rem] w-full border">
            <Image alt={data?.title} src={data?.image} fill={true} />
        </Card>

        <Typography color="gray" className="font-normal">
            {data?.content}
        </Typography>
    </div>
}