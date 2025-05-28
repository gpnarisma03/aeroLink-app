import Banner from "../components/Banner";
import MainSection from "../components/MainSection";

function Home() {
  return (
    <>
      <Banner showFlightSearch={true} />
      <MainSection />
    </>
  );
}

export default Home;
