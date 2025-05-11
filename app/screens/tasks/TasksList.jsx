import { View, Text } from "react-native";

const TasksList = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          marginVertical: 20,
        }}
      >
        Tasks List
      </Text>
    </View>
  );
};

export default TasksList;
