import React from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import moment from "moment";

// Những ngày đã chấm công
const checkedInDays = ["2025-05-04",
    "2025-05-05", "2025-05-06", "2025-05-07", "2025-05-08",
    "2025-05-09", "2025-05-10", "2025-05-11", "2025-05-12", "2025-05-13",];

// Hàm tạo mảng full ngày trong tháng
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

const WorkCalendar = () => {
  const year = 2025;
  const month = 5; // Tháng 5

  const allDaysInMonth = generateMonthDays(year, month);

  // Đánh dấu từng ngày
  const markedDates = {};
  allDaysInMonth.forEach((date) => {
    const isCheckedIn = checkedInDays.includes(date);
    const isToday = date === moment().format("YYYY-MM-DD");

    markedDates[date] = {
      marked: true,
      dotColor: isCheckedIn ? "#00cc66" : "#ff9900",
      selected: isToday,
      selectedColor: isToday ? "#003b95" : undefined,
    };
  });

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, marginTop: StatusBar.currentHeight }}>
      <Text
        style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
      >
        Lịch chấm công tháng {month}/{year}
      </Text>

      <Calendar
        current={`${year}-${month.toString().padStart(2, "0")}-01`}
        markedDates={markedDates}
        theme={{
          selectedDayBackgroundColor: "#003b95",
          todayTextColor: "#003b95",
          dotColor: "#00cc66",
          arrowColor: "#003b95",
        }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <View style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#00cc66" }}/>
            <Text style={{ marginLeft: 10 }}>Đã chấm công</Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
            <View style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#ff9900" }}/>
            <Text style={{ marginLeft: 10 }}>Chưa chấm công</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WorkCalendar;
