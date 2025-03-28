import PortfolioCard from "./PortfolioCard";

const Portfolio = ({ merchants }) => {
  return (
    <div className="mb-8">
      <p className="text-center text-sm text-gray-500 mb-6">We crafted these masterpieces</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {merchants.map((merchant) => (
          <PortfolioCard key={merchant.id} merchant={merchant} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
