import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator from "./AuthStack";
import AppStackNavigator from "./AppStack";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
    >
        <Stack.Screen name="AuthStack" component={AuthStackNavigator} />
        <Stack.Screen name="AppStack" component={AppStackNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
