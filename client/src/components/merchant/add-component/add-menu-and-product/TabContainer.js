"use client";

//component
import AddMenuTab from "./AddMenuTab";
import AddProductTab from "./AddProductTab";
import Loading from "@/components/common/Loading";
import ResponsiveTabs from "@/components/common/ResponsiveTabs";

const TabContainer = ({ merchantId }) => {
  if (!merchantId) return <Loading />;
  return (
    <>
      <ResponsiveTabs
        tabs={[
          { label: "Add Menu", value: "menu" },
          { label: "Add Product", value: "product" },
        ]}
        defaultValue="menu"
        renderContent={(activeTab) => {
          if (activeTab === "menu") {
            return <AddMenuTab activeTab={activeTab} merchantId={merchantId} />;
          } else if (activeTab === "product") {
            return (
              <AddProductTab activeTab={activeTab} merchantId={merchantId} />
            );
          }
          return null;
        }}
      />
    </>
  );
};

export default TabContainer;
