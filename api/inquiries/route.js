"use server"
import prisma from "@/lib/prisma";

// Получение всех обращений
export async function getInquiries() {
  const inquiries = await prisma.inquiries.findMany({
    where: { },
  });
  return inquiries;
}

// Обновление статуса обращения
export async function updateInquiryStatus(inquiryId, status) {
  const inquiry = await prisma.inquiries.update({
    where: { id: inquiryId },
    data: { status },
  });
  return inquiry;
}

// Отправка ответного сообщения
export async function sendInquiryResponse(inquiryId, responseMessage) {
  const inquiry = await prisma.inquiries.update({
    where: { id: inquiryId },
    data: { responseMessage },
  });
  return inquiry;
}
