"use client";

//hook
import withAuth from "@/hoc/withAuth";
//component
import MerchantCreateTabs from "@/components/merchant/Add-Merchant/MerchantCreateTabs";
import Header from "@/components/merchant/common/Header/Header";

function AddCategoryPage({ user }) {
  return (
    <>
      <Header name={"Added new merchant information page"} user={user} />
      <MerchantCreateTabs user={user} active={"category"} />
    </>
  );
}

export default withAuth(AddCategoryPage);
