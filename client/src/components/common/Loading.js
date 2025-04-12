"use client";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-10">
      <p className="text-gray-600 mb-4">Loading...</p>
      <div className="w-8 h-8 border-4 border-t-amber-500 border-gray-200 rounded-full animate-spin" />
    </div>
  );
};

export default Loading;
