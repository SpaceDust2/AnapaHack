import React from 'react';

const ImageGallery = ({ businessId }) => {
  // Предполагается, что ID бизнеса используется в названиях папок
  const images = Array.from({ length: 5 }, (_, index) => `/${businessId}/${index + 1}.jpeg`);

  return (
    <div className="flex overflow-x-auto py-2">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Изображение бизнеса ${businessId} ${index + 1}`}
          className="mx-2 rounded-lg shadow-md"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
