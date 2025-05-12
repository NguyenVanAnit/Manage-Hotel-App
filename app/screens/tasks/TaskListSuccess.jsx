import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../store/AuthStore";
import { useEffect, useState } from "react";
import { getTasksByStaff, putChangeStatusTask } from "../../api/task";
import Ionicons from "react-native-vector-icons/Ionicons";

const TasksListSuccess = () => {
  const { userInfo } = useAuth();
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const res = await getTasksByStaff(userInfo?.staffId);
    if (res?.success) {
      const filteredTasks = res.data.data.filter((task) => task.status === 1);
      setTasks(filteredTasks);
    } else {
      console.log("Error: ", res?.message);
    }
  };

  const handleCheck = async (taskId) => {
    const res = await putChangeStatusTask(taskId, 0);
    console.log("dadada");
    if (res?.success) {
      // Xoá task đó khỏi danh sách vì chỉ hiển thị task status = 0
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert("Xác nhận làm lại công việc");
    } else {
      console.log("Cập nhật thất bại");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateArray) => {
    if (!dateArray || dateArray.length !== 3) return "";
    const [year, month, day] = dateArray;
    const dd = day.toString().padStart(2, "0");
    const mm = month.toString().padStart(2, "0");
    return `${dd}/${mm}/${year}`;
  };

  const renderItem = ({ item, index }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#ddd",
    }}
  >
    <Text style={{ width: 24, fontWeight: "bold", fontSize: 16 }}>{index + 1}.</Text>
    
    <TouchableOpacity
      onPress={() => {
        console.log("Checkbox tapped for task", item.id);
        handleCheck(item.id);
      }}
      style={{ paddingHorizontal: 10 }}
    >
      <Ionicons name="checkbox" size={24} color="#28a745" />
    </TouchableOpacity>

    <View>
      <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: 700 }}>
        {item.roomName}
      </Text>
      <Text style={{ marginLeft: 10, fontSize: 14 }}>
        {formatDate(item.assignedDate)}
      </Text>
      <Text style={{ marginLeft: 10, fontSize: 14 }}>
        Ghi chú: {item.notes}
      </Text>
    </View>
  </View>
);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 20,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#003b95",
        }}
      >
        Danh sách công việc đã hoàn thành của bạn là
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default TasksListSuccess;
