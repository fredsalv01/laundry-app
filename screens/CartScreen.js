import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { decrementQuantity, incrementQuantity } from "../reducer/CartReducer";
import { decrementQty, incrementQty } from "../reducer/ProductReducer";

const CartScreen = () => {
	const cart = useSelector((state) => state.cart.cart);
	const dispatch = useDispatch();
	const total = cart
		.map((item) => item.quantity * item.price)
		.reduce((curr, prev) => curr + prev, 0);
	const navigation = useNavigation();
	return (
		<ScrollView>
			{total === 0 ? (
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<Text style={{ marginTop: 40 }}>Your Cart is empty</Text>
				</View>
			) : (
				<>
					<View
						style={{
							padding: 10,
							flexDirection: "row",
							alignItems: "center",
							gap: 4,
						}}
					>
						<Ionicons
							onPress={() => navigation.goBack()}
							name="arrow-back"
							size={24}
							color="black"
						/>
						<Text>Your bucket</Text>
					</View>
					<Pressable
						style={{
							backgroundColor: "white",
							borderRadius: 12,
							marginHorizontal: 10,
							padding: 14,
						}}
					>
						{cart.map((item, index) => (
							<View
								key={index}
								style={{
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "space-between",
									marginVertical: 10,
								}}
							>
								<Text>{item.name}</Text>
								<Pressable style={styles.ButtonsContainer}>
									<Pressable
										onPress={() => {
											dispatch(decrementQuantity(item)); // cart
											dispatch(decrementQty(item)); // product
										}}
									>
										<Text style={styles.qtyButton}>-</Text>
									</Pressable>
									<Pressable>
										<Text>${item.price * item.quantity}</Text>
									</Pressable>
									<Pressable
										onPress={() => {
											dispatch(incrementQuantity(item)); // cart
											dispatch(incrementQty(item)); // product
										}}
									>
										<Text style={styles.qtyButton}>+</Text>
									</Pressable>
								</Pressable>
								<Text>x{item.quantity}</Text>
							</View>
						))}
					</Pressable>
				</>
			)}
		</ScrollView>
	);
};

export default CartScreen;

const styles = StyleSheet.create({
	ButtonsContainer: {
		flexDirection: "row",
		paddingHorizontal: 10,
		paddingVertical: 5,
		alignItems: "center",
		justifyContent: "center",
		borderColor: "#BEBEBE",
		borderWidth: 0.5,
		borderRadius: 10,
	},
	qtyButton: {
		fontSize: 20,
		color: "#088F8F",
		paddingHorizontal: 6,
		fontWeight: "600",
	},
});
