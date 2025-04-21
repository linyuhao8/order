"use client";

//hook
import withAuth from "@/hoc/withAuth";
//component
import MerchantCreateTabs from "@/components/merchant/Add-Merchant/MerchantCreateTabs";

function AddCategoryPage({ user }) {
  return (
    <>
      <MerchantCreateTabs user={user} active={"category"} />
    </>
  );
}

export default withAuth(AddCategoryPage);
