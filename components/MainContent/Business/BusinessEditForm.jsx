// BusinessEditForm.js
"use client"
import React, { useState } from 'react';

const BusinessEditForm = ({ business, onSave }) => {
  const [editedBusiness, setEditedBusiness] = useState({ ...business });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness({ ...editedBusiness, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedBusiness);
  };

  return (
    <div className="bg-white p-4 border rounded shadow-lg m-2">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="font-bold text-gray-700">Название бизнеса:</label>
        <input
          type="text"
          name="name"
          value={editedBusiness.name}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Введите название"
        />

        <label className="font-bold text-gray-700">Описание бизнеса:</label>
        <textarea
          name="description"
          value={editedBusiness.description}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Введите описание"
        />

        <label className="font-bold text-gray-700">Фотографии:</label>
        {/* Предполагается, что компонент для загрузки фотографий уже создан */}
        {/* <PhotoUpload name="photos" onUpload={handlePhotoUpload} /> */}

        <label className="font-bold text-gray-700">Балы:</label>
        <input
          type="number"
          name="points"
          value={editedBusiness.points}
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Введите количество балов"
        />

        <label className="font-bold text-gray-700">Услуги:</label>
        {/* Предполагается, что компонент для редактирования услуг уже создан */}
        {/* <ServicesEdit name="services" services={editedBusiness.services} onChange={handleServicesChange} /> */}

        <label className="font-bold text-gray-700">Статус:</label>
        <select
          name="status"
          value={editedBusiness.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="active">Активный</option>
          <option value="inactive">Неактивный</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default BusinessEditForm;
