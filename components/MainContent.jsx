// components/MainContent.js
// import Helper from './MainContent/Helper';
// import Settings from './MainContent/Settings';
import MainScreen from './mainContent/MainScreen';
import Users from './mainContent/Users';
import Business from './mainContent/Business';
import Content from './mainContent/Content';
import UserMessages from './mainContent/UserMessages';

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
