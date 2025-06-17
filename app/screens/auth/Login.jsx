import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { loginApi } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../store/AuthStore";


const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // const navigation = useNavigation();
  const { loginDispatch } = useAuth();

  const login = async () => {
    if (phoneNumber === "" || password === "") {
      alert("Vui lòng nhập số điện thoại và mật khẩu");
      return;
    }

    try {
      setIsLoading(true);
      const response = await loginApi(phoneNumber, password);
      console.log('res', response);
      if (response?.success) {
        setTimeout(async() => {
          setIsLoading(false);
          await loginDispatch(response.data.data);
        }, 2000);
        // navigation.navigate("Home");
      } else {
        setIsLoading(false);
        // Handle login failure
        alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error(error);
      alert("Số điện thoại hoặc mật khẩu không đúng. Vui lòng thử lại.");
      setIsLoading(false);
    }
  };

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
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
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
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
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
            backgroundColor: isLoading ? "#9C9C9C" : "#003b95",
            width: "100%",
            height: 40,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
          onPress={login}
          disabled={isLoading}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#fff",
            }}
          >
            {isLoading ? '...Đang xác thực' : 'Đăng nhập'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
