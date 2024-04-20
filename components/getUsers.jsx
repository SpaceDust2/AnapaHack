// getUsers.js
import prisma from "@/lib/prisma";

export async function getUsers() {
    const users = await prisma.user.findMany({
        where: { role: "Администратор" },
    });
    return users;
}
