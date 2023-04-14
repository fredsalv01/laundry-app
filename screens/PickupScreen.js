import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import moment from "moment-jalaali";

const PickupScreen = () => {
  const currentDate = new Date();
  const firstDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  );
  const lastDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 7)
  );

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");

  const deliveryTimes = [
    {
      id: "0",
      time: "11:00 PM",
      disable: true,
    },
    {
      id: "1",
      time: "12:00 PM",
      disable: false,
    },
    {
      id: "2",
      time: "14:00 PM",
      disable: false,
    },
    {
      id: "3",
      time: "15:00 PM",
      disable: false,
    },
    {
      id: "4",
      time: "16:00 PM",
      disable: false,
    },
    {
      id: "5",
      time: "17:00 PM",
      disable: false,
    },
    {
      id: "6",
      time: "18:00 PM",
      disable: false,
    },
    {
      id: "7",
      time: "19:00 PM",
      disable: false,
    },
  ];
  const DeliveryDate = [
    {
      id: "0",
      time: "Tomorrow",
      disable: true,
    },
    {
      id: "1",
      time: "2-3 Days",
      disable: true,
    },
    {
      id: "2",
      time: "3-4 Days",
      disable: false,
    },
    {
      id: "3",
      time: "4-5 Days",
      disable: false,
    },
    {
      id: "4",
      time: "5-6 Days",
      disable: false,
    },
  ];
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 20 }}>
        Enter Address
      </Text>
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 5,
          marginHorizontal: 5,
        }}
      >
        <TextInput
          editable
          multiline
          numberOfLines={7}
          placeholder="Enter Address"
          maxLength={100}
          onChangeText={(text) => console.log(text)}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 12,
            shadowRadius: 8,
            shadowOpacity: 0.2,
            shadowColor: "#757575",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            verticalAlign: "top",
            padding: 8,
            textAlign: "left",
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        PickUp Date
      </Text>
      <HorizontalDatepicker
        mode="gregorian"
        startDate={new Date(moment().format("YYYY-MM-DD"))}
        endDate={lastDayOfWeek}
        initialSelectedDate={
          new Date(moment().format("YYYY-MM-DD"))
        }
				minimumDate={new Date(moment().format("YYYY-MM-DD"))}
        endSelectedDate={lastDayOfWeek}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemTextStyle={styles.selectedItemTextStyle}
        unselectedItemTextStyle={styles.selectedItemTextStyle}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#e4e4e7"
        flatListContainerStyle={styles.flatListContainerStyle}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Select Time
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTimes.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedTime(item.time)}
            disabled={item.disable}
            style={
              selectedTime.includes(item.time)
                ? styles.deliveryTimeSelected
                : item.disable
                ? styles.disableTime
                : styles.deliveryTime
            }
            key={index}
          >
            <Text
              style={
                selectedTime.includes(item.time)
                  ? styles.textTimeSelected
                  : styles.textTime
              }
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          marginHorizontal: 20,
          marginTop: 30,
          marginBottom: 10,
        }}
      >
        Delivery Time
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {DeliveryDate.map((item, index) => (
          <TouchableOpacity
            onPress={() => setSelectedDeliveryDate(item.time)}
            disabled={item.disable}
            style={
              selectedDeliveryDate.includes(item.time)
                ? styles.deliveryTimeSelected
                : item.disable
                ? styles.disableTime
                : styles.deliveryTime
            }
            key={index}
          >
            <Text
              style={
                selectedDeliveryDate.includes(item.time)
                  ? styles.textTimeSelected
                  : styles.textTime
              }
            >
              {item.time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({
  deliveryTime: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "#e4e4e7",
  },
  deliveryTimeSelected: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    borderColor: "#fefefe",
    borderWidth: 1,
    backgroundColor: "#222831",
  },
  textTime: {
    color: "#000",
  },
  textTimeSelected: {
    color: "#fff",
  },
  disableTime: {
    margin: 10,
    borderRadius: 10,
    padding: 15,
    borderColor: "gray",
    borderWidth: 1,
    opacity: 0.4,
  },
  flatListContainerStyle: {
    backgroundColor: "#f0f0f0",
  },
});
