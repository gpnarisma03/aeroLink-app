import Destinations from "./Destinations";
import Blogs from "./Blogs";
import Reviews from "./Reviews";
function MainSection() {
  return (
    <main className="main-section" id="main-section">
      <Destinations />
      <Blogs />
      <Reviews />
    </main>
  );
}

export default MainSection;
