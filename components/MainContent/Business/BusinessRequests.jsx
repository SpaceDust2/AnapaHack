// BusinessRequests.js
import React from 'react';

const BusinessRequests = ({ requests }) => {
  return (
    <div className="business-requests">
      {requests.map((request) => (
        <div key={request.id} className="request-card">
          <h3>{request.name}</h3>
          <p>{request.description}</p>
          {/* Дополнительная информация о заявке */}
        </div>
      ))}
    </div>
  );
};

export default BusinessRequests;
