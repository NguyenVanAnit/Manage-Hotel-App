import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksList from "../screens/tasks/TasksList";

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
        <AppStack.Screen name="TasksList" component={TasksList} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
