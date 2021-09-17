import axios from "../../axios";
import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Touchable,
  Image,
  ScrollView,
} from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Button, TextInput, Text as RNPText } from "react-native-paper";
import { colors } from "../../assets/styles/colors";
import { useStateValue } from "../../StateProvider";
// import { Button } from "react-native-paper";
// styles
import { styles } from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Logo from "https://vandanasjn-ride-sharing.web.app/static/media/logo.4258f8ac.png";

export default function index(props) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Submit, setSubmit] = useState(false);

  const [UserType, setUserType] = useState("rider");
  const [state, dispatch] = useStateValue();

  const LogIn = async () => {
    setSubmit(true);
    try {
      const data = await axios.post("/" + UserType + "/authorization", {
        Email: Email,
        Password: Password,
      });

      // console.log(UserType, data.data[0]._id, data.data);
      // return;

      // Store User id to keep him logged in
      await AsyncStorage.setItem("@User_type", UserType);
      await AsyncStorage.setItem("@User_id", data.data[0]._id);
      await AsyncStorage.setItem("@User_profile", JSON.stringify(data.data[0]));

      // Make user Logged In
      dispatch({ type: "SET_USER_PROFILE", UserProfile: data.data[0] });
      dispatch({ type: "SET_USER_TYPE", UserType: UserType });
      dispatch({ type: "TOGGLE_AUTH" });
    } finally {
      setSubmit(false);
    }
  };

  return (
    <ScrollView style={styles.body}>
      <View style={styles.ButtonsGroup}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setUserType("rider")}
        >
          <Text
            style={[
              styles.GroupButton,
              styles.GroupButtonLeft,
              UserType == "rider" ? styles.GroupButtonActive : "",
            ]}
          >
            Rider
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setUserType("driver")}
        >
          <Text
            style={[
              styles.GroupButton,
              styles.GroupButtonRight,
              UserType == "driver" ? styles.GroupButtonActive : "",
            ]}
          >
            Driver
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: "https://vandanasjn-ride-sharing.web.app/static/media/logo.4258f8ac.png",
        }}
        style={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginVertical: 20,
        }}
      />

      <View style={styles.loginForm}>
        <TextInput
          label="Email"
          mode="outlined"
          placeholder="mail@domain.com"
          dense={true}
          style={styles.loginInput}
          disabled={Submit}
          value={Email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          label="Password"
          mode="outlined"
          placeholder="***"
          secureTextEntry={true}
          dense={true}
          style={styles.loginInput}
          disabled={Submit}
          value={Password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button
        disabled={false}
        mode="contained"
        dark={true}
        style={styles.loginButton}
        disabled={Submit}
        onPress={() => LogIn()}
      >
        Login
      </Button>

      <RNPText style={styles.registerText}>
        <TouchableWithoutFeedback>
          <RNPText>Don't have an account?</RNPText>
        </TouchableWithoutFeedback>

        <Text> </Text>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            props.navigation.navigate(
              UserType == "rider" ? "RiderRegistration" : "DriverRegistration"
            )
          }
        >
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </RNPText>

      {/* <Text style={styles.loginDivider}>--OR--</Text> */}
    </ScrollView>
  );
}
