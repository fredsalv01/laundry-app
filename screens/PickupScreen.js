import { View, Text, StyleSheet, TextInput } from "react-native";
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

	const [selectedDate, setSelectedDate] = useState(new Date(currentDate.setDate(moment())));
	console.log(firstDayOfWeek), console.log(lastDayOfWeek);
	return (
		<View>
			<Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 20 }}>
				Enter Address
			</Text>
			<TextInput
				style={{
					padding: 40,
					borderColor: "gray",
					borderWidth: 0.7,
					paddingVertical: 80,
					borderRadius: 9,
					margin: 10,
					marginHorizontal: 20,
				}}
			></TextInput>
			<Text style={{ fontSize: 16, fontWeight: "500", marginHorizontal: 20 }}>
				PickUp Date
			</Text>
			<HorizontalDatepicker
				mode="gregorian"
				startDate={firstDayOfWeek}
				endDate={lastDayOfWeek}
				initialSelectedDate={currentDate}
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
		</View>
	);
};

export default PickupScreen;

const styles = StyleSheet.create({});
