// AuthorizedBusinessList.js
import React from 'react';

const AuthorizedBusinessList = ({ businesses }) => {
  return (
    <div className="authorized-business-list">
      {businesses.map((business) => (
        <div key={business.id} className="business-card">
          <h3>{business.name}</h3>
          <p>{business.description}</p>
          {/* Дополнительная информация о бизнесе */}
        </div>
      ))}
    </div>
  );
};

export default AuthorizedBusinessList;
