const Search = () => {
  return (
    <div className="relative flex-grow max-w-xs">
      <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
      <input
        type="text"
        placeholder="Search"
        className=" px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
      />
    </div>
  );
};

export default Search;
