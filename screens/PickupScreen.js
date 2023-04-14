import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import moment from "moment-jalaali";
import { current } from "@reduxjs/toolkit";

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
			<TextInput
				editable
				multiline
				numberOfLines={4}
				maxLength={40}
				style={{
					paddingVertical: 60,
					paddingHorizontal: 10,
					borderColor: "gray",
					borderWidth: 0.7,
					borderRadius: 9,
					margin: 10,
					marginHorizontal: 10,
				}}
			></TextInput>
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
				startDate={firstDayOfWeek}
				endDate={lastDayOfWeek}
				initialSelectedDate={
					new Date(moment().add(1, "days").format("YYYY-MM-DD"))
				}
				endSelectedDate={lastDayOfWeek}
				onSelectedDateChange={(date) => setSelectedDate(date)}
				selectedItemWidth={170}
				unselectedItemWidth={38}
				itemHeight={38}
				itemRadius={10}
				selectedItemTextStyle={styles.selectedItemTextStyle}
				unselectedItemTextStyle={styles.selectedItemTextStyle}
				selectedItemBackgroundColor="#222831"
				unselectedItemBackgroundColor="#ececec"
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
		backgroundColor: "#ececec",
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
});
