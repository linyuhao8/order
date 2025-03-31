import React from "react";
import InputField from "@/components/common/InputField";
import { SubModal } from "@/components/common/Model";
import Button from "@/components/common/Button";

const SettingSubModal = ({
  isOpen,
  closeModal,
  label,
  value,
  inputValue,
  handleSubmit,
  isUpdate,
  setInputValue,
}) => {
  return (
    <SubModal isOpen={isOpen} closeModal={closeModal}>
      <div className="p-3">
        <h3 className="text-xl font-bold">Variation {label}</h3>

        <form onSubmit={handleSubmit}>
          <InputField
            id={label}
            name={label}
            type="text"
            autoComplete={true}
            required={true}
            placeholder={value}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="rounded-sm"
          />
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isUpdate}
            className="mt-3"
          >
            {isUpdate ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </SubModal>
  );
};

export default SettingSubModal;
