import React from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AppContainer from "./src/navigation/AppNavigator";

//Database import
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAfkJ6DqH6Sux0P2YuvccwSRVNp86DVKWw",
  authDomain: "swiftx-91aaa.firebaseapp.com",
  databaseURL: "https://swiftx-91aaa-default-rtdb.firebaseio.com",
  projectId: "swiftx-91aaa",
  storageBucket: "swiftx-91aaa.appspot.com",
  messagingSenderId: "372200903899",
  appId: "1:372200903899:web:238f81dfab1fef9cd168fe",
  measurementId: "G-H7QVQBT6GP",
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
        require("./assets/images/logo.png"),
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
