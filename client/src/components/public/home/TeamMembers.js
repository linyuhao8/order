const TeamMembers = () => {
  return (
    <div className="mt-20 text-center mb-8">
      <p className="text-gray-500 text-sm mb-4">Gourmet Food</p>
      <div className="flex justify-center space-x-2">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <div
            key={id}
            className="h-10 w-10 rounded-full bg-gray-50 overflow-hidden"
          >
            <div className="h-full w-full bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
