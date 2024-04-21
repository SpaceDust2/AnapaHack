import React, { useState } from 'react';

// Компонент для отображения деталей места
const PlaceDetail = ({ place, onBack, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center overflow-y-auto">
      <img className="max-w-full h-auto mt-10" src={place.image} alt={place.title} />
      <div className="text-center p-4">
        <h2 className="font-bold text-3xl mb-2">{place.title}</h2>
        <p className="text-gray-700 text-lg">{place.fulldescription}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onEdit}>
          Редактировать
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={onBack}>
          Вернуться к списку
        </button>
      </div>
    </div>
  );
};

// Форма редактирования
const EditForm = ({ place, onSave, onCancel }) => {
  const [editForm, setEditForm] = useState(place);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center overflow-y-auto">
      <input
        name="title"
        value={editForm.title}
        onChange={handleEditChange}
        className="mb-2 p-2 border"
        placeholder="Название"
      />
      <textarea
        name="description"
        value={editForm.description}
        onChange={handleEditChange}
        className="mb-2 p-2 border"
        placeholder="Краткое описание"
      />
      <textarea
        name="fulldescription"
        value={editForm.fulldescription}
        onChange={handleEditChange}
        className="mb-2 p-2 border"
        placeholder="Полное описание"
      />
      <input
        name="image"
        value={editForm.image}
        onChange={handleEditChange}
        className="mb-2 p-2 border"
        placeholder="Ссылка на изображение"
      />
      <input
        name="type"
        value={editForm.type}
        onChange={handleEditChange}
        className="mb-2 p-2 border"
        placeholder="Тип"
      />
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onSave(editForm)}
      >
        Сохранить изменения
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={onCancel}
      >
        Отмена
      </button>
    </div>
  );
};

// Основной компонент страницы
const PlacesPage = () => {
  const [places,setPlaces] = useState([
    {
        id: 1,
        title: "Сады Моне",
        image: "/images/monet-gardens.jpeg",
        description: "Знаменитые сады Клода Моне в Живерни.",
        fulldescription:
            "Сады Моне в Живерни, созданные знаменитым художником Клодом Моне, являются одним из самых известных туристических мест во Франции. Они вдохновили многие его произведения.",
        type: "Природа",
    },
    {
        id: 2,
        title: "Озеро Байкал",
        image: "/images/baikal.jpeg",
        description:
            "Глубочайшее озеро и крупнейший резервуар пресной воды на планете.",
        fulldescription:
            "Озеро Байкал, известное своей кристально чистой водой, является домом для уникальных видов флоры и фауны. Оно также считается одним из старейших озер на Земле.",
        type: "Природа",
    },
    {
        id: 3,
        title: "Эльбрус",
        image: "/images/elbrus.jpeg",
        description:
            "Самая высокая точка России и Европы, величественный Эльбрус.",
        fulldescription:
            "Гора Эльбрус, расположенная в Кавказских горах, является популярным местом для альпинистов со всего мира. Её двойные вершины видны на многие километры вокруг.",
        type: "Природа",
    },
    {
        id: 4,
        title: "Долина Гейзеров",
        image: "/images/geysers-valley.jpeg",
        description:
            "Уникальный природный комплекс на Камчатке, известный своими гейзерами.",
        fulldescription:
            "Долина Гейзеров на Камчатке - это захватывающее зрелище природных фонтанов горячей воды и пара, которое не имеет аналогов в России.",
        type: "Природа",
    },
    {
        id: 5,
        title: "Красная площадь",
        image: "/images/red-square.jpeg",
        description:
            "Историческая площадь в центре Москвы, знаменитая своими памятниками и архитектурой.",
        fulldescription:
            "Красная площадь, окруженная символами российской истории и культуры, включая Кремль и собор Василия Блаженного, является местом проведения многих государственных и культурных мероприятий.",
        type: "Культура",
    },
    // Добавьте дополнительные места по аналогии
]);
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const openPlace = (place) => {
    setSelectedPlace(place);
  };

  const closePlace = () => {
    setSelectedPlace(null);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === '') {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter(place => place.title.toLowerCase().includes(term.toLowerCase())));
    }
  };

  const handleFilter = (type) => {
    if (type === 'Все') {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(places.filter(place => place.type === type));
    }
  };

  const startEditing = (place) => {
    setIsEditing(true);
    setSelectedPlace(place);
  };

  const saveEdit = (editForm) => {
    setPlaces((prevPlaces) =>
      prevPlaces.map((place) => (place.id === editForm.id ? { ...editForm } : place))
    );
    setIsEditing(false);
    setSelectedPlace(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearch}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-center mb-4">
        <button onClick={() => handleFilter('Все')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">Все</button>
        <button onClick={() => handleFilter('Природа')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-1">Природа</button>
        <button onClick={() => handleFilter('Культура')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-1">Культура</button>
      </div>
      {!selectedPlace && !isEditing && (
        <div className="flex flex-wrap justify-center">
          {filteredPlaces.map((place) => (
            <div key={place.id} className="max-w-sm w-full md:w-1/3 lg:w-1/4 xl:w-1/5 rounded overflow-hidden shadow-lg m-4 cursor-pointer" onClick={() => openPlace(place)}>
              <img className="w-full" src={place.image} alt={place.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{place.title}</div>
                <p className="text-gray-700 text-base">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedPlace && !isEditing && <PlaceDetail place={selectedPlace} onBack={closePlace} onEdit={() => startEditing(selectedPlace)} />}
      {isEditing && <EditForm place={selectedPlace} onSave={saveEdit} onCancel={cancelEdit} />}
    </div>
  );
};

export default PlacesPage;
