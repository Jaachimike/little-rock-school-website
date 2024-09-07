import EnrollmentForm from "../components/EnrollmentForm";
import HeroSection from "../components/HeroSection";
import ImageCarousel from "../components/ImageCarousel";
import QualitiesSection from "../components/QualitiesSection";

const Homepage = () => {
  return (
    <>
      {/* <HeroSection /> */}
      <ImageCarousel />
      <EnrollmentForm />
      <QualitiesSection />
      <EnrollmentForm />
    </>
  );
};

export default Homepage;
