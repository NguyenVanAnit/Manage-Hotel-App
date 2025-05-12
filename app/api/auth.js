import axiosClient from "./axiosClient";

const loginApi = async (phoneNumber, password) => {
  const res = await axiosClient.post("/staff/login", {
    phoneNumber,
    password,
  });

  return res?.data;
};

export { loginApi };
