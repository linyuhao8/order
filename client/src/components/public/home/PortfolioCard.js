"use client";
import { Clock, MapPin, Tag } from "lucide-react";

const PortfolioCard = ({ merchant }) => {
  // Extract features as an array
  const features = merchant.feature ? merchant.feature.split(", ") : [];

  return (
    <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 hover:shadow-sm transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="p-6 ">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {merchant.business_name}
            </h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
              {merchant.categories &&
                merchant.categories.map((category) => (
                  <span
                    key={category.id}
                    className="border border-gray-300 text-sm bg-white dark:bg-gray-700 rounded-full px-3 py-1"
                  >
                    {category.name}
                  </span>
                ))}
            </div>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-2">
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
              215.3km
            </span>
          </div>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {merchant.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <MapPin size={16} className="mr-2 text-gray-400" />
            <span>{merchant.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Clock size={16} className="mr-2 text-gray-400" />
            <span>{merchant.hours}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {features.map((feature, index) => (
              <span
                key={index}
                className="inline-flex items-center text-xs px-2 py-1 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <Tag size={12} className="mr-1" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
