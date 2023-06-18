import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

const Loader = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#fff",
			}}
		>
			<LottieView
				source={require("../assets/8166-laundry-illustration-animation.json")}
				style={styles.animation}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Loader;

const styles = StyleSheet.create({
	animation: {
		width: 250,
		height: 250,
	},
});
