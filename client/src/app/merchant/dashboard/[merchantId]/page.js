"use client";
import { useParams } from "next/navigation";

// Component
import Header from "@/components/merchant/common/Header/Header";
import Button from "@/components/common/Button";
import MerchantsCard from "@/components/merchant/select/MerchantsCard";
import MerchantMenu from "@/components/merchant/menu/MerchantMenu";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

// HOC
import withAuth from "@/hoc/withAuth";
import useFetch from "@/hooks/api/useFetch";

const MerchantPage = ({ isAuthenticated, user }) => {
  const { merchantId } = useParams();

  const url = merchantId
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/${merchantId}`
    : null;

  const {
    data: merchant,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: !!merchantId,
  });
  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;
  if (!merchant) return null;

  return (
    <>
      <Header name={`Merchant Detail`} />
      <MerchantsCard merchant={merchant} />
      <div className="py-5">
        <Button
          size="md"
          variant="outline"
          href={`/merchant/dashboard/${merchantId}/add-menu`}
        >
          新增 Menu
        </Button>
        <Button
          size="md"
          variant="outline"
          href={`/merchant//dashboard/${merchantId}/add-product`}
          className="ml-2"
        >
          新增 Product
        </Button>
      </div>
      <MerchantMenu id={merchantId} />
    </>
  );
};

export default withAuth(MerchantPage);
