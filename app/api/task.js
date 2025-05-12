import axiosClient from "./axiosClient";

const getTasksByStaff = async (staffId) => {
    const res = await axiosClient.get(`/tasks/staff/${staffId}`);
    return res?.data;
};

const putChangeStatusTask = async (taskId, status) => {
    const res = await axiosClient.put(`/tasks/${taskId}/status?status=${status}`);
    return res?.data;
}

export { getTasksByStaff, putChangeStatusTask };