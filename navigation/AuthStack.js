import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import CallbackScreen from "../screens/CallbackScreen";

const AuthStack = createStackNavigator();
export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Callback" component={CallbackScreen} />
    </AuthStack.Navigator>
  );
}
