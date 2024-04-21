"use client"
import React, { useState, useEffect } from 'react';
import { getInquiries, updateInquiryStatus, sendInquiryResponse } from "@/api/inquiries/route";

const InquiryRequests = () => {
  const [inquiries, setInquiries] = useState([]);
  const [filter, setFilter] = useState('Новое');
  const [response, setResponse] = useState('');
  const [activeInquiry, setActiveInquiry] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      const inquiriesData = await getInquiries();
      setInquiries(inquiriesData.filter(inquiry => inquiry.status === filter));
    };

    fetchInquiries();
  }, [filter]);

  const handleStatusChange = async (inquiryId, status) => {
    await updateInquiryStatus(inquiryId, status);
    const updatedInquiries = await getInquiries();
    setInquiries(updatedInquiries.filter(inquiry => inquiry.status === filter));
  };

  const handleSendResponse = async (inquiryId) => {
    await sendInquiryResponse(inquiryId, response);
    const updatedInquiries = await getInquiries();
    setInquiries(updatedInquiries.filter(inquiry => inquiry.status === filter));
    setActiveInquiry(null); // Сброс активного обращения
    setResponse(''); // Очистка поля ответа
  };

  const handleResponseToggle = (inquiryId) => {
    setActiveInquiry(activeInquiry === inquiryId ? null : inquiryId);
    // Установка текущего ответа в поле ввода, если он уже есть
    if (activeInquiry !== inquiryId) {
      const currentInquiry = inquiries.find(inquiry => inquiry.id === inquiryId);
      setResponse(currentInquiry.responseMessage || '');
    } else {
      setResponse('');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <button
          className={`py-2 px-4 ${filter === 'Новое' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          onClick={() => setFilter('Новое')}
        >
          Новые
        </button>
        <button
          className={`py-2 px-4 ${filter === 'В процессе' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          onClick={() => setFilter('В процессе')}
        >
          В процессе
        </button>
        <button
          className={`py-2 px-4 ${filter === 'Завершено' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
          onClick={() => setFilter('Завершено')}
        >
          Завершено
        </button>
      </div>
      <ul className="space-y-4">
        {inquiries.map(inquiry => (
          <li key={inquiry.id} className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-indigo-600 truncate">{inquiry.subject}</p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${inquiry.status === 'Завершено' ? 'bg-green-100 text-green-800' : inquiry.status === 'В процессе' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
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
                    onClick={() => handleStatusChange(inquiry.id, 'Завершено')}
                  >
                    Завершить
                  </button>
                  <button
                    className="ml-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleResponseToggle(inquiry.id)}
                  >
                    Ответить
                  </button>
                </div>
              </div>
              {activeInquiry === inquiry.id && (
                <div className="mt-4">
                  {inquiry.responseMessage && (
                    <p className="text-sm text-gray-600">
                      Предыдущий ответ: {inquiry.responseMessage}
                    </p>
                  )}
                  <textarea
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    rows="3"
                    placeholder="Введите ваш ответ здесь..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSendResponse(inquiry.id)}
                  >
                    Отправить ответ
                  </button>
                  <button
                    className="mt-2 ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setActiveInquiry(null)}
                  >
                    Отмена
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InquiryRequests;
