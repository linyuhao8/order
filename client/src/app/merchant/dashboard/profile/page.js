"use client";
import Header from "@/components/merchant/common/Header/Header";
import UserProfile from "@/components/merchant/Profile/UserProfile";
import withAuth from "@/hoc/withAuth";
import Loading from "@/components/common/Loading";

const Page = ({ user }) => {
  if (!user) return <Loading />;
  const userId = user.id;
  return (
    <>
      <Header name={"Profile"} />
      <UserProfile userId={userId} />
    </>
  );
};

export default withAuth(Page);
