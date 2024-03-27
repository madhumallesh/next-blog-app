"use server";

import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const { id }: any = _req.query
    const result = await prisma.blogs.findUnique({ where: { id: parseInt(id) } })
    return res.status(200).json(
        result
    );
}