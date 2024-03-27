import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Card, Typography, Button, Input } from '@/components'
import { useRouter } from 'next/navigation';

const getData = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, { cache: 'no-store' });
    const data = await res.json()
    console.log(data);
    return data
}

export default function EditBlog({ params }: { params: { id: number } }) {
    const [formdata, setFormData] = useState<FormData | any>()
    const [isLoading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    useEffect(() => {
        setLoading(true);
        const fetchdata = async () => {
            setFormData(await getData(params.id))
            setLoading(false)
        }
        fetchdata()
    }, [])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData()
        formData.append("title", formdata?.title)
        formData.append("content", formdata?.content)
        if (formdata.file) {
            formData.append("image", formdata?.file)
        }
        const req = await fetch(`http://localhost:3000/api/blogs/${params.id}/update`, {
            method: "POST",
            body: formData
        })
        const data = await req.json()
        setLoading(false)
        if (req.ok) {
            router.push(`/blogs/${params.id}`)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formdata, [name]: value })
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFormData({ ...formdata, file });
    };

    return (
        <div className="mx-auto min-h-screen">
            <Card color="white" shadow={true} className="border-2 p-4">
                <Typography variant="h3" color="blue-gray">
                    Create Blog
                </Typography>
                <form className="mt-8 mb-2 w-96" onSubmit={handleSubmit}>
                    <div className="mb-1 flex flex-col gap-6 justify-start">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Title
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="title"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            name="title"
                            type="text"
                            value={formdata?.title}
                            onChange={handleChange}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Image
                        </Typography>
                        <Input
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            type="file"
                            name="image"
                            onChange={handleFileChange}
                        />

                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Content
                        </Typography>
                        <textarea className="border" name="content" value={formdata?.content} onChange={handleChange}></textarea>
                    </div>

                    <Button loading={isLoading} className="mt-6" color="light-blue" type="submit">
                        Update Blog
                    </Button>

                </form>
            </Card>
        </div>
    )
}
