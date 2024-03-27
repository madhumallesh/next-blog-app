"use server";

import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const { id }: any = req.query
    if (req.method == "DELETE") {
        const result = await prisma.blogs.delete({ where: { id: parseInt(id) } });
        return res.status(200).json(
            result
        );
    }

}