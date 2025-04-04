"use client";
import { useState, useEffect } from "react";
import axios from "axios";

//component
import Header from "@/components/merchant/common/Header/Header";
import MerchantsGrid from "@/components/merchant/select/MerchantsList";
import Button from "@/components/common/Button";

//hook
import useSession from "@/hooks/useSesstion";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSession("user");

  useEffect(() => {
    if (!user) return;
    const fetchMerchants = async () => {
      setLoading(true);
      try {
        const userId = user.id;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${userId}/merchants`,
          { withCredentials: true }
        );

        setMerchants(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to load merchants.");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, [user]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <Header />
      {merchants.length === 0 ? (
        <p>You don&apos;t have any merchants yet.</p>
      ) : (
        <div className="mb-8">
          <div className="flex justify-between mb-5">
            <p className="text-xl">Merchants List</p>
            <Button
              size="md"
              variant="outline"
              href={`/merchant/dashboard/add-merchant/`}
            >
              Add Merchant
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2"></div>
          <MerchantsGrid merchants={merchants} />
        </div>
      )}
    </>
  );
};

export default MerchantList;
