"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import toast from "react-hot-toast";

//component
import Header from "@/components/merchant/common/Header/Header";
import MerchantsGrid from "@/components/merchant/select/MerchantsList";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";

//hook
import withAuth from "@/hoc/withAuth";

const MerchantList = ({ isAuthenticated, user }) => {
  const [merchants, setMerchants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //每次載入頁面都會抓取這個user的所有商家資料並顯示
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
        toast.error("無法加載商家資料！");
      } finally {
        setLoading(false);
      }
    };
    fetchMerchants();
  }, [user]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>; 

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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <MerchantsGrid merchants={merchants} />
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MerchantList);
