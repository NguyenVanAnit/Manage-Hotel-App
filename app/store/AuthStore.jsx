import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setIsLogin(true);
        setUserInfo(JSON.parse(user));
      }
    };
    checkLogin();
  }, []);

  const loginDispatch = async (user) => {
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUserInfo(user);
    setIsLogin(true);
  };

  const logoutDispatch = async () => {
    await AsyncStorage.removeItem("user");
    setUserInfo(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ isLogin, loginDispatch, logoutDispatch, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
