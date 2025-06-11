"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Component
import Header from "@/components/merchant/common/Header/Header";
import Button from "@/components/common/Button";
import Loading from "@/components/common/Loading";
import MerchantsCard from "@/components/merchant/select/MerchantsCard";
import MerchantMenu from "@/components/merchant/menu/MerchantMenu";

// HOC
import withAuth from "@/hoc/withAuth";

const MerchantPage = ({ isAuthenticated, user }) => {
  const { merchantId } = useParams();
  const router = useRouter();

  const [merchant, setMerchant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMerchant = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/${merchantId}`,
        { withCredentials: true }
      );
      setMerchant(res.data);
    } catch (err) {
      setError("無法載入商家資料");
      toast.error("無法載入商家資料！");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !merchantId) return;
    fetchMerchant();
  }, [user, merchantId]);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;
  if (!merchant) return null;

  return (
    <>
      <Header name={`商家：${merchant.business_name}`} />
      <MerchantsCard merchant={merchant} />
      <div className="py-5">
        <Button
          size="md"
          variant="outline"
          href={`/merchant/${merchantId}/add-menu`}
        >
          新增 Menu
        </Button>
        <Button
          size="md"
          variant="outline"
          href={`/merchant/${merchantId}/add-product`}
          className="ml-2"
        >
          新增 Product
        </Button>
      </div>
      <div className="flex gap-3 mt-2">
        <MerchantMenu id={merchantId} />
      </div>
    </>
  );
};

export default withAuth(MerchantPage);
