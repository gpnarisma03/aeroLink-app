import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "../styles/Banner.css";

function FlightSearchForm() {
  const departRef = useRef(null);
  const returnRef = useRef(null);

  useEffect(() => {
    flatpickr(departRef.current, {
      dateFormat: "m/d/Y",
      allowInput: true,
    });

    flatpickr(returnRef.current, {
      dateFormat: "m/d/Y",
      allowInput: true,
    });
  }, []);

  return (
    <div className="flight-search bg-white text-dark p-4 rounded shadow">
      {/* First Row */}
      <div className="row align-items-center mb-3">
        <div className="col-md-6 d-flex align-items-center mb-2 mb-md-0">
          <div className="flight-icon-container me-2">
            <img
              className="flight-icon"
              src="/images/icons/flight-icon.png"
              alt="Flight Icon"
            />
          </div>
          <h5 className="m-0" style={{ color: "var(--primary-color)" }}>
            Flight
          </h5>
        </div>
        <div className="col-md-6 d-flex justify-content-start">
          <button
            className="btn btn-light d-flex align-items-center text-muted"
            type="button"
          >
            RoundTrip
            <img src="/images/icons/arrow-drop-down.png" alt="Dropdown" />
          </button>
        </div>
      </div>

      <form className="row g-3 align-items-center">
        {/* From and To */}
        <div className="col-12 col-md-5 d-flex justify-content-center align-items-center mb-3 mb-md-0 destination-container">
          <div className="from-container">
            <label htmlFor="from" className="form-label m-0">
              From
            </label>
            <select className="form-select destination-select" id="from">
              <option value="" disabled selected>
                Select origin
              </option>
              <option>New York</option>
              <option>London</option>
              <option>Manila</option>
            </select>
          </div>

          <div className="d-none d-md-flex align-items-center justify-content-center exchange-icon">
            <img
              src="/images/icons/exchange-icon.png"
              alt="Exchange"
              style={{ height: 20 }}
            />
          </div>

          <div className="to-container">
            <label htmlFor="to" className="form-label m-0">
              To
            </label>
            <select className="form-select destination-select" id="to">
              <option value="" disabled selected>
                Select destination
              </option>
              <option>Paris</option>
              <option>Tokyo</option>
              <option>Dubai</option>
            </select>
          </div>
        </div>

        {/* Depart and Return */}
        <div className="col-12 col-md-5 d-flex justify-content-center align-items-center mb-3 mb-md-0 departure-wrapper">
          <div className="col-6 px-2 departure-container">
            <label htmlFor="depart" className="form-label m-0">
              Depart
            </label>
            <div className="input-group">
              <span className="input-group-text no-style-group-text">
                <img
                  src="/images/icons/calendar.png"
                  alt="Calendar"
                  style={{ height: 20, width: 20 }}
                />
              </span>
              <input
                type="text"
                className="form-control departure-input"
                placeholder="Departing on"
                id="depart"
                ref={departRef}
              />
            </div>
          </div>

          <div className="col-6 px-2 departure-container">
            <label htmlFor="return" className="form-label m-0">
              Return
            </label>
            <div className="input-group">
              <span className="input-group-text no-style-group-text">
                <img
                  src="/images/icons/calendar.png"
                  alt="Calendar"
                  style={{ height: 20, width: 20 }}
                />
              </span>
              <input
                type="text"
                className="form-control departure-input border-start-0"
                placeholder="Returning on"
                id="return"
                ref={returnRef}
              />
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="col-12 col-md-2 d-flex justify-content-center align-items-center">
          <Link
            to="/flight_result"
            className="btn w-100 search-button"
            role="button"
          >
            Search Flights
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FlightSearchForm;
