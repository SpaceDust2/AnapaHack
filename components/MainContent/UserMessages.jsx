"use client"
import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, sendInquiryResponse } from "@/api/inquiries";

const InquiryRequests = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchInquiries = async () => {
      const inquiriesData = await getInquiries();
      setInquiries(inquiriesData);
    };

    fetchInquiries();
  }, []);

  const handleStatusChange = async (inquiryId, status) => {
    await updateInquiryStatus(inquiryId, status);
    // Обновление списка обращений после изменения статуса
    const updatedInquiries = await getInquiries();
    setInquiries(updatedInquiries);
  };

  const handleSendResponse = async (inquiryId, responseMessage) => {
    await sendInquiryResponse(inquiryId, responseMessage);
    // Обновление списка обращений после отправки ответа
    const updatedInquiries = await getInquiries();
    setInquiries(updatedInquiries);
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    if (filter === 'all') return true;
    return inquiry.status === filter;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-700">Фильтр статуса</label>
        <select
          id="filter"
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="new">Новое</option>
          <option value="in_process">В процессе</option>
          <option value="completed">Завершено</option>
        </select>
      </div>
      <ul className="space-y-4">
        {filteredInquiries.map(inquiry => (
          <li key={inquiry.id} className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{inquiry.subject}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inquiry.status === 'completed' ? 'bg-green-100 text-green-800' : inquiry.status === 'in_process' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                    {inquiry.status}
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-gray-500">
                    {inquiry.user.fullName}
                  </p>
                  <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                    {inquiry.message}
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                  {/* Кнопки действий */}
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleStatusChange(inquiry.id, 'completed')}
                  >
                    Завершить
                  </button>
                  <button
                    className="ml-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSendResponse(inquiry.id, 'Ваш ответ отправлен.')}
                  >
                    Ответить
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InquiryRequests;
