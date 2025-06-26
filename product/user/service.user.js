import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(req, res) {
    const { email, bio } = req.body;

    try {
        const user = await prisma.user.create({
            data: {
                email,
                profile: {
                    create: { bio }
                }
            },
            include: { profile: true }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUsers(req, res) {
    try {
        const users = await prisma.user.findMany({
            include: { profile: true }
        });

        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updateUser(req, res) {
    const id = +req.params.id;
    const { email, bio } = req.body;

    try {
        const user = await prisma.user.update({
            where: { id },
            data: {
                email,
                profile: {
                    update: {
                        bio
                    }
                }
            },
            include: { profile: true }
        });

        res.json({ message: 'User updated', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteUser(req, res) {
    const id = +req.params.id;

    try {
        await prisma.profile.delete({ where: { userId: id } }); // elimina perfil primero
        await prisma.user.delete({ where: { id } });
        res.json({ message: 'User and profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export { createUser, getUsers, updateUser, deleteUser };
