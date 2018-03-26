import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  StyleSheet
} from "react-native";
import axios from "axios";
import RoomStyle from "./RoomStyle";

const styles = StyleSheet.create(RoomStyle);

export default class Room extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Room",
    headerStyle: {
      backgroundColor: "#FF4350"
    },
    headerTintColor: "white"
  });
  state = {
    roomInfos: {}
  };
  componentDidMount = () => {
    axios
      .get(
        "https://airbnb-api.now.sh/api/room/" +
          this.props.navigation.state.params.id
      )
      .then(response => {
        console.log("reponse", response.data);
        this.setState({ roomInfos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    console.log("youssef", this.state.roomInfos);
    return [
      <View style={{ flex: 1, width: "100%" }}>
        <FlatList
          horizontal={true}
          data={this.state.roomInfos.photos}
          renderItem={({ item }) => (
            <Image
              source={{
                uri: item
              }}
              style={styles.photos}
            />
          )}
        />,
        <Text
          style={{
            position: "absolute",
            marginTop: 200,
            color: "white",
            fontSize: 30,
            backgroundColor: "black",
            height: 60,
            width: 90,
            textAlign: "center",
            opacity: 0.8,
            paddingTop: 10
          }}
        >
          {this.state.roomInfos.price} €
        </Text>
      </View>,
      <ScrollView style={{ flex: 1, width: "90%", margin: 20 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between"
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 18 }}>{this.state.roomInfos.title}</Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 15,
                color: "grey"
              }}
            >
              {this.state.roomInfos.ratingValue} reviews
            </Text>
          </View>
          <Image
            source={{
              uri: this.props.navigation.state.params.userPic
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={{ paddingTop: 20, fontSize: 18, textAlign: "justify" }}>
          {this.state.roomInfos.description}
        </Text>
      </ScrollView>
    ];
  }
}
