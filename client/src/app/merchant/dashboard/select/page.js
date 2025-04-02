"use client";
import { useState, useEffect } from "react";
import axios from "axios";

//component
import MerchantsGrid from "@/components/merchant/select/MerchantsList";

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
      {merchants.length === 0 ? (
        <p>no data</p>
      ) : (
        <div>
          <MerchantsGrid merchants={merchants} />
        </div>
      )}
    </>
  );
};

export default MerchantList;
