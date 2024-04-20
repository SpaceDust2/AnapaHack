import React, { useState, useEffect } from "react";
import { getUsers, updateUser } from "@/api/getUsers/route";
import { addUser, deleteUser } from "@/api/userActions/route";
import { FaEdit, FaTrash, FaPlus, FaTicketAlt } from "react-icons/fa";

// Функция для определения цвета роли
const roleColor = {
    Администратор: "text-red-500",
    Модератор: "text-green-500",
    Клиент: "text-blue-500",
};

function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    useEffect(() => {
        async function loadUsers() {
            let usersData = await getUsers();
            if (selectedRole) {
                usersData = usersData.filter(
                    (user) => user.role === selectedRole
                );
            }
            if (sortOrder === "asc") {
                usersData.sort((a, b) => a.points - b.points);
            } else {
                usersData.sort((a, b) => b.points - a.points);
            }
            setUsers(usersData);
            setLoading(false);
        }
        loadUsers();
    }, [selectedRole, sortOrder]);

    async function handleAddUser() {
        const fullName = prompt("Введите полное имя:");
        const role = prompt("Введите роль:");
        const points = parseInt(prompt("Введите очки:"), 10);
        const newUser = await addUser({ fullName, role, points });
        setUsers([...users, newUser]);
    }

    async function handleDeleteUser(userId) {
        await deleteUser(userId);
        setUsers(users.filter((user) => user.id !== userId));
    }

    function handleEditUser(user) {
        setEditingUser(user);
        setIsModalOpen(true);
    }

    async function handleSaveUser(editedUser) {
        const updatedUser = await updateUser(editedUser);
        setUsers(
            users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            )
        );
        setIsModalOpen(false);
    }

    if (loading)
        return <p className="text-center">Загрузка пользователей...</p>;

    return (
        <div className="container mx-auto mt-10">
            <div className="mb-4 flex justify-between">
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border-2 border-gray-300 p-2 rounded"
                >
                    <option value="">Все роли</option>
                    <option value="Администратор">Администратор</option>
                    <option value="Модератор">Модератор</option>
                    <option value="Клиент">Клиент</option>
                </select>
                <button
                    onClick={() =>
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                    }
                    className="border-2 border-gray-300 p-2 rounded"
                >
                    {sortOrder === "asc"
                        ? "Сортировать по убыванию"
                        : "Сортировать по возрастанию"}
                </button>
            </div>
            <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={handleAddUser}
            >
                <FaPlus aria-label="Добавить пользователя" />
            </button>
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white shadow-md rounded px-4 pt-3 pb-3 mb-2 flex flex-col"
                >
                    <div className="mb-2">
                        <span className="text-gray-700 text-lg font-bold">
                            {user.fullName}
                        </span>
                    </div>
                    <div className={`mb-2 ${roleColor[user.role]}`}>
                        <span className="text-sm">{user.role}</span>
                    </div>
                    <div className="mb-2">
                        <span className="text-gray-600 text-sm">
                            {user.points} баллов
                        </span>
                    </div>
                    {user.message && (
                        <div className="mb-2 bg-yellow-100 p-2">
                            <span className="text-gray-600 text-sm">
                                {user.message.substring(0, 30)}...
                            </span>
                        </div>
                    )}
                    {user.tickets && user.tickets.length > 0 && (
                        <div className="mb-2">
                            <FaTicketAlt className="inline mr-2" />
                            <span className="text-gray-600 text-sm">
                                Билеты: {user.tickets.length}
                            </span>
                        </div>
                    )}
                    <div className="flex justify-between">
                        <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => handleEditUser(user)}
                        >
                            <FaEdit aria-label="Редактировать пользователя" />
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            <FaTrash aria-label="Удалить пользователя" />
                        </button>
                    </div>
                </div>
            ))}
            {isModalOpen && editingUser && (
                <EditUserModal
                    user={editingUser}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveUser}
                />
            )}
        </div>
    );
}

export default Home;

function EditUserModal({ user, isOpen, onClose, onSave }) {
    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        if (user) {
            setEditedUser(user);
        }
    }, [user]);

    const handleSave = () => {
        onSave(editedUser);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
            id="my-modal"
        >
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Редактирование пользователя
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 rounded w-full"
                            value={editedUser.fullName}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    fullName: e.target.value,
                                })
                            }
                            placeholder="Полное имя"
                        />
                        <input
                            type="text"
                            className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                            value={editedUser.role}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    role: e.target.value,
                                })
                            }
                            placeholder="Роль"
                        />
                        <input
                            type="number"
                            className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                            value={editedUser.points}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    points: parseInt(e.target.value, 10),
                                })
                            }
                            placeholder="Баллы"
                        />
                        <textarea
                            className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                            value={editedUser.message}
                            onChange={(e) =>
                                setEditedUser({
                                    ...editedUser,
                                    message: e.target.value,
                                })
                            }
                            placeholder="Сообщение"
                        />
                    </div>
                    <div className="items-center px-4 py-3">
                        <button
                            id="ok-btn"
                            className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                            onClick={handleSave}
                        >
                            Сохранить изменения
                        </button>
                        <button
                            id="cancel-btn"
                            className="mt-3 px-4 py-2 bg-gray-300 text-black text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
