// pages/index.js
import Navbar from "@/components/public/Navbar";
import TeamMembers from "@/components/public/home/TeamMembers";
import Hero from "@/components/public/home/Hero";
import Portfolio from "@/components/public/home/Protfolio";
import FooterButton from "@/components/public/home/FooterButton";

export default function Home() {
  const merchants = [
    {
      id: "1",
      business_name: "茶湯會",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "2",
      business_name: "50嵐",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "3",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "4",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "5",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
    {
      id: "6",
      business_name: "彼得帕可",
      location: "台中市西屯區351號",
      time: "10-22",
      phone: "04-2322-5863",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4">
        <TeamMembers />
        <Hero />
        <Portfolio merchants={merchants} />
      </main>
      <FooterButton />
    </div>
  );
}
