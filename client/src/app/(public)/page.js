// Home Page
import Navbar from "@/components/public/Navbar";
import TeamMembers from "@/components/public/home/TeamMembers";
import Hero from "@/components/public/home/Hero";
import Portfolio from "@/components/public/home/Protfolio";
import FooterButton from "@/components/public/home/FooterButton";

export default function Home() {
  const merchants = [
    {
      id: 1,
      business_name: "Golden Wok",
      description:
        "Authentic Chinese cuisine made fresh daily. Try our signature spicy Szechuan dishes.",
      location: "123 Main St, Taipei City",
      hours: "11:00 AM - 9:00 PM",
      feature: "Spicy",
      categories: [{ id: 1, name: "Chinese" }],
      updatedAt: "2025-04-20T12:30:00Z",
    },
    {
      id: 2,
      business_name: "Sunset Burger",
      description:
        "Classic American burgers with a modern twist. Vegan options available!",
      location: "456 Sunset Blvd, Taichung",
      hours: "10:00 AM - 10:00 PM",
      feature: "Burger",
      categories: [{ id: 2, name: "American" }],
      updatedAt: "2025-04-19T15:45:00Z",
    },
    {
      id: 3,
      business_name: "Matcha Garden",
      description:
        "Cozy Japanese-style café serving matcha desserts and seasonal drinks.",
      location: "789 Sakura Rd, Kyoto Lane",
      hours: "9:00 AM - 7:00 PM",
      feature: "Relaxing Atmosphere",
      categories: [{ id: 3, name: "Japanese" }],
      updatedAt: "2025-04-18T09:00:00Z",
    },
    {
      id: 4,
      business_name: "Golden Wok",
      description:
        "Authentic Chinese cuisine made fresh daily. Try our signature spicy Szechuan dishes.",
      location: "123 Main St, Taipei City",
      hours: "11:00 AM - 9:00 PM",
      feature: "Spicy",
      categories: [{ id: 1, name: "Chinese" }],
      updatedAt: "2025-04-20T12:30:00Z",
    },
    {
      id: 5,
      business_name: "Sunset Burger",
      description:
        "Classic American burgers with a modern twist. Vegan options available!",
      location: "456 Sunset Blvd, Taichung",
      hours: "10:00 AM - 10:00 PM",
      feature: "Burger",
      categories: [{ id: 2, name: "American" }],
      updatedAt: "2025-04-19T15:45:00Z",
    },
    {
      id: 6,
      business_name: "Matcha Garden",
      description:
        "Cozy Japanese-style café serving matcha desserts and seasonal drinks.",
      location: "789 Sakura Rd, Kyoto Lane",
      hours: "9:00 AM - 7:00 PM",
      feature: "Relaxing Atmosphere",
      categories: [{ id: 3, name: "Japanese" }],
      updatedAt: "2025-04-18T09:00:00Z",
    }
  ];


  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <TeamMembers />
        <Hero />
        <Portfolio merchants={merchants} />
      </main>
      <FooterButton />
    </div>
  );
}
