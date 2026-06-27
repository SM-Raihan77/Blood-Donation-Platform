import Image from "next/image";
import BloodDonationRequests from "./components/BloodDonationRequests";
import BloodSearchPage from "./components/BloodSearchPage";

export default function Home() {
  return (
  <div>
    <BloodDonationRequests />
 <BloodSearchPage/>
  </div>
  );
}
