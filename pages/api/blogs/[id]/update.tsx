import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { NextRequest } from 'next/server';
import { IncomingForm } from 'formidable';
import { prisma } from '@/pages/_lib';


export const config = {
    api: {
        bodyParser: false // Disable body parsing, as we'll handle it manually with formidable
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const { id }: any = req.query;
        try {
            const form: any = new IncomingForm();
            form.uploadDir = './public/uploads/';
            form.keepExtensions = true;
            console.log(form)
            form.parse(req, async (err: any, fields: any, files: any) => {
                const { image } = files;
                if (image) {
                    const savePath = `./public/uploads/${image[0].newFilename}_${image[0].originalFilename}`;
                    fs.renameSync(image[0].filepath, savePath);
                    if (await prisma.blogs.findUnique({ where: { id: parseInt(id) } })) {
                        await prisma.blogs.update({ where: { id: parseInt(id) }, data: { image: `/uploads/${image[0].newFilename}_${image[0].originalFilename}` } })
                    }
                    // const result = await prisma.blogs.create({ data: { content: content[0], title: title[0], image: `/uploads/${image[0].newFilename}_${image[0].originalFilename}`, read_time: "3" } })

                }
                const { title, content }:any = fields
                const result = await prisma.blogs.update({ where: { id: parseInt(id) }, data: { title: title[0], content:content[0] } })
                return res.status(200).json(result);
            });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'File upload failed' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;