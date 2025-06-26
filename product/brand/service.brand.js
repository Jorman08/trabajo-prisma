import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createBrand(req, res) {
    const { name } = req.body;

    try {
        const brand = await prisma.brand.create({
            data: { name }
        });
        res.json({ message: 'Brand created', brand });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllBrands(req, res) {
    try {
        const brands = await prisma.brand.findMany();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateBrand(req, res) {
    const id = +req.params.id;
    const { name } = req.body;

    try {
        const brand = await prisma.brand.update({
            where: { id },
            data: { name }
        });
        res.json({ message: 'Brand updated', brand });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteBrand(req, res) {
    const id = +req.params.id;

    try {
        await prisma.brand.delete({ where: { id } });
        res.json({ message: 'Brand deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { createBrand, getAllBrands, updateBrand, deleteBrand };
