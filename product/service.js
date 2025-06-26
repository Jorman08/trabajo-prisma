import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createNewProduct(data, res) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                price: parseFloat(data.price),
                brand: {
                    connect: { id: data.brandId }
                },
                categories: {
                    connect: data.categoryIds?.map(id => ({ id })) || []
                }
            }
        });
        res.json({ message: 'Product created', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function allProducts(res) {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                categories: true
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function productById(id, res) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                brand: true,
                categories: true
            }
        });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateProductById(id, body, res) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: body.name,
                price: parseFloat(body.price),
                brandId: body.brandId,
                categories: {
                    set: body.categoryIds?.map(id => ({ id })) || []
                }
            }
        });
        res.json({ message: 'Product updated', product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProductById(id, res) {
    try {
        await prisma.product.delete({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export {
    createNewProduct,
    allProducts,
    productById,
    updateProductById,
    deleteProductById
}
