"use server"
import prisma from "@/lib/prisma";

export async function addUser(data) {
  const { fullName, role, points, message } = data;
  const newUser = await prisma.user.create({
    data: {
      fullName,
      role,
      points,
      message,
    },
  });
  return newUser;
}

// // api/deleteUser.js
// import prisma from "@/lib/prisma";

export async function deleteUser(userId) {
  const user = await prisma.user.delete({
    where: { id: userId },
  });
  return user;
}
