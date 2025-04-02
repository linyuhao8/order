"use client";
import Header from "@/components/merchant/common/Header/Header";
import UserProfile from "@/components/merchant/common/UserProfile";
import useSession from "@/hooks/useSesstion";

const Page = () => {
  const user = useSession("user");
  if (!user) {
    return <div>Loading...</div>; // 如果資料尚未讀取，顯示 Loading
  }
  const userId = user.id;
  return (
    <>
      <Header />
      <UserProfile userId={userId} />
    </>
  );
};

export default Page;
