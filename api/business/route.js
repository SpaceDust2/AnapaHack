"use server";
import prisma from "@/lib/prisma";
// Функция для получения списка заявок от бизнесов

export const getBusinessRequests = async () => {
    const requests = await prisma.business.findMany({
      where: { isApproved: false }
    });
    return requests;
  };
  
  export const getAuthorizedBusinesses = async () => {
    const businesses = await prisma.business.findMany({
      where: { isApproved: true }
    });
    return businesses;
  };
  export const authorizeBusiness = async (businessId) => {
    const business = await prisma.business.update({
      where: { id: businessId },
      data: { isApproved: true }
    });
    return business;
  };
  export const getReviews = async (businessId) => {
    const reviews = await prisma.review.findMany({
      where: { businessId: businessId }
    });
    return reviews;
  };
  export const updateBusinessStats = async (businessId, reviewsCount, averageScore) => {
    const business = await prisma.business.update({
      where: { id: businessId },
      data: { reviewsCount: reviewsCount, averageScore: averageScore }
    });
    return business;
  };
// Предполагается, что у модели Business есть поля latitude и longitude
export const getBusinessLocation = async (businessId) => {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
      select: { latitude: true, longitude: true }
    });
    return business || {};
  };
  