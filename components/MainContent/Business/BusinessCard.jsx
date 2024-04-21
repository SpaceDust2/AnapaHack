// BusinessCard.js
"use client"
import React, { useState, useEffect } from 'react';
import { getReviews, authorizeBusiness, getBusinessLocation, updateBusiness } from '@/api/business/route';
import ImageGallery from './ImageGallery';
import MapDisplay from './MapDisplay';
import BusinessEditForm from './BusinessEditForm.jsx'; // Убедитесь, что этот компонент существует

const BusinessCard = ({ business, onAuthorize }) => {
  const [reviews, setReviews] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [averageScore, setAverageScore] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [businessLocation, setBusinessLocation] = useState(null);

  useEffect(() => {
    if (business.isApproved) {
      getReviews(business.id).then(reviewsData => {
        setReviews(reviewsData);
        const totalScore = reviewsData.reduce((acc, review) => acc + review.score, 0);
        setAverageScore(reviewsData.length ? (totalScore / reviewsData.length).toFixed(2) : null);
        setReviewsCount(reviewsData.length);
      });
      getBusinessLocation(business.id).then(location => {
        if (location.latitude && location.longitude) {
          setBusinessLocation({
            geometry: { type: "Point", coordinates: [location.latitude, location.longitude] },
            properties: { balloonContent: business.name },
          });
        }
      });
    }
  }, [business.isApproved, business.id]);

  const handleAuthorize = () => {
    authorizeBusiness(business.id).then(() => {
      onAuthorize && onAuthorize(business.id);
    });
  };

  const handleEdit = (updatedBusiness) => {
    updateBusiness(business.id, updatedBusiness).then(() => {
      // Обработка после обновления бизнеса
    });
  };

  return (
    <div className="p-4 border rounded shadow-lg m-2 flex flex-col bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-800">{business.name}</h3>
      {business.applicationText && (
        <p className="italic text-sm text-gray-600 mb-2">{business.applicationText}</p>
      )}
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded cursor-pointer my-2"
        onClick={() => setShowEditForm(!showEditForm)}
      >
        Редактировать
      </button>
      {!showDetails && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer my-2"
          onClick={() => setShowDetails(true)}
        >
          Показать детали
        </button>
      )}
      {showDetails && (
        <>
          <ImageGallery businessId={business.id} />
          <MapDisplay location={businessLocation} />
          <p className="my-2">{business.description}</p>
          {!business.isApproved && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer my-2"
              onClick={handleAuthorize}
            >
              Авторизовать
            </button>
          )}
          <div className="flex justify-between items-center">
            <p>Количество отзывов: {reviewsCount || 'Нет данных'}</p>
            <p>Средний балл: {averageScore || 'Нет данных'}</p>
          </div>
          {showEditForm && (
            <BusinessEditForm business={business} onSave={handleEdit} />
          )}
          <div className="border-t pt-2">
            {reviews.map((review) => (
              <div key={review.id} className="border p-2 my-2">
                <p className="font-semibold">{review.author}</p>
                <p>{review.content}</p>
                <p>Оценка: {review.score}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BusinessCard;
