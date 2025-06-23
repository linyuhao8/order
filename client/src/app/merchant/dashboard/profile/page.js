"use client";
import Header from "@/components/merchant/common/Header/Header";
import UserProfile from "@/components/merchant/Profile/UserProfile";
import withAuth from "@/hoc/withAuth";
import Loading from "@/components/common/Loading";

const Page = ({ user }) => {
  if (!user) return null;
  return (
    <>
      <Header name={"Profile"} user={user} />
      <div className="max-w-xl">
        <UserProfile user={user} />
      </div>
    </>
  );
};

export default withAuth(Page);
