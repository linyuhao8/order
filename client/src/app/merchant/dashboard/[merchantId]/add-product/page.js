"use client";
import { useParams } from "next/navigation";
//hook
import withAuth from "@/hoc/withAuth";
//component
import Header from "@/components/merchant/common/Header/Header";
import AddMenu from "@/components/merchant/add-component/add-menu-and-product/AddBody";

function AddMenuPage({ user }) {
  const { merchantId } = useParams();
  return (
    <>
      <Header name={"Menu"} user={user} />
      <AddMenu user={user} active={"product"} merchantId={merchantId} />
    </>
  );
}

export default withAuth(AddMenuPage);
