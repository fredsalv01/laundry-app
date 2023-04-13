import { StyleSheet, Text, View } from "react-native";
import React from "react";

const DressItems = ({ item }) => {
	return (
		<View>
			<Text >{item.name}</Text>
		</View>
	);
};

export default DressItems;

const styles = StyleSheet.create({});
