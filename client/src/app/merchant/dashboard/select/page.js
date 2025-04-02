"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import MerchantsGrid from "@/components/merchant/select/MerchantsList";

const MerchantList = () => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const userId = "1cafe0e1-5f4d-4cd0-863b-284bbf74970a"; 
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
  }, []);

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
