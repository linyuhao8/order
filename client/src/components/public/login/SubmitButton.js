export default function SubmitButton({ loading }) {
  return (
    <div className="submit-btn pt-2">
      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl text-white text-base font-medium bg-gradient-to-r 
                    from-amber-400 
                    to-amber-500 hover:from-amber-500 hover:to-amber-600 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 
                    focus:ring-amber-500 transition duration-200 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          "login"
        )}
      </button>
    </div>
  );
}
