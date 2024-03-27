"use client";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
    title: string,
    time: string,
    img: string;
    link: string;
}

export default function CardDefault(props: Props) {
    return (
        <Card className="mt-6 w-96 border hover:shadow-sm hover:border-blue-300">
            <CardHeader color="blue-gray" className="relative h-56" floated={false}>
                <Image src={props.img} fill={true} alt={props.title} />
            </CardHeader>
            <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {props.title}
                </Typography>
            </CardBody>
            <CardFooter className="pt-0 flex justify-between items-center">
                <span>{props.time} Min's</span>
                <Link href={props.link}>
                    <Button size="sm" variant="text" className="flex items-center gap-2">Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}