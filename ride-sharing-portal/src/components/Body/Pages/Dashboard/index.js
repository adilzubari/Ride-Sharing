import { Paper } from "@material-ui/core";
import axios from "../../../../axios";
import { PeopleAltOutlined } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
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
          src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
          alt="Alternate"
          width={100}
          height={100}
          style={{
            margin: 30,
          }}
        />
      ),
      title: "Riders",
      amount: 0,
    },
    {
      icon: (
        <img
          src="https://freepngimg.com/thumb/taxi_driver/33090-6-taxi-driver-clipart.png"
          alt="Alternate"
          width={150}
          height={100}
          style={{
            margin: 30,
          }}
        />
      ),
      title: "Drivers",
      amount: 0,
    },
    {
      icon: (
        <img
          src="https://vwofstreetsboro.files.wordpress.com/2015/02/new-girl-driver-cartoon.jpg"
          alt="Alternate"
          width={140}
          height={120}
          style={{
            margin: 20,
          }}
        />
      ),
      title: "Pending Drivers",
      amount: 0,
    },
  ]);

  useEffect(() => {
    (async () => {
      console.log("Requesting Dashboard's data");
      const r = await axios.get("/dashboard");
      console.log("Recieved Dashboard data", r.data);
      setCards([
        {
          icon: (
            <img
              src="https://cdn-icons-png.flaticon.com/128/1177/1177568.png"
              alt="Alternate"
              width={100}
              height={100}
              style={{
                margin: 30,
              }}
            />
          ),
          title: "Riders",
          amount: r.data.rider_count,
        },
        {
          icon: (
            <img
              src="https://freepngimg.com/thumb/taxi_driver/33090-6-taxi-driver-clipart.png"
              alt="Alternate"
              width={150}
              height={100}
              style={{
                margin: 30,
              }}
            />
          ),
          title: "Drivers",
          amount: r.data.driver_count,
        },
        {
          icon: (
            <img
              src="https://vwofstreetsboro.files.wordpress.com/2015/02/new-girl-driver-cartoon.jpg"
              alt="Alternate"
              width={140}
              height={120}
              style={{
                margin: 20,
              }}
            />
          ),
          title: "Pending Drivers",
          amount: r.data.driver_request_count,
        },
      ]);
    })();
  }, []);

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
