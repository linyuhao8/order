"use client";
import withAuth from "@/hoc/withAuth";
import Header from "@/components/merchant/common/Header/Header";
import UserProfile from "@/components/merchant/Profile/UserProfile";
import Loading from "@/components/common/Loading";

function Dashboard({ isAuthenticated, user }) {
  if (!user || isAuthenticated === null) {
    return <Loading />;
  }

  const userId = user.id;
  return (
    <>
      {/* Main Content - Adjusted for Responsiveness */}
      <div>
        <Header name={"Dashboard"}/>
        {/* Grid Layout with Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserProfile userId={userId} />
          {/* Activity Card */}
          <div className="col-span-1 md:col-span-2 md:col-span-3 xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold dark:text-white">
                Weekly Activity
              </h2>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-44 h-44 mb-4">
                <svg className="w-full h-full" viewBox="0 0 180 180">
                  <circle
                    cx="90"
                    cy="90"
                    r="75"
                    fill="none"
                    // stroke={theme === "dark" ? "#374151" : "#f3f4f6"}
                    strokeWidth="12"
                  />
                  <circle
                    cx="90"
                    cy="90"
                    r="75"
                    fill="none"
                    stroke="#FD9A00"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="472"
                    strokeDashoffset="132"
                    transform="rotate(-90 90 90)"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-amber-600 dark:text-amber-400">
                  72%
                </div>
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Weekly activity
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <i className="fas fa-pen-ruler"></i>
                </div>
                <div>
                  <div className="text-sm font-medium dark:text-white">
                    Design
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    72%
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-yellow-500 flex items-center justify-center text-white">
                  <i className="fas fa-comments"></i>
                </div>
                <div>
                  <div className="text-sm font-medium dark:text-white">
                    Communication
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    28%
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Working Format Card */}
          <div className="bg-white dark:bg-gray-800 md:col-span-2 xl:col-span-1 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold dark:text-white">
                Working Format
              </h2>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
            <div className="flex justify-between h-32">
              <div className="w-5/12 h-full rounded-lg bg-amber-500 bg-opacity-80 flex flex-col items-center justify-end p-4 text-white">
                <div className="text-2xl font-semibold mb-2">42%</div>
                <div className="text-sm">Remote</div>
              </div>
              <div className="w-5/12 h-full rounded-lg bg-teal-500 flex flex-col items-center justify-end p-4 text-white">
                <div className="text-2xl font-semibold mb-2">58%</div>
                <div className="text-sm">Hybrid</div>
              </div>
            </div>
          </div>

          {/* Time Tracking Card */}
          <div className="bg-white dark:bg-gray-800 md:col-span-1 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-semibold dark:text-white">
                Time Tracking
              </h2>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
            <div className="text-3xl font-bold text-center my-6 dark:text-white">
              03:45:21
            </div>
            <div className="space-y-4">
              <div className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white mr-3">
                  <i className="fas fa-search"></i>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium dark:text-white mb-1">
                    UX Research
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    01:34:07
                  </div>
                </div>
                <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
                </button>
              </div>
              <div className="flex items-center py-3">
                <div className="w-8 h-8 rounded-lg bg-gray-500 flex items-center justify-center text-white mr-3">
                  <i className="fas fa-pencil-ruler"></i>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium dark:text-white mb-1">
                    Wireframing
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    02:11:14
                  </div>
                </div>
                <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                  <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="col-span-1 md:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold dark:text-white">
                  January 2025
                </h2>
              </div>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <i className="fas fa-chevron-left text-xs"></i>
                </button>
                <button className="w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300">
                  <i className="fas fa-chevron-right text-xs"></i>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                M
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                T
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                W
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                T
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                F
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                S
              </div>
              <div className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 p-2">
                S
              </div>

              {/* Previous month days */}
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                27
              </div>
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                28
              </div>
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                29
              </div>
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                30
              </div>

              {/* Current month days */}
              {[...Array(31)].map((_, i) => {
                const day = i + 1;
                const isToday = day === 12;
                const hasEvents = [12, 13, 15].includes(day);

                return (
                  <div
                    key={day}
                    className={`aspect-square rounded-lg flex items-center justify-center relative cursor-pointer
                        ${
                          isToday
                            ? "bg-amber-500 text-white"
                            : "hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
                        }`}
                  >
                    {day}
                    {hasEvents && (
                      <div
                        className={`absolute bottom-1 w-1 h-1 rounded-full ${
                          isToday ? "bg-white" : "bg-amber-500"
                        }`}
                      ></div>
                    )}
                  </div>
                );
              })}

              {/* Next month days */}
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                1
              </div>
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                2
              </div>
              <div className="aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600 opacity-50">
                3
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="w-20 font-medium dark:text-white">12:00</div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white mb-1">
                    One to One
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    with CEO
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="w-20 font-medium dark:text-white">13:40</div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white mb-1">
                    Sales Meeting
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Marketing team
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <i className="fas fa-users"></i>
                </div>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="w-20 font-medium dark:text-white">17:00</div>
                <div className="flex-1">
                  <div className="font-medium dark:text-white mb-1">
                    Design Review
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    UI/UX team
                  </div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center text-white">
                  <i className="fas fa-pen-ruler"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
