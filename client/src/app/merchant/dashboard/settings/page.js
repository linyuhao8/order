import Setting from "@/components/merchant/setting/Setting";
import withAuth from "@/hoc/withAuth";

const SettingPage = ({ user }) => {
  if (!user) {
    return null; // if on data return loading
  }

  return <Setting settingActiveTab="account" user={user} />;
};

export default withAuth(SettingPage);
