"use client";

//hook
import withAuth from "@/hoc/withAuth";
//component
import MerchantCreateTabs from "@/components/merchant/add-component/add-merchant-and-category/MerchantCreateTabs";
import Header from "@/components/merchant/common/Header/Header";

function AddMerchantPage({ user }) {
  return (
    <>
      <Header name={"Added new merchant information page"} user={user} />
      <MerchantCreateTabs user={user} />
    </>
  );
}

export default withAuth(AddMerchantPage);
