// // components/Users.js
import React, { useState } from 'react';
import usersData from '@/data/users'; // Предполагается, что данные импортируются из внешнего файла

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [filter, setFilter] = useState('Все');

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setEditMode(false);
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setUserData(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Здесь должен быть код для сохранения данных пользователя
    setEditMode(false);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      // Здесь должен быть код для удаления пользователя
    }
  };

  const handleAddUser = () => {
    // Здесь должен быть код для добавления нового пользователя
  };

  const filteredUsers = usersData.filter((user) => {
    if (filter === 'Все') {
      return true;
    }
    return user.role === filter;
  });

  return (
    <div>
      {/* Фильтрация */}
      <div className="flex justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-md p-2"
        >
          <option value="Все">Все</option>
          <option value="Администратор">Администраторы</option>
          <option value="Модератор">Модераторы</option>
          <option value="Клиент">Клиенты</option>
        </select>
        <button
          onClick={handleAddUser}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Добавить пользователя
        </button>
      </div>
      {/* Список пользователей */}
      <ul className="divide-y divide-gray-200">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => handleSelectUser(user)}
          >
            <span>{user.name}</span>
            <div>
              <button
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:text-blue-800 mr-2"
              >
                Редактировать
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-800"
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedUser && (
        <div className="mt-4 p-4 border rounded-md">
          {editMode ? (
            <div>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="border rounded-md p-2 mr-2"
              />
              <input
                type="text"
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
              {/* Добавьте другие поля для редактирования */}
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              >
                Сохранить
              </button>
            </div>
          ) : (
            <div>
              <p>Имя: {selectedUser.name}</p>
              <p>Роль: {selectedUser.role}</p>
              <p>Баллы: {selectedUser.points}</p>
              <p>Билеты: {selectedUser.tickets.join(', ')}</p>
              {/* Добавьте другие атрибуты для отображения */}
              <button
                onClick={() => handleEdit(selectedUser)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Редактировать
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Users;
