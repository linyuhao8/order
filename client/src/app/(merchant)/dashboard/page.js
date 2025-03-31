"use client";
//icon
import { IoIosSettings } from "react-icons/io";
import { FaCloudSun } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

//redux
import { toggleTheme } from "@/lib/slices/themeSlice";
import { useSelector, useDispatch } from "react-redux";

//hook
import useThemeSwitcher from "@/hooks/ui/useThemeSwitcher";
import withAuth from "@/hoc/withAuth";

//model
import { Modal, SubModal } from "@/components/common/Model";
import useModel from "@/hooks/ui/useModel";
import SettingPage from "./settings/page";

function Dashboard() {
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const [isModalOpen, openModal, closeModal] = useModel();
  const [isSubModalOpen, openSubModal, closeSubModal] = useModel();


  useThemeSwitcher(theme);

  return (
    <>
      {/* Main Content - Adjusted for Responsiveness */}
      <div>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <h1 className="text-2xl font-semibold dark:text-white">
            Merchant Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-grow max-w-xs">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => dispatch(toggleTheme())}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 cursor-pointer"
              >
                {theme === "dark" ? <MdDarkMode /> : <FaCloudSun />}
              </button>
              <div>
                <button onClick={openModal}>
                  Open Main Modal
                </button>

                <Modal
                  isOpen={isModalOpen}
                  closeModal={closeModal}
                >
                  <SettingPage />
                  <button onClick={openSubModal}>
                    Open SubModal
                  </button>
                </Modal>

                <SubModal
                  isOpen={isSubModalOpen}
                  closeModal={closeSubModal}
                >
                  <h3>Sub Modal</h3>
                </SubModal>
              </div>
              {/* 父級 Modal */}

              <IoIosSettings className="text-2xl" />
            </div>
          </div>
        </header>
        {/* Grid Layout with Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Employee Profile Card */}
          <div className="col-span-1 row-span-1 md:row-span-2 md:col-span-3 xl:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex justify-between items-center mb-4 md:mb-5">
              <h2 className="text-base font-semibold dark:text-white">
                Employee Profile
              </h2>
              <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <i className="fas fa-ellipsis-vertical text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>

            <div className="flex flex-col md:flex-col items-center mb-4 md:mb-6">
              <div className="h-15 w-15 rounded-full bg-gray-200 overflow-hidden mb-2"></div>
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold dark:text-white mb-1">
                  Alex Chen
                </h3>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-3 md:mb-4">
                  Senior UX Designer
                </p>
              </div>
            </div>

            <div className="mb-4 md:mb-6 space-y-2">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <i className="fas fa-envelope w-6 mr-2"></i>
                <span className="text-sm md:text-base">
                  alex.chen@taskflow.io
                </span>
              </div>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <i className="fas fa-calendar-alt w-6 mr-2"></i>
                <span className="text-sm md:text-base">
                  Joined: Apr 15, 2023
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-3">
              {[
                { value: "3", label: "Active Projects" },
                { value: "32", label: "Completed" },
                { value: "98%", label: "On-time Delivery" },
                { value: "$8,450", label: "Monthly Salary" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="p-2 md:p-3 rounded-lg bg-gray-50 dark:bg-gray-700 text-center"
                >
                  <div className="text-base md:text-xl font-semibold text-amber-600 dark:text-amber-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    stroke={theme === "dark" ? "#374151" : "#f3f4f6"}
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
