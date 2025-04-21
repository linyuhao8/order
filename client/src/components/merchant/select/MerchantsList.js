import MerchantsCard from "./MerchantsCard";

const MerchantsList = ({ merchants, fetchMerchants }) => {
  return (
    <>
      {merchants.map((merchant) => (
        <MerchantsCard
          key={merchant.id}
          merchant={merchant}
          fetchMerchants={fetchMerchants}
        />
      ))}
    </>
  );
};

export default MerchantsList;
