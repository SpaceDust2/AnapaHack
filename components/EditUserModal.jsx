"use client"
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
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Редактирование пользователя</h3>
            <div className="mt-2 px-7 py-3">
              <input
                type="text"
                className="border-2 border-gray-300 p-2 rounded w-full"
                value={editedUser.fullName}
                onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                placeholder="Полное имя"
              />
              <input
                type="text"
                className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                placeholder="Роль"
              />
              <input
                type="number"
                className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                value={editedUser.points}
                onChange={(e) => setEditedUser({ ...editedUser, points: parseInt(e.target.value, 10) })}
                placeholder="Баллы"
              />
              <textarea
                className="border-2 border-gray-300 p-2 rounded w-full mt-4"
                value={editedUser.message}
                onChange={(e) => setEditedUser({ ...editedUser, message: e.target.value })}
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
  