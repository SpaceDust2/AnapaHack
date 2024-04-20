"use client"
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser } from "@/api/getUsers/route"; // Добавлен updateUser
import { addUser, deleteUser } from "@/api/userActions/route";

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null); // Для хранения редактируемого пользователя

  useEffect(() => {
    async function loadUsers() {
      const usersData = await getUsers();
      setUsers(usersData);
      setLoading(false);
    }
    loadUsers();
  }, []);

  // Функция для добавления пользователя
  async function handleAddUser() {
    const fullName = prompt('Введите полное имя:');
    const role = prompt('Введите роль:');
    const points = parseInt(prompt('Введите очки:'),10);
    const message = prompt('Введите сообщение:');
    const newUser = await addUser({ fullName, role, points, message });
    setUsers([...users, newUser]);
  }

  // Функция для удаления пользователя
  async function handleDeleteUser(userId) {
    await deleteUser(userId);
    setUsers(users.filter(user => user.id !== userId));
  }

  // Функция для начала редактирования пользователя
  function handleEditUser(user) {
    setEditingUser({ ...user });
  }

  // Функция для сохранения изменений пользователя
  async function handleSaveUser() {
    const updatedUser = await updateUser(editingUser);
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
  }

  if (loading) return <p className="text-center">Загрузка пользователей...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-6">Администраторы</h1>
      <button
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddUser}
      >
        Добавить пользователя
      </button>
      {editingUser ? (
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            className="border-2 border-gray-300 p-2 rounded mb-2"
            value={editingUser.fullName}
            onChange={(e) => setEditingUser({ ...editingUser, fullName: e.target.value })}
          />
          <input
            type="text"
            className="border-2 border-gray-300 p-2 rounded mb-2"
            value={editingUser.role}
            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
          />
          <input
            type="number"
            className="border-2 border-gray-300 p-2 rounded mb-2"
            value={editingUser.points}
            onChange={(e) => setEditingUser({ ...editingUser, points: parseInt(e.target.value, 10) })}
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSaveUser}
          >
            Сохранить изменения
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
              <div className="mb-2">
                <span className="text-gray-700 text-lg font-bold">{user.fullName}</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-600 text-sm">{user.role}</span>
              </div>
              <div className="flex justify-between">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditUser(user)}
                >
                  Редактировать
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Удалить пользователя
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
