"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import Button from "@/components/common/Button";
import useFetch from "@/hooks/api/useFetch";
import Loading from "@/components/common/Loading";

const AddOption = ({
  activeTab,
  user,
  getOptionByUserRefetch,
  handleAddedOptionState,
  closeModal,
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/options/create`;
  const merchantUrl = user
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/merchants/user/${user.id}/merchants`
    : null;

  const [merchants, setMerchants] = useState([]);
  const [optionForm, setOptionForm] = useState({
    name: "",
    description: "",
    type: "select",
    min_select: 0,
    max_select: 1,
    user_id: user?.id || null,
    merchant_id: null,
    is_global: false,
    values: [
      {
        value: "",
        extra_price: 0,
        is_default: false,
        sort_order: 1,
      },
    ],
  });

  //Get Data
  const {
    data: merchantData,
    loading: merchantLoading,
    error: merchantError,
  } = useFetch(merchantUrl, {
    withCredentials: true,
    enabled: !!user,
  });

  useEffect(() => {
    if (merchantData) {
      setMerchants(merchantData);
    }
  }, [merchantData]);

  //POST to Option Create
  const { loading, refetch } = useFetch(url, {
    withCredentials: true,
    enabled: false,
  });

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptionForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleValueChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newValues = [...optionForm.values];
    newValues[index][name] = type === "checkbox" ? checked : value;
    setOptionForm((prev) => ({ ...prev, values: newValues }));
  };

  const addOptionValue = () => {
    setOptionForm((prev) => ({
      ...prev,
      values: [
        ...prev.values,
        {
          value: "",
          extra_price: 0,
          is_default: false,
          sort_order: prev.values.length + 1,
        },
      ],
    }));
  };

  const removeOptionValue = (index) => {
    setOptionForm((prev) => ({
      ...prev,
      values: prev.values.filter((_, i) => i !== index),
    }));
  };

  const handleOptionSubmit = async (e) => {
    if (
      shouldShowValues &&
      (optionForm.min_select > optionForm.max_select ||
        optionForm.max_select > optionForm.values.length)
    ) {
      alert("請檢查選擇數量設定：最少不能大於最多，最多不能超過選項數");
      return;
    }

    e.preventDefault();
    await refetch({ method: "POST", body: optionForm });
    setOptionForm({
      name: "",
      description: "",
      type: "select",
      min_select: 1,
      max_select: 1,
      user_id: user?.id || null,
      merchant_id: null,
      is_global: false,
      values: [
        {
          value: "",
          extra_price: 0,
          is_default: false,
          sort_order: 1,
        },
      ],
    });
    if (activeTab === "user") {
      console.log("user");
      getOptionByUserRefetch();
    } else {
      console.log("merchant");
      handleAddedOptionState();
    }
    closeModal();
  };

  useEffect(() => {
    if (optionForm) {
      console.log(optionForm);
    }
  }, [optionForm]);

  if (loading || merchantLoading) return <Loading />;

  const shouldShowValues = ["select", "checkbox"].includes(optionForm.type);

  return (
    <div className="dark:bg-gray-800 shadow-md overflow-hidden rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-200">
          Option Info
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create an option with multiple values.
        </p>
      </div>

      <form
        onSubmit={handleOptionSubmit}
        className="px-4 py-5 sm:p-6 space-y-6"
      >
        {/* 商家下拉選單 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            商家 <span className="text-red-500">*</span>
          </label>
          <select
            name="merchant_id"
            value={optionForm.merchant_id || ""}
            onChange={handleOptionChange}
            className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-100"
            required
          >
            <option value="">-- 請選擇商家 --</option>
            {merchants.map((m) => (
              <option key={m.id} value={m.id}>
                {m.business_name}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Name <span className="text-red-500">*</span>
          </label>
          <InputField
            type="text"
            name="name"
            value={optionForm.name}
            onChange={handleOptionChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            rows={2}
            value={optionForm.description}
            onChange={handleOptionChange}
            className="w-full p-2 text-sm border rounded-md dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type <span className="text-red-500">*</span>
          </label>
          <select
            name="type"
            value={optionForm.type}
            onChange={handleOptionChange}
            className="w-full p-2 mt-1 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-100"
            required
          >
            <option value="">-- Select a type --</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="text">Text</option>
            <option value="number">Number</option>
          </select>
        </div>

        {shouldShowValues && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Min Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                最少選擇數 (min_select)
              </label>
              <input
                type="number"
                name="min_select"
                value={optionForm.min_select}
                onChange={handleOptionChange}
                className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-100"
                min={0}
                max={
                  optionForm.type === "checkbox" ? 1 : optionForm.values.length
                }
              />
            </div>

            {/* Max Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                最多選擇數 (max_select)
              </label>
              <input
                type="number"
                name="max_select"
                value={optionForm.max_select}
                onChange={handleOptionChange}
                className="w-full p-2 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-100"
                min={optionForm.min_select}
                max={
                  optionForm.type === "checkbox" ? 1 : optionForm.values.length
                }
              />
            </div>
          </div>
        )}

        {shouldShowValues && (
          <div className="space-y-2">
            <h3 className="text-md font-semibold text-gray-700 dark:text-gray-200">
              Option Values
            </h3>
            {optionForm.values.map((val, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-2 items-start mb-4"
              >
                {/* Value 名稱 */}
                <div className="col-span-4">
                  <label className="block text-xs text-gray-600 mb-1">
                    Value name
                  </label>
                  <input
                    type="text"
                    name="value"
                    value={val.value}
                    onChange={(e) => handleValueChange(index, e)}
                    placeholder="Value name"
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>

                {/* 加價 */}
                <div className="col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Extra price
                  </label>
                  <input
                    type="number"
                    name="extra_price"
                    value={val.extra_price}
                    onChange={(e) => handleValueChange(index, e)}
                    placeholder="Extra price"
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>

                {/* 是否預設 */}
                <div className="col-span-1">
                  <label className="block text-xs text-gray-600 mb-1">
                    Default
                  </label>
                  <div className="flex items-center h-[38px]">
                    <input
                      type="checkbox"
                      name="is_default"
                      checked={val.is_default}
                      onChange={(e) => handleValueChange(index, e)}
                    />
                  </div>
                </div>

                {/* 排序 */}
                <div className="col-span-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    Sort order
                  </label>
                  <input
                    type="number"
                    name="sort_order"
                    value={val.sort_order}
                    onChange={(e) => handleValueChange(index, e)}
                    placeholder="Order"
                    className="w-full p-2 text-sm border rounded"
                  />
                </div>

                {/* 刪除按鈕 */}
                <div className="col-span-2 flex items-end">
                  <button
                    type="button"
                    onClick={() => removeOptionValue(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addOptionValue}
              variant="outline"
              size="md"
            >
              + Add Value
            </Button>
          </div>
        )}

        {optionForm.type === "number" && (
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-200">
              Default Number
            </label>
            <input
              type="number"
              onChange={(e) =>
                setOptionForm((prev) => ({
                  ...prev,
                  values: [
                    {
                      value: e.target.value,
                      extra_price: 0,
                      is_default: false,
                      sort_order: 1,
                    },
                  ],
                }))
              }
              className="p-2 border rounded w-full"
            />
          </div>
        )}

        {optionForm.type === "text" && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            No option values needed for text type.
          </div>
        )}

        <div className="text-right">
          <Button type="submit" disabled={loading} variant="default" size="lg">
            {loading ? "Submitting..." : "Submit Option"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddOption;
