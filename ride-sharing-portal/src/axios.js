import axios from "axios";

const instance = axios.create({
  baseURL: "https://ride-sharing-vandanasjn.herokuapp.com",
});

// const instance = axios.create({
//   baseURL: "http://192.168.1.7:3000",
// });

export default instance;
