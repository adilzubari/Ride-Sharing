import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// Style
import "../../../../assets/styles/css/Body/Users/style.css";
import { Paper } from "@material-ui/core";

const columns = [
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    editable: true,
  },
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 150,
    editable: true,
  },
  {
    field: "profileImage",
    headerName: "Profile Image",
    width: 170,
    editable: true,
  },
  {
    field: "vehicleModel",
    headerName: "Vehicle Model",
    width: 170,
    editable: true,
  },
  {
    field: "vehicleNumber",
    headerName: "Vehicle Number",
    width: 180,
    editable: true,
  },
  {
    field: "activeStatus",
    headerName: "Active Status",
    width: 160,
    editable: true,
  },
  {
    field: "walletBalance",
    headerName: "Wallet Balance",
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

export default function Drivers() {
  return (
    <Paper elevation={2}>
      <div className="Chart-Container">
        <DataGrid
          rows={rows}
          columns={columns}
          // pageSize={5}
          // rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </Paper>
  );
}
