const InformationBlock = ({ title, content }) => {
    return (
      <div className="bg-white shadow rounded-lg p-4 mb-8">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p>{content}</p>
      </div>
    );
  };
  
  export default InformationBlock;
  