import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image
} from "react-native";
import axios from "axios";
import LogInStyle from "./LogInStyle";

const styles = StyleSheet.create(LogInStyle);

export default class LogIn extends React.Component {
  static propTypes = {
    mail: PropTypes.string,
    password: PropTypes.string,
    navigation: PropTypes.object
  };

  static navigationOptions = {
    title: null,
    headerStyle: {
      backgroundColor: "#FF4350",
      borderBottomWidth: 0
    }
  };

  state = {
    email: "arno@airbnb-api.com",
    password: "password01",
    data: null
  };

  checkUser = (email, password, cb) => {
    axios
      .post("https://airbnb-api.now.sh/api/user/log_in", {
        email,
        password
      })
      .then(function(response) {
        console.log(response.data);
        cb(response);
      })
      .catch(function(error) {
        console.log(error);
        alert("Log in incorrect");
      });
  };

  render() {
    console.log("LogInScreen is rendering");
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://www.southjerseygas.com/SJG/media/img/icon-house.png"
          }}
          style={styles.picture}
        />
        <Text style={styles.title}>Welcome</Text>

        <TextInput
          style={styles.input}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.checkUser(this.state.email, this.state.password, data => {
              this.props.navigation.navigate("Home");
              this.setState({ data });
            });
          }}
          data={this.state.data}
        >
          <Text style={styles.buttonText}> Login </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
