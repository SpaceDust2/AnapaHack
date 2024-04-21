// components/Header.js
import { CgProfile } from "react-icons/cg";
import { BiMoon } from "react-icons/bi";
import { IoLanguage } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = ({ onToggleSidebar }) => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        {/* Toggle sidebar button */}
        <button onClick={onToggleSidebar} className="text-gray-600 mr-2">
        <RxHamburgerMenu className="h-6 w-6"/>
        </button>
        {/* Search bar */}
        {/* <input
          type="text"
          placeholder="Поиск..."
          className="border rounded-md px-2 py-1 ml-4"
        /> */}
        <div className="flex items-center">
          {/* Language switch */}
          <button className="text-gray-600 mr-2">
          <IoLanguage className="h-6 w-6" />
          </button>
          {/* Theme switch */}
          <button className="text-gray-600 mr-2">
          <BiMoon className="h-6 w-6" />
          </button>
          {/* Profile icon */}
          <button className="text-gray-600">
          <CgProfile className="h-6 w-6" />
          </button>
        </div>
      </header>
    );
  };
  
  export default Header;
  