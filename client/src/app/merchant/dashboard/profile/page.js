"use client";
import Header from "@/components/merchant/common/Header/Header";
import UserProfile from "@/components/merchant/Profile/UserProfile";
import withAuth from "@/hoc/withAuth";

const Page = ({ user }) => {
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

export default withAuth(Page);
