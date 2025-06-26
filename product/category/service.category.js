import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createCategory(req, res) {
    const { name } = req.body;

    try {
        const category = await prisma.category.create({
            data: { name }
        });
        res.json({ message: 'Category created', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllCategories(req, res) {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateCategory(req, res) {
    const id = +req.params.id;
    const { name } = req.body;

    try {
        const category = await prisma.category.update({
            where: { id },
            data: { name }
        });
        res.json({ message: 'Category updated', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteCategory(req, res) {
    const id = +req.params.id;

    try {
        await prisma.category.delete({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createCategory, getAllCategories, updateCategory, deleteCategory };
