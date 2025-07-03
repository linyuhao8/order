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
  const { data: merchantData, loading: merchantLoading } = useFetch(
    merchantUrl,
    {
      withCredentials: true,
      enabled: !!user,
    }
  );

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
      alert(
        "Please check the number of choices: the minimum should not be greater than the maximum, and the maximum should not exceed the number of choices."
      );
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
    } else if (activeTab === "merchant") {
      console.log("merchant");
      handleAddedOptionState();
    }
    if (closeModal) {
      closeModal();
    }
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
          <InputField
            id="merchant_id"
            name="merchant_id"
            type="select"
            value={optionForm.merchant_id || ""}
            onChange={handleOptionChange}
            label="Select one merchant"
            selectPlaceholder="-- Please select a merchant --"
            options={merchants.map((m) => ({
              id: m.id,
              name: m.business_name,
            }))}
            required
            className="text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <InputField
            id="name"
            type="text"
            name="name"
            value={optionForm.name}
            onChange={handleOptionChange}
            label="Name"
            placeholder="請輸入用戶名稱"
            required
          />
        </div>

        <div>
          <InputField
            id="description"
            name="description"
            type="textarea"
            value={optionForm.description}
            onChange={handleOptionChange}
            label="商品描述"
            placeholder="請輸入詳細描述..."
          />
        </div>

        <div>
          <InputField
            id="type"
            name="type"
            type="select"
            value={optionForm.type}
            onChange={handleOptionChange}
            label="選擇類型"
            selectPlaceholder="-- Select a type --"
            options={[
              { id: "select", name: "Select" },
              { id: "checkbox", name: "Checkbox" },
              { id: "text", name: "Text" },
              { id: "number", name: "Number" },
            ]}
            required
            className="text-sm"
          />
        </div>
        {shouldShowValues && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Min Select */}
            <InputField
              id="min_select"
              name="min_select"
              type="number"
              value={optionForm.min_select}
              onChange={handleOptionChange}
              label="min_select"
              min={0}
              max={
                optionForm.type === "checkbox" ? 1 : optionForm.values.length
              }
              className="text-sm"
            />

            {/* Max Select */}
            <InputField
              id="max_select"
              name="max_select"
              type="number"
              value={optionForm.max_select}
              onChange={handleOptionChange}
              label="max_select"
              min={optionForm.min_select}
              max={
                optionForm.type === "checkbox" ? 1 : optionForm.values.length
              }
              className="text-sm"
            />
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
                className="flex flex-col md:flex-row md:items-end gap-4 md:gap-2 w-full border-b border-gray-200 dark:border-gray-700 py-4"
              >
                {/* Value name */}
                <div className="md:flex-1">
                  <InputField
                    id={`value_${index}`}
                    name="value"
                    type="text"
                    value={val.value}
                    onChange={(e) => handleValueChange(index, e)}
                    label="Value name"
                    placeholder="Value name"
                    className="text-sm"
                  />
                </div>

                {/* Extra price */}
                <div className="md:w-32">
                  <InputField
                    id={`extra_price_${index}`}
                    name="extra_price"
                    type="number"
                    value={val.extra_price}
                    onChange={(e) => handleValueChange(index, e)}
                    label="Extra price"
                    placeholder="Extra price"
                    className="text-sm"
                  />
                </div>

                {/* Default */}
                <div className="flex items-center md:items-end">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Default
                    </label>
                    <InputField
                      id={`is_default_${index}`}
                      name="is_default"
                      type="checkbox"
                      checked={val.is_default}
                      onChange={(e) => handleValueChange(index, e)}
                      label=""
                    />
                  </div>
                </div>

                {/* Sort order */}
                <div className="md:w-24">
                  <InputField
                    id={`sort_order_${index}`}
                    name="sort_order"
                    type="number"
                    value={val.sort_order}
                    onChange={(e) => handleValueChange(index, e)}
                    label="Sort order"
                    placeholder="Order"
                    className="text-sm"
                  />
                </div>

                {/* Delete button */}
                <div className="flex justify-end items-end">
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
          <InputField
            id="default_number"
            name="default_number"
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
            label="Default Number"
            className="text-sm"
          />
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
