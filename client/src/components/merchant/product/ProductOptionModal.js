import { useEffect, useState } from "react";
import useFetch from "@/hooks/api/useFetch";
import { Modal } from "@/components/common/Modal";
import OptionGrid from "../option/OptionGrid";
import AddOption from "../option/AddOption";
import _Button from "@/components/common/Button";
import BindProductOption from "./BindProductOption";
import ResponsiveTabs from "@/components/common/ResponsiveTabs";

const ProductOptionModal = ({ user, isOpen, closeModal, product }) => {
  const [options, setOptions] = useState([]);

  const getOptionByProductIdUrl = product?.id
    ? `http://localhost:8082/api/productoptions?product_id=${product.id}`
    : null;

  const { data, loading, error, refetch } = useFetch(getOptionByProductIdUrl, {
    withCredentials: true,
    enabled: false,
  });

  // 第一次或每次 isOpen + product.id 改變就觸發查詢
  useEffect(() => {
    if (isOpen && product.id) {
      refetch();
    }
  }, [isOpen, product.id, refetch]);

  // 當 data 更新時，再轉換成 parsedOptions
  useEffect(() => {
    if (data?.data) {
      const parsedOptions = data.data.map((po) => ({
        ...po.option,
        _productOptionId: po.id,
        _productId: po.product_id,
        _required: po.required,
        _sort_order: po.sort_order,
      }));
      setOptions(parsedOptions);
    }
  }, [data]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="p-5">
        {loading && <p className="text-gray-500">載入中...</p>}
        {error && <p className="text-red-500">載入失敗：{error.message}</p>}

        <p className="mt-2 mb-4">Product: {product.name} </p>
        <ResponsiveTabs
          tabs={[
            { label: "List", value: "list" },
            { label: "bindProduct", value: "bindProduct" },
            { label: "AddOption", value: "addOption" },
          ]}
          defaultValue="list"
          renderContent={(activeTab) => {
            if (activeTab === "list") {
              return (
                <OptionGrid
                  options={options}
                  canUnbind={true}
                  getOptionByProductIdrefetch={refetch}
                />
              );
            } else if (activeTab === "bindProduct") {
              return (
                <BindProductOption
                  filterType="user_id"
                  user={user}
                  productId={product.id}
                  getOptionByProductIdrefetch={refetch}
                />
              );
            } else if (activeTab === "addOption") {
              return <AddOption user={user} />;
            }
            return null;
          }}
        />
      </div>
    </Modal>
  );
};

export default ProductOptionModal;
