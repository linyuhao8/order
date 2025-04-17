const CategoryDescription = ({ categoryForm, handleCategoryChange }) => {
  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="categoryDescription"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200"
      >
        分類描述
      </label>
      <div className="mt-1">
        <textarea
          id="categoryDescription"
          name="description"
          rows={3}
          value={categoryForm.description}
          onChange={handleCategoryChange}
          className="p-2 focus:outline-none appearance-none  block w-full sm:text-sm border border-gray-300 dark:border-gray-500 rounded-md"
        />
      </div>
    </div>
  );
};

export default CategoryDescription;
