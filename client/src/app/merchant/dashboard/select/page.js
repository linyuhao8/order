"use client";

//component
import Header from "@/components/merchant/common/Header/Header";
import MerchantsList from "@/components/merchant/select/MerchantsList";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import ErrorMessage from "@/components/common/ErrorMessage";

//hook
import withAuth from "@/hoc/withAuth";
import useFetch from "@/hooks/api/useFetch";

const MerchantList = ({ isAuthenticated, user }) => {
  const url = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const {
    data: merchants,
    loading,
    error,
    refetch,
  } = useFetch(url, {
    withCredentials: true,
    enabled: !!user, // 確保 user 有值才執行抓取
  });

  if (loading) return <Loading />;
  if (error)
    return <ErrorMessage errorMessage={error.message} onReload={refetch} />;

  return (
    <>
      <Header name={"Merchants List"} />
      {!merchants?.length ? (
        <p>You don&apos;t have any merchants yet.</p>
      ) : (
        <div className="mb-8">
          <div className="flex justify-start mb-5">
            <div className="flex gap-2">
              <Button
                size="md"
                variant="outline"
                href={`/merchant/dashboard/add-merchant/`}
              >
                Add Merchant
              </Button>
              <Button
                size="md"
                variant="outline"
                href={`/merchant/dashboard/add-merchant-category/`}
              >
                Add Catergory
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <MerchantsList merchants={merchants} fetchMerchants={refetch} />
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MerchantList);
