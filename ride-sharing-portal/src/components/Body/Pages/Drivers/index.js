import axios from "../../../../axios";
import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
// Style
import "../../../../assets/styles/css/Body/Users/style.css";
import { Paper } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "ID", width: 300 },
  {
    field: "Name",
    headerName: "Name",
    width: 200,
    // editable: true,
  },
  {
    field: "Email",
    headerName: "Email",
    width: 250,
    // editable: true,
  },
  {
    field: "Mobile",
    headerName: "Mobile",
    width: 200,
    // editable: true,
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

// Email: "adilzubari852@gmail.com"
// Mobile: "+9234764566792"
// Name: "Muhammad Adil"
// _id: "613fb28758c39e548e42a376"

export default function DataGridDemo() {
  const [Users, setUsers] = useState([
    // {
    //   id: 0,
    //   FullName: "Muhammad Adil",
    //   email: "adilzubari852@gmail.com",
    //   mobile: "+923476456792",
    //   profileImage: "img://khaskjdhahoidaSDAfasfASFAsdASD324EWFASF",
    //   vehicleModel: "Toyota",
    //   vehicleNumber: "RIA-0765",
    //   activeStatus: false,
    //   walletBalance: 1087,
    // },
    // { id: 1, FullName: "Snow", firstName: "Jon", age: 35 },
    // { id: 2, FullName: "Lannister", firstName: "Cersei", age: 42 },
    // { id: 3, FullName: "Lannister", firstName: "Jaime", age: 45 },
    // { id: 4, FullName: "Stark", firstName: "Arya", age: 16 },
    // { id: 5, FullName: "Targaryen", firstName: "Daenerys", age: null },
    // { id: 6, FullName: "Melisandre", firstName: null, age: 150 },
    // { id: 7, FullName: "Clifford", firstName: "Ferrara", age: 44 },
    // { id: 8, FullName: "Frances", firstName: "Rossini", age: 36 },
    // { id: 9, FullName: "Roxie", firstName: "Harvey", age: 65 },
  ]);
  useEffect(() => {
    (async () => {
      console.log("Requesting Drivers information");
      // const r = await axios.get("/rider");
      const r = await axios.get("/driver");
      console.log("Recieved Drivers Information", r.data);
      // setUsers(r.data);
      let a = [];

      for (let index = 0; index < r.data.length; index++) {
        const s = r.data[index];
        a.push({
          id: s._id,
          Name: s.Name,
          Email: s.Email,
          Mobile: s.Mobile,
        });
      }

      console.log("Processed Data ", a);
      setUsers(a);
      // return;
    })();
  }, []);
  return (
    <Paper elevation={2}>
      <div className="Chart-Container">
        <DataGrid
          rows={Users}
          columns={columns}
          key={Users._id}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
}
