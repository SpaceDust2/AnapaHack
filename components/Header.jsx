// components/Header.js

const Header = ({ onToggleSidebar }) => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        {/* Toggle sidebar button */}
        <button onClick={onToggleSidebar} className="text-gray-600 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* Search bar */}
        <input
          type="text"
          placeholder="Поиск..."
          className="border rounded-md px-2 py-1 ml-4"
        />
        <div className="flex items-center">
          {/* Language switch */}
          <button className="text-gray-600 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5h12M9 3v18m6-6h8.5a1.5 1.5 0 001.5-1.5v-9a1.5 1.5 0 00-1.5-1.5H15"
              />
            </svg>
          </button>
          {/* Theme switch */}
          <button className="text-gray-600 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 2a9 9 0 00-9 9h18a9 9 0 00-9-9z"
              />
            </svg>
          </button>
          {/* Profile icon */}
          <button className="text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
            </svg>
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;
  