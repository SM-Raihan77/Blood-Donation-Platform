import Image from "next/image";
import BloodDonationRequests from "./components/BloodDonationRequests";
import BloodSearchPage from "./components/BloodSearchPage";
import Banner from "./components/Banner";
import StatsBar from "./components/StatsBar";
import ExtraBannerSection from "./components/ExtraBannerSection";
export default function Home() {
  return (
  <div>
    <Banner />
    <StatsBar />
    <BloodDonationRequests />
    <ExtraBannerSection />
  </div>
  );
}
