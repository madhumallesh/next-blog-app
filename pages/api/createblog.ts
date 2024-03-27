import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import { prisma as Prisma } from '../_lib';

// Set up multer storage
const upload = multer({ dest: './public/uploads/', });


export const config = {
    api: {
        bodyParser: false // Disable body parsing, as we'll handle it manually with formidable
    }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const form = new IncomingForm();
            form.uploadDir = './public/uploads/';
            form.keepExtensions = true;
            form.parse(req, async (err: any, fields: any, files: any) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }

                const { image } = files;
                const savePath = `./public/uploads/${image[0].newFilename}_${image[0].originalFilename}`;
                fs.renameSync(image[0].filepath, savePath);
                const { title, content } = fields
                if (await Prisma.blogs.findUnique({ where: { title: title[0] } })) {
                    return res.status(404).json({ error: `${title[0]} is already exists....` })
                }
                const result = await Prisma.blogs.create({ data: { content: content[0], title: title[0], image: `/uploads/${image[0].newFilename}_${image[0].originalFilename}`, read_time: "3" } })
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