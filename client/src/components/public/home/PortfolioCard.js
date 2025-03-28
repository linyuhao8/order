const PortfolioCard = ({ merchant }) => {
    return (
      <div className="rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-600">
        <div className="flex justify-between items-center px-5 py-6">
          <div>
            <h3 className="text-lg font-medium">{merchant.business_name}</h3>
            <p className="text-sm">{merchant.location}</p>
            <p className="text-sm">{merchant.time}</p>
          </div>
          <div className="flex flex-col items-center justify-between">
            <span className="text-sm">215.3km</span>
            <div className="flex nowrap gap-2">
              <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden"></div>
              <div className="h-7 w-7 rounded-full bg-gray-300 overflow-hidden"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PortfolioCard;
  