import React, { useEffect } from "react";
import HeroSlider from "../../componets/Home/HeroSlider";
import StatsSection from "../../componets/Home/StatsSection";
import SearchBox from "../../componets/Home/SearchBox";
import FeaturedEvents from "../../componets/Home/FeaturedEvents";
import OrganizerSpotlight from "../../componets/Home/OrganizerSpotlight";
import ReviewSection from "../../componets/Home/ReviewSection";
import FAQSection from "../../componets/Home/FAQSection";
import TrustedPartners from "../../componets/Home/TrustedPartners";
import Newsletter from "../../componets/Home/Newsletter";

const Home = () => {
  // Hide scrollbar on homepage
  useEffect(() => {
    document.documentElement.classList.add("hide-scrollbar");
    document.body.classList.add("hide-scrollbar");

    // Cleanup: Remove class when leaving homepage
    return () => {
      document.documentElement.classList.remove("hide-scrollbar");
      document.body.classList.remove("hide-scrollbar");
    };
  }, []);

  return (
    <div>
      <HeroSlider />
      <StatsSection />
      <FeaturedEvents />
      <OrganizerSpotlight />
      <ReviewSection />
      <FAQSection />
      <TrustedPartners />
      <Newsletter />
    </div>
  );
};

export default Home;
