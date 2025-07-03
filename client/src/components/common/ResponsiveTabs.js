import { useState } from "react";

export default function ResponsiveTabs({ tabs, defaultValue, renderContent }) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);

  return (
    <div className="space-y-4">
      {/* Mobile dropdown */}
      <div className="sm:hidden">
        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm"
        >
          {tabs.map((tab) => (
            <option key={tab.value} value={tab.value}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop tabs */}
      <div className="hidden sm:block border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActive(tab.value)}
              className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium ${
                active === tab.value
                  ? "border-amber-500 text-amber-600"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div>{renderContent(active)}</div>
    </div>
  );
}
