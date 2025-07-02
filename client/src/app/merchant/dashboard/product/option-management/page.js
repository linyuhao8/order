"use client";

//hook
import withAuth from "@/hoc/withAuth";
//component
import Header from "@/components/merchant/common/Header/Header";
import OptionManagement from "@/components/merchant/option/OptionManagement";

function AddMerchantPage({ user }) {
  if (!user) return null;
  return (
    <>
      <Header name={"Management Option"} user={user} />
      <OptionManagement user={user} active={"user"} />
    </>
  );
}

export default withAuth(AddMerchantPage);
