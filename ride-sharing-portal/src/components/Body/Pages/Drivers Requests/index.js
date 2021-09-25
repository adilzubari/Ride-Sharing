import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// Style
import "../../../../assets/styles/css/Body/Users/style.css";
import { Button, Paper } from "@material-ui/core";
import axios from "../../../../axios";

const columns = [
  {
    field: "actions",
    headerName: "Actions",
    width: 250,
    editable: true,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      return (
        <span>
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(0,150,0)",
              color: "white",
            }}
            onClick={async () => {
              const res = await axios.post("/driver/request/approve", {
                id: params.formattedValue,
              });
              console.log(res.data);
              window.location.reload();
              // location.reload();
            }}
          >
            {" "}
            Approve{" "}
          </Button>
          &nbsp; &nbsp; &nbsp;
          <Button
            variant="contained"
            style={{
              backgroundColor: "rgb(200,0,0)",
              color: "white",
            }}
            onClick={async () => {
              const res = await axios.post("/driver/request/reject", {
                id: params.formattedValue,
              });
              console.log(res.data);
              window.location.reload();
              // location.reload();
            }}
          >
            {" "}
            Reject{" "}
          </Button>
        </span>
      );
    },
  },
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "Documents",
    headerName: "Documents",
    width: 500,
    editable: true,
    disableClickEventBubbling: true,
    renderCell: (params) => {
      const OpenImg = (img) => {
        console.log("data:image;base64," + img.substr(50));

        var image = new Image();
        image.src = "data:image/jpg;base64," + img;

        var w = window.open("");
        w.document.write(image.outerHTML);
      };

      return (
        <span>
          {params.formattedValue.CarDocuments !== "" && (
            <span>
              <Button
                onClick={() => OpenImg(params.formattedValue.CarDocuments)}
                variant="outlined"
              >
                Car Document
              </Button>
              &nbsp; &nbsp;
            </span>
          )}
          {params.formattedValue.DrivingLicense !== "" && (
            <span>
              <Button
                onClick={() => OpenImg(params.formattedValue.DrivingLicense)}
                variant="outlined"
              >
                Driving License
              </Button>
              &nbsp; &nbsp;
            </span>
          )}
          {params.formattedValue.IdentityCard !== "" && (
            <span>
              <Button
                onClick={() => OpenImg(params.formattedValue.IdentityCard)}
                variant="outlined"
              >
                Identity Card
              </Button>
              &nbsp; &nbsp;
            </span>
          )}
        </span>
      );
    },
  },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
    editable: true,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 250,
    editable: true,
  },
  {
    field: "Mobile",
    headerName: "Mobile",
    width: 150,
    editable: true,
  },
  {
    field: "Vehiclemodel",
    headerName: "Vehicle Model",
    width: 170,
    editable: true,
  },
  {
    field: "Vehiclenumber",
    headerName: "Vehicle Number",
    width: 180,
    editable: true,
  },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue(params.id, "firstName") || ""} ${
  //       params.getValue(params.id, "lastName") || ""
  //     }`,
  // },
];

const test = {
  id: 1,
  firstName: "test",
  lastName: "test",
  email: "test",
  mobile: "test",
  profileImage: "test",
  vehicleModel: "test",
  vehicleNumber: "test",
  activeStatus: "test",
  walletBalance: "test",
};

const rows = [
  {
    id: 0,
    firstName: "Muhammad",
    lastName: "Adil",
    email: "adilzubari852@gmail.com",
    mobile: "+923476456792",
    profileImage: "img://khaskjdhahoidaSDAfasfASFAsdASD324EWFASF",
    vehicleModel: "Toyota",
    vehicleNumber: "RIA-0765",
    activeStatus: false,
    walletBalance: 1087,
  },
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DriversRequests() {
  const [DriversRequests, setDriversRequests] = useState([]);

  useEffect(() => {
    (async () => {
      console.log("Requesting Pending Drivers information");
      // const r = await axios.get("/rider");
      const r = await axios.get("/driver/requests");
      console.log("Recieved Pending Drivers Information", r.data);
      // setUsers(r.data);
      let a = [];

      for (let index = 0; index < r.data.length; index++) {
        const s = r.data[index];
        a.push({
          actions: s._id,
          id: s._id,
          Name: s.Name,
          Email: s.Email,
          Mobile: s.Mobile,
          Vehiclemodel: s.Vehiclemodel,
          Vehiclenumber: s.Vehiclenumber,
          Password: s.Password,
          Documents: {
            IdentityCard: s.IdentityCard,
            CarDocuments: s.CarDocuments,
            DrivingLicense: s.DrivingLicense,
          },
        });
      }

      console.log("Processed Data ", a);
      setDriversRequests(a);
      // setUsers(a);
      // return;
    })();
  }, []);

  return (
    <Paper elevation={2}>
      <div className="Chart-Container">
        <DataGrid
          rows={DriversRequests}
          columns={columns}
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
}
