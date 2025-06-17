import axiosClient from "./axiosClient";

const getAttendRecordsByStaff = async (params) => {
    const res = await axiosClient.get(`/attendance/work-absent-days/${params?.staffId}?year=${params?.year}&month=${params?.month}`);
    return res?.data;
};

export { getAttendRecordsByStaff };