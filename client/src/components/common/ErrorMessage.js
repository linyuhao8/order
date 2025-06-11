export default function ErrorMessage({ errorMessage, onReload }) {
  return (
    <div
      role="alert"
      className="flex justify-between items-center gap-4 p-4 my-4 border border-red-500 rounded-lg bg-red-100 text-red-700"
    >
      <span>{errorMessage || "Error"}</span>
      <button
        onClick={onReload}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded cursor-pointer transition-colors"
      >
        ReLoad
      </button>
    </div>
  );
}
