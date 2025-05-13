import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../store/AuthStore";
import { useEffect, useState } from "react";
import { getTasksByStaff, putChangeStatusTask } from "../../api/task";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";

const mockData = [
  {
    id: 1,
    roomName: "Phòng 101",
    assignedDate: [2025, 5, 10],
    notes: "Dọn phòng + thay khăn",
    status: 0,
  },
  {
    id: 2,
    roomName: "Phòng 102",
    assignedDate: [2025, 5, 10],
    notes: "Vệ sinh toilet",
    status: 0,
  },
  {
    id: 4,
    roomName: "Phòng 104",
    assignedDate: [2025, 5, 13],
    notes: "Check mini bar",
    status: 0,
  },
  {
    id: 3,
    roomName: "Phòng 103",
    assignedDate: [2025, 5, 11],
    notes: "Bổ sung nước suối",
    status: 0,
  },
];

const TasksList = () => {
  const { userInfo } = useAuth();
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    const res = await getTasksByStaff(userInfo?.staffId);
    if (res?.success) {
      const filteredTasks = res.data.data.filter((task) => task.status === 0);
      // const filteredTasks = mockData.filter((task) => task.status === 0);
      const sortedTasks = filteredTasks.sort((a, b) =>
        moment(b.assignedDate).diff(moment(a.assignedDate))
      );
      setTasks(sortedTasks);
      // console.log("sortedTasks", sortedTasks);
    } else {
      console.log("Error: ", res?.message);
    }
  };

  const handleCheck = async (taskId) => {
    const res = await putChangeStatusTask(taskId, 1);
    if (res?.success) {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      alert("Xác nhận hoàn thành công việc");
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

  const groupTasksByDate = (tasks) => {
    const grouped = tasks.reduce((acc, task) => {
      const dateKey = formatDate(task.assignedDate);
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(task);
      return acc;
    }, {});
    return Object.keys(grouped).map((date) => ({
      title: date,
      data: grouped[date],
    }));
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
      <Text style={{ width: 24, fontWeight: "bold", fontSize: 16 }}>
        {index + 1}.
      </Text>

      <TouchableOpacity
        onPress={() => handleCheck(item.id)}
        style={{ paddingHorizontal: 10 }}
      >
        <Ionicons name="square-outline" size={24} color="#003b95" />
      </TouchableOpacity>

      <View>
        <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "700" }}>
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
        Danh sách công việc của bạn là
      </Text>

      <SectionList
        sections={groupTasksByDate(tasks)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginVertical: 10,
              color: "#444",
            }}
          >
            {title}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 50, fontSize: 16 }}>
            Bạn không có công việc nào
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default TasksList;
