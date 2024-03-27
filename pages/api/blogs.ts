"use server";

import { NextApiResponse, NextApiRequest } from "next";
import { PrismaClient } from '@prisma/client';
import { prisma } from "../_lib";


export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if (_req.query.title) {
        const payload: any = _req.query.title
        const filter = await prisma.blogs.findMany({ where: { title: { contains: payload } } })
        return res.status(200).json(
            filter
        );
    }
    const result = await prisma.blogs.findMany()
    return res.status(200).json(
        result
    );
}