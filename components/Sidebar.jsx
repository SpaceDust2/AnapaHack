

const Sidebar = ({ activeTab, setActiveTab }) => {
    return (
      <aside className="bg-gray-700 text-white w-64 space-y-2 py-4 flex flex-col">
        {/* Logo */}
        <div className="px-4 mb-4">
          <img src="/logo.jpeg" alt="Логотип приложения" className="w-16 h-16" />
        </div>
        {/* Navigation */}
        <nav className="flex-grow px-4">
          <ul className="space-y-1 cursor-pointer">
            {['Главный экран', 'Пользователи', 'Бизнес', 'Содержание', 'Сообщения пользователей'].map((tab) => (
              <li
                key={tab}
                className={`rounded-md p-2 transition-colors duration-300 ${
                  activeTab === tab ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-200 text-white hover:text-blue-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
        {/* Support and settings buttons */}
        <div className="px-4 mt-auto">
          <button className="text-white hover:bg-blue-200 hover:text-blue-800 rounded-md p-2 transition-colors duration-300">
            Техподдержка
          </button>
          <button className="text-white hover:bg-blue-200 hover:text-blue-800 rounded-md p-2 transition-colors duration-300">
            Настройки
          </button>
          {/* <ul>
          {['Техподдержк','Настройки'].map((tab) => (
              <li
                key={tab}
                className={`rounded-md p-2 transition-colors duration-300 ${
                  activeTab === tab ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-200 text-white hover:text-blue-800'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}</ul> */}
        </div>
      </aside>
    );
  };
  
  export default Sidebar;
  