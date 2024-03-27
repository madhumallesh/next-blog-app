'use client';

import {
    Navbar,
    Typography,
    IconButton,
    Button,
    Input,
} from "@material-tailwind/react";
import Link from "next/link";


export default function BlogNavbar() {
    return (
        <Navbar
            variant="filled"
            color="white"
            className="mx-auto border shadow-md mb-10"
        >
            <div className="flex flex-wrap items-center justify-between gap-y-4 text-black">
                <Link href={"/"}>
                    <Typography
                        variant="h4"
                        className="mr-4 ml-2 cursor-pointer py-1.5"
                    >
                        Next Blog App
                    </Typography>
                </Link>

                <Link href={"/blogs/create"} >
                    <Button color="blue">
                        create blog
                    </Button>
                </Link>
            </div>
        </Navbar>
    );
}