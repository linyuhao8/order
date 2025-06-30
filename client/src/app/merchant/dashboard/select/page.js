"use client";
import MerchantList from "@/components/merchant/merchant/MerchantList";
//hook
import withAuth from "@/hoc/withAuth";

const MerchantSelect = ({ user }) => {
  return (
    <>
      <MerchantList user={user} />
    </>
  );
};

export default withAuth(MerchantSelect);
