// components/MainContent.js
// import Helper from './MainContent/Helper';
// import Settings from './MainContent/Settings';
import MainScreen from './mainContent/MainScreen.jsx';
import Users from './mainContent/Users.jsx';
import Business from './mainContent/Business.jsx';
import Content from './mainContent/Content.jsx';
import UserMessages from './mainContent/UserMessages.jsx';

const MainContent = ({ activeTab }) => {
  // Отображение различного содержимого в зависимости от activeTab
  switch (activeTab) {
    case 'Главный экран':
      return <MainScreen />;
    case 'Пользователи':
      return <Users />;
    case 'Бизнес':
      return <Business />;
    case 'Содержание':
      return <Content />;
    case 'Сообщения пользователей':
      return <UserMessages />;
    // case 'Настройки':
    //   return <Settings />;
    // case 'Техподдержка':
    //   return <Helper />;
    default:
      return <div>Выберите вкладку</div>;
  }
};

export default MainContent;
