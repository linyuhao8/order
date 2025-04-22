"use client";

//hook
import withAuth from "@/hoc/withAuth";
//component
import MerchantCreateTabs from "@/components/merchant/Add-Merchant/MerchantCreateTabs";
import Header from "@/components/merchant/common/Header/Header";

function AddMerchantPage({ user }) {
  return (
    <>
    <Header name={"Added new merchant information page"} />
      <MerchantCreateTabs user={user} active={"merchant"} />
    </>
  );
}

export default withAuth(AddMerchantPage);
