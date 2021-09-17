import React, { useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Button, TextInput, Text as RNPText, Avatar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import validator from "validator";
import axios from "../../../axios";
// import bcrypt from "bcryptjs";
// const bcrypt = require("../../../node_modules/bcrypt");
// styles
import { styles } from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";

export default function index(props) {
  // const bcrypt = require("bcryptjs");

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [name_err, setname_err] = useState(false);
  const [email_err, setemail_err] = useState(false);
  const [mobile_err, setmobile_err] = useState(false);
  const [password_err, setpassword_err] = useState(false);
  const [cpassword_err, setcpassword_err] = useState(false);

  const [submit, setsubmit] = useState(false);

  const [state, dispatch] = useStateValue();

  const register = async () => {
    setsubmit(true);

    try {
      const data = await axios.post("/rider/register", {
        Name: name,
        Email: email,
        Mobile: mobile,
        Password: password,
      });
      // Password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),

      console.log(
        "Logged User Id =>",
        data.data._id,
        data.data,
        JSON.stringify(data.data)
      );
      // Store User id to keep him logged in
      await AsyncStorage.setItem("@User_type", "rider");
      await AsyncStorage.setItem("@User_id", data.data._id);
      await AsyncStorage.setItem("@User_profile", JSON.stringify(data.data));

      // Make user Logged In
      dispatch({ type: "SET_USER_PROFILE", UserProfile: data.data });
      dispatch({ type: "SET_USER_TYPE", UserType: "rider" });
      dispatch({ type: "TOGGLE_AUTH" });

      // console.log("Rider registered =>", data);
    } finally {
      setsubmit(false);
    }
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => props.navigation.pop()}
        >
          <Avatar.Icon
            size={36}
            icon={() => (
              <Ionicons name="chevron-back-outline" size={26} color="white" />
            )}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Rider Registration</Text>
        <Text style={styles.rightSpace}></Text>
      </View>

      <View style={styles.loginForm}>
        <TextInput
          label="Full Name"
          mode="outlined"
          placeholder=""
          error={name_err}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={name}
          onChangeText={(text) => {
            setname(text);
            setname_err(!validator.isAlpha(text));
          }}
        />

        <TextInput
          label="Email"
          mode="outlined"
          placeholder="mail@domain.com"
          error={email_err}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={email}
          onChangeText={(text) => setemail(text)}
        />

        <TextInput
          label="Mobile"
          mode="outlined"
          placeholder="+230 5 123 4567"
          error={mobile_err}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={mobile}
          onChangeText={(text) => setmobile(text)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          placeholder="***"
          error={password_err}
          secureTextEntry={true}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={password}
          onChangeText={(text) => setpassword(text)}
        />

        <TextInput
          label="Confirm Password"
          mode="outlined"
          placeholder="***"
          error={cpassword_err}
          secureTextEntry={true}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={cpassword}
          onChangeText={(text) => setcpassword(text)}
        />
      </View>

      <Button
        disabled={false}
        mode="contained"
        dark={true}
        style={styles.loginButton}
        onPress={() => register()}
        disabled={submit ? true : false}
      >
        Register
      </Button>

      <Text>{"\n\n\n\n"}</Text>
    </ScrollView>
  );
}
