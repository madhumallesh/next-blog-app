"use client";

import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";


export default () => {
    const router = useRouter();
    const [formdata, setFormData] = useState<FormData | any>()
    const [isLoading, setLoading] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formdata, [name]: value });
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setFormData({ ...formdata, file });
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(formdata)

        const formDataToSend = new FormData();
        formDataToSend.append('title', formdata.title);
        formDataToSend.append('content', formdata.content);
        if (formdata.file) {
            formDataToSend.append('image', formdata.file);
        }
        setLoading(true)
        const response = await fetch('http://localhost:3000/api/createblog', {
            method: 'POST',
            body: formDataToSend,
        })
        if (response.ok) {
            alert("Blog create successfully")
            const data = await response.json();
            router.push(`/blogs/${data.id}`)
        } else {
            alert((await response.json())?.error)
        }
        setLoading(false);
    }

    return <div className="mx-auto min-h-screen">
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
                    <textarea className="border" name="content" onChange={handleChange}></textarea>

                </div>

                <Button loading={isLoading} className="mt-6" color="light-blue" type="submit">
                    Create Blog
                </Button>

            </form>
        </Card>
    </div>
}