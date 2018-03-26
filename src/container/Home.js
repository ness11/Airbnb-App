import React from "react";
import {
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View
} from "react-native";
import axios from "axios";
import HomeStyle from "./HomeStyle";

const styles = StyleSheet.create(HomeStyle);

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Mon Airbnb",
    headerStyle: {
      backgroundColor: "#FF4350"
    },
    headerTintColor: "white"
  };
  state = { flatData: null };
  componentDidMount = () => {
    axios
      .get("https://airbnb-api.now.sh/api/room?city=paris")
      .then(response => {
        console.log("flat", response.data);
        this.setState({ flatData: response.data.rooms });
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    // const { navigate } = this.props.navigation;
    console.log("flatdata", this.state.flatData);

    return (
      <FlatList
        data={this.state.flatData}
        renderItem={({ item }) => [
          <TouchableOpacity
            style={styles.container}
            onPress={() =>
              this.props.navigation.navigate("Room", {
                id: item._id,
                userPic: item.user.account.photos[0]
              })
            }
          >
            <View>
              <Image source={{ uri: item.photos[0] }} style={styles.image} />,
              <View style={{ position: "absolute", flex: 1 }}>
                <Text style={styles.price}>{item.price} €</Text>
              </View>
            </View>,
            <View style={{ width: "100%" }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginTop: 20,
                  justifyContent: "space-between"
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={styles.title}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.review}>{item.ratingValue} reviews</Text>
                </View>
                <Image
                  source={{ uri: item.user.account.photos[0] }}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.break} />
            </View>
          </TouchableOpacity>
        ]}
      />
    );
  }
}
