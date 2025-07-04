"use client";

//component
import Loading from "@/components/common/Loading";
import MerchantsCard from "./MerchantsCard";
//hook
import useFetch from "@/hooks/api/useFetch";

const MerchantList = ({ user }) => {
  const url = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const { data: merchants, loading } = useFetch(url, {
    withCredentials: true,
    enabled: !!user, // 確保 user 有值才執行抓取
  });

  if (loading) return <Loading />;

  return (
    <>
      {!merchants?.length ? (
        <p>You don&apos;t have any merchants yet.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {merchants.map((merchant) => (
            <MerchantsCard
              key={merchant.id}
              merchant={merchant}
              fetchMerchants={fetchMerchants}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MerchantList;
