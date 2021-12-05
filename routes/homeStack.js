import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../screens/Home";
import TaskDetails from "../screens/TaskDetails";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  TaskDetails: {
    screen: TaskDetails,
    navigationOptions: {
      headerShown: false,
    },
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
