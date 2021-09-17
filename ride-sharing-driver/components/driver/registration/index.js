import React, { useState, useEffect, useMemo } from "react";
import { Text, View, ScrollView, Platform } from "react-native";
import { Button, TextInput, Text as RNPText, Avatar } from "react-native-paper";
import validator from "validator";
import axios from "../../../axios";
import * as ExpoImagePicker from "expo-image-picker";
// styles
import { styles } from "./style";
// Icons
import { Entypo, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { colors } from "../../../assets/styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StateProvider, useStateValue } from "../../../StateProvider";
import reducer, { initialState } from "../../../reducer";

export default function index(props) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [vehiclemodel, setvehiclemodel] = useState("");
  const [vehiclenumber, setvehiclenumber] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const [name_err, setname_err] = useState(false);
  const [email_err, setemail_err] = useState(false);
  const [mobile_err, setmobile_err] = useState(false);
  const [vehiclemodel_err, setvehiclemodel_err] = useState(false);
  const [vehiclenumber_err, setvehiclenumber_err] = useState(false);
  const [password_err, setpassword_err] = useState(false);
  const [cpassword_err, setcpassword_err] = useState(false);

  const [IdentityCard, setIdentityCard] = useState(null);
  const [CarDocuments, setCarDocuments] = useState(null);
  const [DrivingLicense, setDrivingLicense] = useState(null);

  const [submit, setsubmit] = useState(false);

  const [state, dispatch] = useStateValue();

  const register = async () => {
    // console.log(IdentityCard);
    // return;
    setsubmit(true);

    try {
      const data = await axios.post("/driver/register", {
        Name: name,
        Email: email,
        Mobile: mobile,
        Vehiclemodel: vehiclemodel,
        Vehiclenumber: vehiclemodel,
        Password: password,
        IdentityCard: "",
        CarDocuments: "",
        DrivingLicense: "",
        // IdentityCard: IdentityCard != null ? IdentityCard : "",
        // CarDocuments: CarDocuments != null ? CarDocuments : "",
        // DrivingLicense: DrivingLicense != null ? DrivingLicense : "",
      });
      // Password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),

      console.log("Logged User Id =>", data.data._id);
      // Store User id to keep him logged in
      await AsyncStorage.setItem("@User_type", "driver");
      await AsyncStorage.setItem("@User_id", data.data._id);
      await AsyncStorage.setItem("@User_profile", JSON.stringify(data.data));

      // Make user Logged In
      dispatch({ type: "SET_USER_TYPE", UserType: "driver" });
      dispatch({ type: "TOGGLE_AUTH" });
      dispatch({ type: "SET_USER_PROFILE", UserProfile: data.data });

      // console.log("Rider registered =>", data);
    } finally {
      setsubmit(false);
    }
  };

  const CheckMediaPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ExpoImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return false;
        // props.navigation.pop();
      }
      return true;
    }
  };

  const pickIdentityCard = async () => {
    if (await !CheckMediaPermission) return;

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) setIdentityCard(result);
  };

  const pickCarDocument = async () => {
    if (await !CheckMediaPermission) return;

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) setCarDocuments(result);
  };

  const pickDrivingLicense = async () => {
    if (await !CheckMediaPermission) return;

    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
      // base64: true,
    });

    if (!result.cancelled) setDrivingLicense(result);
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
        <Text style={styles.title}>Driver Registration</Text>
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

        <TextInput
          label="Vehicle Model"
          mode="outlined"
          placeholder="Toyota Crown [2000]"
          error={vehiclemodel_err}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={vehiclemodel}
          onChangeText={(text) => setvehiclemodel(text)}
        />

        <TextInput
          label="Vehicle Number"
          mode="outlined"
          placeholder="RIA-0837"
          error={vehiclenumber_err}
          // secureTextEntry={true}
          disabled={submit ? true : false}
          dense={true}
          style={styles.loginInput}
          value={vehiclenumber}
          onChangeText={(text) => setvehiclenumber(text)}
        />

        <Text
          style={{
            color: "rgb(150,150,150)",
            width: "90%",
            alignSelf: "center",
            fontSize: 10,
          }}
        >
          Please upload these documents
          {"\n"}
          <Entypo name="check" size={10} color="rgb(150,150,150)" />
          Identity Card
          {"\n"}
          <Entypo name="check" size={10} color="rgb(150,150,150)" />
          Car Ownership Documents
          {"\n"}
          <Entypo name="check" size={10} color="rgb(150,150,150)" />
          Driving License
        </Text>

        <Button
          mode="outlined"
          style={{
            width: "90%",
            margin: "5%",
          }}
          onPress={() => pickIdentityCard()}
        >
          {IdentityCard == null ? "Upload" : "Change"} Identity Card{" "}
          {IdentityCard == null ? (
            ""
          ) : (
            <Ionicons
              name="checkmark-done"
              size={18}
              color={colors.primary.lighter}
            />
          )}
        </Button>

        <Button
          mode="outlined"
          style={{
            width: "90%",
            margin: "5%",
          }}
          onPress={() => pickCarDocument()}
        >
          {CarDocuments == null ? "Upload" : "Change"} Car Document{" "}
          {CarDocuments == null ? (
            ""
          ) : (
            <Ionicons
              name="checkmark-done"
              size={18}
              color={colors.primary.lighter}
            />
          )}
        </Button>

        <Button
          mode="outlined"
          style={{
            width: "90%",
            margin: "5%",
          }}
          onPress={() => pickDrivingLicense()}
        >
          {DrivingLicense == null ? "Upload" : "Change"} Driving License{" "}
          {DrivingLicense == null ? (
            ""
          ) : (
            <Ionicons
              name="checkmark-done"
              size={18}
              color={colors.primary.lighter}
            />
          )}
        </Button>

        <Text
          style={{
            color: "rgb(150,150,150)",
            width: "90%",
            alignSelf: "center",
            fontSize: 10,
          }}
        >
          Please note that you'll not be able to use the application untill your
          documents are verified, so we advice to upload the legal documents
        </Text>
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
