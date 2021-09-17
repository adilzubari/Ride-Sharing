import React, { useState } from "react";
import { StyleSheet, View, Text, Image, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
// styles
import { styles } from "./style.js";

const slides = [
  {
    key: 1,
    title: "Economical",
    text: "Economical Ride Sharing",
    image:
      "https://lh3.googleusercontent.com/proxy/rvuM2fOfNeIw9MN4049avFogOpkKC7ThIOM6zKqDCnwVRnJhs8dkIuagiNc0KfVIE15b7xHYK7xC3ZoznUBWj-D6zFU6SZc",
    // "https://cdn.pixabay.com/photo/2019/03/19/09/04/drawing-4065111_1280.png",
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    title: "Fuel Saviour",
    text: "Other cool stuff",
    image:
      "https://cdn.pixabay.com/photo/2019/03/19/09/04/car-4065110_960_720.png",
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image:
      "https://lh3.googleusercontent.com/proxy/rvuM2fOfNeIw9MN4049avFogOpkKC7ThIOM6zKqDCnwVRnJhs8dkIuagiNc0KfVIE15b7xHYK7xC3ZoznUBWj-D6zFU6SZc",
    backgroundColor: "#22bcb5",
  },
];

export default function IntroSlider({ setFirstTimeAppOpening }) {
  const [ShowRealApp, setShowRealApp] = useState(false);

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>
        <View>
          <Image
            style={{
              width: 250,
              height: 150,
            }}
            source={{ uri: item.image }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            marginTop: 20,
            textAlign: "center",
            color: "rgb(100,100,100)",
          }}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  const _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  };

  if (ShowRealApp) {
    return <App />;
  } else {
    return (
      <AppIntroSlider
        renderItem={_renderItem}
        data={slides}
        onDone={() => setFirstTimeAppOpening(false)}
      />
    );
  }
}

// export default class IntroSlider extends React.Component {
//   this.state = {
//     showRealApp: false
//   }
//   _renderItem = ({ item }) => {
//     return (
//       <View style={styles.slide}>
//         <Text style={styles.title}>{item.title}</Text>
//         <Image source={item.image} />
//         <Text style={styles.text}>{item.text}</Text>
//       </View>
//     );
//   }
//   _onDone = () => {
//     // User finished the introduction. Show real app through
//     // navigation or simply by controlling state
//     this.setState({ showRealApp: true });
//   }
//   render() {
//     if (this.state.showRealApp) {
//       return <App />;
//     } else {
//       return <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}/>;
//     }
//   }
// }
