import FlightSearchForm from "./FlightSearchForm";
import "../styles/Banner.css";

function Banner({ sectionId = "banner", showFlightSearch = false }) {
  return (
    <section id={sectionId}>
      {/* Social Media Icons */}
      <div className="social-icons">
        <button className="btn p-0 m-1" aria-label="Facebook">
          <i className="fab fa-facebook-f" />
        </button>
        <button className="btn p-0 m-1" aria-label="Instagram">
          <i className="fab fa-instagram" />
        </button>
        <button className="btn p-0 m-1" aria-label="Twitter">
          <i className="fab fa-twitter" />
        </button>
      </div>

      {/* Banner Content */}
      <div id="banner-content">
        <h1>Explore the World with Us</h1>
        <p className="lead">Find and book your next flight easily</p>
      </div>

      {/* Conditionally render FlightSearchForm */}
      {showFlightSearch && <FlightSearchForm />}
    </section>
  );
}

export default Banner;
