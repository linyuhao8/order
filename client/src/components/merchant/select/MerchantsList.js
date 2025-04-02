import MerchantsCard from "./MerchantsCard";

const MerchantsList = ({ merchants }) => {
  return (
    <div className="mb-8">
      <p className="text-center text-sm text-gray-500 mb-6">Merchants List</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {merchants.map((merchant) => (
          <MerchantsCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </div>
  );
};

export default MerchantsList;
