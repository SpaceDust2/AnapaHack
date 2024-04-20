"use server"
import prisma from "@/lib/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany({
    where: { },
  });
  return users;
}

export async function updateUser(data) {
  const { id, fullName, role, points, message } = data;
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      fullName,
      role,
      points,
      message,
    },
  });
  return updatedUser;
}