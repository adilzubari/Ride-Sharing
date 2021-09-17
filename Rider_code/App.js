import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppContainer from "./src/navigation/AppNavigator";

//Database import
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyC7umT6SS3jdD1sFUXmHB1uGaBbSUi_0rM",
  authDomain: "swiftx-new.firebaseapp.com",
  databaseURL: "https://swiftx-new-default-rtdb.firebaseio.com",
  projectId: "swiftx-new",
  storageBucket: "swiftx-new.appspot.com",
  messagingSenderId: "232253387881",
  appId: "1:232253387881:web:a5a6bdaf6090685f971ef8",
  measurementId: "G-T0SPVCQEG3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  state = {
    assetsLoaded: false,
  };

  constructor() {
    super();
    console.disableYellowBox = true;
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/background.png"),
        require("./assets/images/icon-transparent5.png"),
      ]),
      Font.loadAsync({
        "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
        "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
        "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
      }),
    ]);
  };

  render() {
    return this.state.assetsLoaded ? (
      <AppContainer />
    ) : (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onFinish={() => this.setState({ assetsLoaded: true })}
        onError={console.warn}
        autoHideSplash={true}
      />
    );
  }
}
