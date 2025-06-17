import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { getAttendRecordsByStaff } from "../../api/attendRecord";
import { useAuth } from "../../store/AuthStore";

const WorkCalendar = () => {
  const { userInfo } = useAuth();

  const currentDate = moment();
  const [year, setYear] = useState(currentDate.year());
  const [month, setMonth] = useState(currentDate.month() + 1);
  const [checkedInDays, setCheckedInDays] = useState([]);

  const generateMonthDays = (year, month) => {
    const startDate = moment(`${year}-${month}-01`);
    const endDate = startDate.clone().endOf("month");
    const days = [];

    for (
      let date = startDate.clone();
      date.isSameOrBefore(endDate);
      date.add(1, "day")
    ) {
      days.push(date.format("YYYY-MM-DD"));
    }

    return days;
  };

  const generateMarkedDates = (checkedInDays, year, month) => {
    const allDaysInMonth = generateMonthDays(year, month);
    const marked = {};

    allDaysInMonth.forEach((date) => {
      const isCheckedIn = checkedInDays.includes(date);
      const isToday = date === moment().format("YYYY-MM-DD");

      marked[date] = {
        marked: true,
        dotColor: isCheckedIn ? "#00cc66" : "#ff9900",
        selected: isToday,
        selectedColor: isToday ? "#003b95" : undefined,
      };
    });

    return marked;
  };

  const [markedDates, setMarkedDates] = useState({});

  const fetchData = async (year, month) => {
    try {
      const res = await getAttendRecordsByStaff({
        staffId: userInfo?.staffId,
        year,
        month,
      });
      console.log("object", res);

      const data = res?.data?.data?.absentDates.map((d) => moment(d.date).format("YYYY-MM-DD")) || [];
      setCheckedInDays(data);
      setMarkedDates(generateMarkedDates(data, year, month));
    } catch (err) {
      console.error("Fetch attendance failed", err);
    }
  };

  useEffect(() => {
    fetchData(year, month);
  }, [year, month]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Lịch chấm công tháng {month}/{year}
      </Text>

      <Calendar
        current={`${year}-${month.toString().padStart(2, "0")}-01`}
        markedDates={markedDates}
        onMonthChange={(date) => {
          setYear(date.year);
          setMonth(date.month);
        }}
        theme={{
          selectedDayBackgroundColor: "#003b95",
          todayTextColor: "#003b95",
          dotColor: "#00cc66",
          arrowColor: "#003b95",
        }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: "#00cc66" }} />
          <Text style={{ marginLeft: 10 }}>Đã chấm công: {checkedInDays.length}</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <View style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: "#ff9900" }} />
          <Text style={{ marginLeft: 10 }}>Chưa chấm công</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkCalendar;
