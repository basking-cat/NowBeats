import { createStackNavigator } from "@react-navigation/stack";
import FeedScreen from "../screens/FeedScreen";
import CalendarScreen from "../screens/CalendarScreen";

const MainStack = createStackNavigator();
export default function MainStackScreen() {
  return (
    <MainStack.Navigator initialRouteName="Feed">
      <MainStack.Screen name="Calendar" component={CalendarScreen} />
      <MainStack.Screen name="Feed" component={FeedScreen} />
    </MainStack.Navigator>
  );
}
