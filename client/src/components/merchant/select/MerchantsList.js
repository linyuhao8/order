import MerchantsCard from "./MerchantsCard";

const MerchantsList = ({ merchants }) => {
  return (
    <>
      {merchants.map((merchant) => (
        <MerchantsCard key={merchant.id} merchant={merchant} />
      ))}
    </>
  );
};

export default MerchantsList;
