import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import moment from "moment-jalaali";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { DELIVERY_TIMES, DELIVERY_DATES } from "../data/data";
import { Alert } from "react-native";

const PickupScreen = () => {
  const currentDate = new Date();
  // const firstDayOfWeek = new Date(
  //   currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  // );
  const lastDayOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 14)
  );

  const cart = useSelector((state) => state.cart.cart);
  //navigation
  const navigation = useNavigation();

  //total cart
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  // total items cart
  const totalItems = cart
    .map((item) => item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !selectedDeliveryDate) {
      Alert.alert(
        "Empty or invalid date or time",
        "Please select all the fields",
        [
          // {
          // 	text: "Cancel",
          // 	onPress: () => console.log("Cancel pressed"),
          // 	style: "cancel",
          // },
          {
            text: "Ok",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    }
    if (selectedDate && selectedTime && selectedDeliveryDate) {
      navigation.navigate("Cart");
    }
  };

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState("");

  const deliveryTimes = [...DELIVERY_TIMES];
  const DeliveryDate = [...DELIVERY_DATES];

  const deliveryCharge = 50;
  const pickupCharge = 0;

  return (
    <>
      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "500",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
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
            numberOfLines={2}
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
              paddingVertical: Platform.OS === "android" ? 8 : 20,
              paddingHorizontal: Platform.OS === "ios" ? 7 : 8,
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
          startDate={new Date(moment().add(1, "days").format("YYYY-MM-DD"))}
          endDate={lastDayOfWeek}
          initialSelectedDate={new Date(moment().format("YYYY-MM-DD"))}
          minimumDate={new Date(moment().add(1, "days").format("YYYY-MM-DD"))}
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
      {total === 0 ? null : (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            backgroundColor: "white",
            padding: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
          }}
        >
          <View
            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              margin: 10,
              marginBottom: Platform.OS === "android" ? 15 : 15,
              borderRadius: 7,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
                {totalItems} items - ${total}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                Delivery Charge: ${deliveryCharge}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                PickUp Charge:{" "}
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "blue",
                  }}
                >
                  Offer ${pickupCharge}
                </Text>
              </Text>
            </View>
            <TouchableOpacity
              style={{
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
              }}
              onPress={() => proceedToCart()}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: "black",
                }}
              >
                Checkout
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "black",
                }}
              >
                ${total + deliveryCharge - pickupCharge}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
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
