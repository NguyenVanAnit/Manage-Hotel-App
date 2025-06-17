import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../store/AuthStore";
import { useEffect } from "react";
import { getTasksByStaff } from "../../api/task";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const { userInfo, logoutDispatch } = useAuth();
  const navigation = useNavigation();
  console.log("userInfo", userInfo);

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
          marginVertical: 20,
          color: "#003b95",
        }}
      >
        Xin chào {userInfo?.fullName || ""}
      </Text>
      <Text
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#696969",
          marginBottom: 20,
        }}
      >
        Chào mừng bạn đến với ứng dụng quản lý công việc
      </Text>

      {/* {userInfo?.department == "Dọn dẹp" && ( */}
        <TouchableOpacity
          style={{
            backgroundColor: "#003b95",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("TasksList");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Danh sách công việc tồn tại
          </Text>
        </TouchableOpacity>
      {/* )} */}

      {userInfo?.department == "Kiểm định" && (
        <TouchableOpacity
          style={{
            backgroundColor: "#003b95",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("TasksList");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Kiểm tra hoàn thành công việc
          </Text>
        </TouchableOpacity>
      )}

      {/* {userInfo?.department == "Dọn dẹp" && ( */}
        <TouchableOpacity
          style={{
            backgroundColor: "#003b95",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("TaskListSuccess");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Danh sách công việc đã hoàn thành
          </Text>
        </TouchableOpacity>
      {/* )} */}

      {/* {userInfo?.department == "Dọn dẹp" && ( */}
        <TouchableOpacity
          style={{
            backgroundColor: "#003b95",
            paddingVertical: 20,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("TaskListSuccess");
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Danh sách công việc phải làm lại
          </Text>
        </TouchableOpacity>
      {/* )} */}

      <TouchableOpacity
        style={{
          backgroundColor: "#003b95",
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 8,
          marginTop: 20,
        }}
        onPress={() => {
          // Handle button press
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Xem ngày chấm công
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: "#528B8B",
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 17,
          marginTop: 50,
          width: "50%",
          alignSelf: "center",
        }}
        onPress={() => {
          logoutDispatch();
          alert("Đăng xuất thành công");
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
