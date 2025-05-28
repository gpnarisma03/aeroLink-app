import React from "react";

const reviewsData = [
  {
    id: 1,
    imgSrc: "/images/avatar1.png",
    alt: "Reviewer 1",
    name: "Yifei Chen",
    locationDate: "Seoul, South Korea | April 2019",
    stars: "★★★★★",
    text: `What a great experience using Flynow! I booked all of my flights for my gap year through Flynow and never had any issues. When I had to cancel a flight because of an emergency, Flynow support helped me `,
  },
  {
    id: 2,
    imgSrc: "/images/avatar2.png",
    alt: "Reviewer 2",
    name: "Kaori Yamaguchi",
    locationDate: "Honolulu, Hawaii | February 2017",
    stars: "★★★★★",
    text: `My family and I visit Hawaii every year, and we usually book our flights using other services. Flynow was recommened to us by a long time friend, and I’m so glad we tried it out! The process was easy and `,
  },
  {
    id: 3,
    imgSrc: "/images/avatar3.png",
    alt: "Reviewer 3",
    name: "Anthony Lewis",
    locationDate: "Berlin, Germany | April 2019",
    stars: "★★★★★",
    text: `When I was looking to book my flight to Berlin from LAX, Flynow had the best browsing experiece so I figured I’d give it a try. It was my first time using Flynow, but I’d definitely recommend it to a friend and use it for `,
  },
];

function Reviews() {
  return (
    <section id="reviews" className="mb-5">
      <div className="container">
        {/* Title */}
        <h5 className="review-title mb-4 text-center">
          What Our Travelers Say
        </h5>

        {/* Review Cards */}
        <div className="row g-4">
          {reviewsData.map(
            ({ id, imgSrc, alt, name, locationDate, stars, text }) => (
              <div key={id} className="col-md-4">
                <div className="review-card h-100 p-3">
                  <div className="d-flex align-items-center mb-2">
                    <img src={imgSrc} alt={alt} className="review-img me-3" />
                    <div>
                      <h6 className="mb-0">{name}</h6>
                      <small className="text-muted">{locationDate}</small>
                      <div className="stars mb-2">{stars}</div>
                    </div>
                  </div>
                  <p className="review-text">
                    {text}
                    <span className="read-more">read more...</span>
                  </p>
                </div>
              </div>
            )
          )}
        </div>

        {/* Show More */}
        <div className="text-center mt-4">
          <button className="show-more-reviews btn btn-link" type="button">
            Show More Reviews
          </button>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
