import React from "react";
import { Link } from "react-router-dom";

const blogsData = [
  {
    id: 1,
    imgSrc: "/images/blog1-img.png",
    alt: "Blog 1",
    title: "Stay among the atolls in ",
    highlight: "Maldives",
    description:
      "From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages.",
  },
  {
    id: 2,
    imgSrc: "/images/blog2-img.png",
    alt: "Blog 2",
    title: "Experience the Ourika Valley in ",
    highlight: "Morocco",
    description:
      "Morocco’s Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East.",
  },
  {
    id: 3,
    imgSrc: "/images/blog3-img.png",
    alt: "Blog 3",
    title: "Live traditionally in ",
    highlight: "Mongolia",
    description:
      "Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel.",
  },
];

function Blogs() {
  return (
    <section id="blogs" className="mb-5">
      <div className="container">
        {/* Row 1 */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h5 className="mb-2 header">
            Explore unique <span>places to stay</span>
          </h5>
          <Link to="/blogs" className="view-all ms-auto">
            All <span>&rarr;</span>
          </Link>
        </div>

        {/* Row 2: Blog Cards */}
        <div className="blog-cards d-flex gap-4 flex-wrap">
          {blogsData.map(
            ({ id, imgSrc, alt, title, highlight, description }) => (
              <div key={id} className="blog-card" style={{ flex: "1 1 300px" }}>
                <img src={imgSrc} alt={alt} className="img-fluid" />
                <div className="blog-content mt-3">
                  <h5>
                    {title}
                    <span>{highlight}</span>
                  </h5>
                  <p>{description}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default Blogs;
