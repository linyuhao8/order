"use client";
import { useParams } from "next/navigation";

// Component
import Header from "@/components/merchant/common/Header/Header";
import Button from "@/components/common/Button";
import MerchantsCard from "@/components/merchant/select/MerchantsCard";
import MerchantMenu from "@/components/merchant/menu/MerchantMenu";
import Loading from "@/components/common/Loading";

// HOC
import withAuth from "@/hoc/withAuth";
import useFetch from "@/hooks/api/useFetch";

const MerchantPage = ({ user }) => {
  const { merchantId } = useParams();

  const url = merchantId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/${merchantId}`
    : null;

  const { data: merchant, loading } = useFetch(url, {
    withCredentials: true,
    enabled: !!merchantId,
  });

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <>
      <Header name={`${merchant?.business_name || "商家資訊"}`} user={user} />
      {!merchant ? (
        <div>
          There ar no merchant you choose
          <Button variant="outline" href="/merchant/dashboard/add-merchant">
            Create Merchant
          </Button>
        </div>
      ) : (
        <>
          <div className="py-5">
            <Button
              variant="outline"
              href="/merchant/dashboard/product/option-management"
              className="ml-2"
            >
              Option management
            </Button>
          </div>
          <MerchantMenu id={merchantId} />
          <MerchantsCard merchant={merchant} />
        </>
      )}
    </>
  );
};

export default withAuth(MerchantPage);
