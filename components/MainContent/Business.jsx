"use client";
import React, { useState, useEffect } from "react";
import BusinessCard from "./Business/BusinessCard";
import { getBusinessRequests, getAuthorizedBusinesses, authorizeBusiness } from "@/api/business/route";

export default function BusinessPage() {
  const [currentTab, setCurrentTab] = useState('selection'); // Изменено на 'selection' для начального состояния
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [businessRequests, setBusinessRequests] = useState([]);
  const [authorizedBusinesses, setAuthorizedBusinesses] = useState([]);

  useEffect(() => {
    if (currentTab === "requests") {
      getBusinessRequests().then(setBusinessRequests);
    } else if (currentTab === "authorized") {
      getAuthorizedBusinesses().then(setAuthorizedBusinesses);
    }
  }, [currentTab]);

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business);
  };

  const handleAuthorize = (id) => {
    authorizeBusiness(id).then((updatedBusiness) => {
      // Обновляем состояние авторизованных бизнесов
      setAuthorizedBusinesses((prevBusinesses) =>
        prevBusinesses.map((b) => (b.id === id ? updatedBusiness : b))
      );
      setSelectedBusiness(null); // Сбрасываем выбранный бизнес
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <button
        className="absolute top-4 right-4 bg-gray-300 px-4 py-2 rounded cursor-pointer"
        onClick={() => {
          setCurrentTab('selection');
          setSelectedBusiness(null);
        }}
      >
        Вернуться к выбору
      </button>
      {currentTab === 'selection' && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div
            className="w-64 h-64 flex items-center justify-center bg-gray-200 cursor-pointer"
            onClick={() => setCurrentTab("requests")}
          >
            Заявки на вступление
          </div>
          <div
            className="w-64 h-64 flex items-center justify-center bg-gray-200 cursor-pointer"
            onClick={() => setCurrentTab("authorized")}
          >
            Список бизнесов
          </div>
        </div>
      )}
      {currentTab !== 'selection' && selectedBusiness && (
        <div className="w-full h-full">
          <BusinessCard business={selectedBusiness} onAuthorize={handleAuthorize} />
        </div>
      )}
      {currentTab !== 'selection' && !selectedBusiness && (
        <div className="w-full p-4">
          {currentTab === "requests" &&
            businessRequests.map((business) => (
              <div key={business.id} onClick={() => handleSelectBusiness(business)}>
                <BusinessCard business={business} onAuthorize={handleAuthorize} isRequest />
              </div>
            ))}
          {currentTab === "authorized" &&
            authorizedBusinesses.map((business) => (
              <div key={business.id} onClick={() => handleSelectBusiness(business)}>
                <BusinessCard business={business} onAuthorize={handleAuthorize} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
