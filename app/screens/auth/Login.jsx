import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View
        style={{
          width: "90%",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingBottom: 20,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "#ccc",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginVertical: 20,
            color: "#003b95",
          }}
        >
          Đăng nhập
        </Text>

        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              textAlign: "left",
              width: "100%",
            }}
          >
            Số điện thoại
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "flex-start",
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              marginBottom: 10,
              textAlign: "left",
              width: "100%",
            }}
          >
            Mật khẩu
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: "#ccc",
              borderWidth: 1,
              width: "100%",
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 10,
                width: "100%",
                color: "#006ce4",
              }}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#003b95",
            width: "100%",
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
          onPress={() => {
            // Handle login action
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
