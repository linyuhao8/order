import Image from "next/image";

const Hero = () => {
  return (
    <div className="text-center max-w-xl mx-auto mb-16 relative">
      <div className="flex nowrap justify-center gap-3 items-end mb-3">
        <h1 className="text-4xl font-bold text-amber-500">We building</h1>
        <Image
          src="https://images.unsplash.com/photo-1548504773-429e84f586d2?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={100}
          height={100}
          alt="img"
          className="rounded-xl object-cover h-15 w-25"
        />
      </div>
      <h2 className="text-3xl font-bold mb-6">With worldclass Quality.</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        At Ace, we don&apos;t just bring your ideas to life—we craft them into
        unforgettable masterpieces.
      </p>
      <div className="flex justify-center gap-4 mb-6">
        <button className="px-4 py-2 bg-amber-500 text-white rounded-full text-sm">
          $4-50K
        </button>
        <button className="px-6 py-2 border border-amber-500 text-amber-500 rounded-full text-sm">
          Get a project quote
        </button>
      </div>
      <p className="text-sm text-gray-600">
        We designed project raised • $3m funds
      </p>
    </div>
  );
};

export default Hero;
