function Destinations() {
  return (
    <section id="destinations" className="mb-5">
      <h2 className="mb-4">Popular Destinations</h2>
      <h4 className="mb-3">Domestic</h4>

      <div className="destinations-container">
        <div className="destination-card">
          <img src="/images/boracay-image.png" alt="Destination 1" />
          <div className="destination-name">Boracay</div>
        </div>
        <div className="destination-card">
          <img src="/images/palawan-image.png" alt="Destination 2" />
          <div className="destination-name">Palawan</div>
        </div>
        <div className="destination-card">
          <img src="/images/siargao-image.png" alt="Destination 3" />
          <div className="destination-name">Siargao</div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <button>See more</button>
      </div>

      <h4 className="mb-3 m-5">International</h4>

      <div className="destinations-container">
        <div className="destination-card">
          <img src="/images/Japan_img.png" alt="Destination 1" />
          <div className="destination-name">Japan</div>
        </div>
        <div className="destination-card">
          <img src="/images/Disneyland_img.png" alt="Destination 2" />
          <div className="destination-name">Disneyland</div>
        </div>
        <div className="destination-card">
          <img src="/images/Thai_img.png" alt="Destination 3" />
          <div className="destination-name">Thailand</div>
        </div>
      </div>
      <div className="mt-5 d-flex justify-content-center align-items-center">
        <button>See more</button>
      </div>
    </section>
  );
}

export default Destinations;
