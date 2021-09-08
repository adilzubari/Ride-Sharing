import { Paper } from "@material-ui/core";
import { PeopleAltOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import CurrencyFormat from "react-currency-format";

// Styles
import "../../../../assets/styles/css/Body/Dashboard/cards_styles.css";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function RealTimeGoogleMaps() {
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBNnwaIwBmoKmkGvsCk4F6xHlyqHybAi9M" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}

export default function Dashboard() {
  const [Cards, setCards] = useState([
    {
      icon: (
        <img
          src="https://swiftx-new.web.app/static/media/money1.1e54addd.jpg"
          alt="Alternate"
        />
      ),
      title: "Today",
      amount: 990,
    },
    {
      icon: (
        <img
          src="https://swiftx-new.web.app/static/media/money2.2e3870f3.jpg"
          alt="Alternate"
        />
      ),
      title: "This Month",
      amount: 9066,
    },
    {
      icon: (
        <img
          src="https://swiftx-new.web.app/static/media/money3.1d26e667.jpg"
          alt="Alternate"
        />
      ),
      title: "Total",
      amount: 1000862,
    },
  ]);
  return (
    <div>
      <div className="Dashboard_Cards_Container">
        {Cards.map((Item) => (
          <div className="Dashboard_Card">
            <div>{Item.icon}</div>
            <div className="Dashboard_Card_Content_Container">
              <h3 className="Dashboard_Card_Main">{Item.title}</h3>
              <h3 className="Dashboard_Card_Sub">
                <CurrencyFormat
                  value={Item.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs. "}
                />
              </h3>
            </div>
          </div>
        ))}
      </div>

      <h1>RealTime</h1>

      <RealTimeGoogleMaps />
    </div>
  );
}
