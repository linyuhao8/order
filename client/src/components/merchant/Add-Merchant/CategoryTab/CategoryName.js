import InputField from "@/components/common/InputField";

const CategoryName = ({ categoryForm, handleCategoryChange }) => {
  return (
    <div className="sm:col-span-4">
      <label
        htmlFor="categoryName"
        className="block text-sm font-medium text-gray-700"
      >
        分類名稱 <span className="text-red-500">*</span>
      </label>

      <InputField
        type="text"
        name="name"
        id="categoryName"
        placeholder={"姓名"}
        value={categoryForm.name}
        onChange={handleCategoryChange}
      />
    </div>
  );
};

export default CategoryName;
