import { StackNavigator } from "react-navigation";
import LogIn from "../Airbnb/src/container/LogIn";
import Home from "../Airbnb/src/container/Home";
import Room from "../Airbnb/src/container/Room";

const App = StackNavigator({
  LogIn: { screen: LogIn },
  Home: { screen: Home },
  Room: { screen: Room }
});

export default App;
