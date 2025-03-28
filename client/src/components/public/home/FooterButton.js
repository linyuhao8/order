const FooterButton = () => {
    return (
      <div className="fixed bottom-4 right-4">
        <button className="flex items-center space-x-2 bg-gray-800 text-white rounded-full px-4 py-2 text-sm">
          <span>Book meeting</span>
          <div className="h-6 w-6 rounded-full bg-gray-300"></div>
        </button>
      </div>
    );
  };
  
  export default FooterButton;
  