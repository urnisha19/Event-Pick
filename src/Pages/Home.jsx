import Categories from "../Components/Home/Categories";
import FeaturedEvents from "../Components/Home/FeaturedEvents";
import HeroSection from "../Components/Home/HeroSection";
import RecentReviews from "../Components/Home/RecentReviews";

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <FeaturedEvents/>
      <Categories/>
      <RecentReviews/>
    </div>
  );
};

export default Home;
