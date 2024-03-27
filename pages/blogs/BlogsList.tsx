import React from 'react';
import BlogCard from "@/components/blogs/Card";
import {Typography} from "@/components"

const RenderBlogs = ({ data }: { data: any[] }) => (
    data.length > 0 ?
    <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {
            data.map(item => (
                <BlogCard key={item.id} title={item.title} img={item.image} time={item.read_time} link={`blogs/${item.id}`} />
            ))
        }
    </div> : <div className='mx-auto text-center min-h-screen mt-20'>
        <Typography variant='h2'> No Records Found</Typography>
    </div>
);

// Define your page component
export default async function Bloglist({ params = { title: null } }: { params: { title: any } }) {
    if (params.title) {
        const res = await fetch(`http://localhost:3000/api/blogs?title=${params.title}`, { cache: 'no-store' })
        const data: any[] = await res.json()
        return <RenderBlogs data={data} />
    } else {
        const res = await fetch("http://localhost:3000/api/blogs", { cache: 'no-store' })
        const data: any[] = await res.json()
        return <RenderBlogs data={data} />
    }


    // await new Promise(r => setTimeout(r, 1000));

};