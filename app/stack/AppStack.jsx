import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksList from "../screens/tasks/TasksList";
import HomeScreen from "../screens/home/HomeScreen";
import TasksListSuccess from "../screens/tasks/TaskListSuccess";
import WorkCalendar from "../screens/tasks/TimeKeeping";
import TaskListAgain from "../screens/tasks/TaskListAgain";

const AppStack = createNativeStackNavigator();

const AppStackNavigator = () => {
  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <AppStack.Screen name="HomeScreen" component={HomeScreen} />
      <AppStack.Screen name="TasksList" component={TasksList} />
      <AppStack.Screen name="TaskListSuccess" component={TasksListSuccess} />
      <AppStack.Screen name="TaskListAgain" component={TaskListAgain} />
      <AppStack.Screen name="WorkCalendar" component={WorkCalendar} />
    </AppStack.Navigator>
  );
};

export default AppStackNavigator;
