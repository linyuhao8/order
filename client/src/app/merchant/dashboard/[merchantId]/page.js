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
      <Header name={`${merchant?.business_name || "商家資訊"}`} />
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
        <Button
          variant="outline"
          href="/merchant/dashboard/product/option-management"
          className="ml-2"
        >
          管理商品選項
        </Button>
        <Button
          variant="outline"
          href="/merchant/dashboard/select"
          className="ml-2"
        >
          back
        </Button>
      </div>
      <MerchantMenu id={merchantId} />
      <MerchantsCard merchant={merchant} />
    </>
  );
};

export default withAuth(MerchantPage);
