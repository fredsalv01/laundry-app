import {
	View,
	Text,
	SafeAreaView,
	Alert,
	StyleSheet,
	Pressable,
	Image,
	TextInput,
	ScrollView,
	Platform,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import Services from "../components/Services";
import Carousel from "../components/Carousel";
import DressItems from "../components/DressItems";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../reducer/ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Loader from "../components/Loader";

export default function HomeScreen() {
	// cart selector and total amount cart
	const cart = useSelector((state) => state.cart.cart);

	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(false);

	//navigation
	const navigation = useNavigation();

	const total = cart
		.map((item) => item.quantity * item.price)
		.reduce((curr, prev) => curr + prev, 0);
	// totalItems cart
	const totalItems = cart
		.map((item) => item.quantity)
		.reduce((curr, prev) => curr + prev, 0);

	// show current address state
	const [displayCurrenAddress, setDisplayCurrentAddress] = useState(
		"we are loading your location..."
	);

	// use state location
	const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

	//getLocation
	useEffect(() => {
		checkIfLocationEnable();
		getCurrentLocation();
	}, []);

	// functions
	const checkIfLocationEnable = async () => {
		let enabled = await Location.hasServicesEnabledAsync();
		if (!enabled) {
			Alert.alert(
				"Location service not enabled",
				"Please enable the location services",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				],
				{ cancelable: false }
			);
		} else {
			setLocationServicesEnabled(enabled);
		}
	};

	// get current location
	const getCurrentLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permission denied",
				"allow the app to use the location services",
				[
					{
						text: "Cancel",
						onPress: () => console.log("Cancel Pressed"),
						style: "cancel",
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				],
				{ cancelable: false }
			);
		}
		const { coords } = await Location.getCurrentPositionAsync();
		if (coords) {
			const { latitude, longitude } = coords;

			let response = await Location.reverseGeocodeAsync({
				latitude,
				longitude,
			});

			for (let item of response) {
				let address = `${item.name} ${item.city} ${item.postalCode}`;
				setDisplayCurrentAddress(address);
			}
		}
	};

	// get products state
	const products = useSelector((state) => state.product.products);

	const dispatch = useDispatch();

	useEffect(() => {
		if (products.length > 0) {
			return;
		}
		const fetchProducts = async () => {
			setLoading(true);
			const colRef = collection(db, "types");
			const docsSnap = await getDocs(colRef);
			docsSnap.forEach((doc) => {
				items.push(doc.data());
			});
			items?.map((service) => dispatch(getProducts(service)));
			setTimeout(() => setLoading(false), 2000);
		};
		try {
			fetchProducts();
		} catch (error) {
			console.log(error);
		}
	}, [products]);

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<>
					<ScrollView style={{ flex: 1 }}>
						{/* location and profile */}
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								padding: 10,
							}}
						>
							<Entypo name="location-pin" size={30} color="#fd5c63" />
							<View>
								<Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
								<Text>{displayCurrenAddress}</Text>
							</View>

							<Pressable
								onPress={() => navigation.navigate("Profile")}
								style={{ marginLeft: "auto", marginRight: 7 }}
							>
								<Image
									style={{ width: 40, height: 40, borderRadius: 25 }}
									source={{
										uri: "https://lh3.googleusercontent.com/ogw/AOLn63GRCQq8ollMWulFjkQrkIFsmKBa2mVOedSD-UJVh14=s64-c-mo",
									}}
								/>
							</Pressable>
						</View>
						{/* search bar */}
						<View
							style={{
								padding: 10,
								margin: 10,
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								borderColor: "#C0C0C0",
								borderWidth: 0.8,
								borderRadius: 7,
							}}
						>
							<TextInput
								style={{
									paddingTop: 5,
									paddingBottom: 0,
									borderWidth: 0.5,
									borderColor: "#000",
									flexGrow: 1,
									borderColor: "transparent",
								}}
								placeholder="Search for items or more."
							/>
							<EvilIcons name="search" size={28} color="#fd5c63" />
						</View>
						{/* image carousel */}
						<Carousel />

						{/* services component */}
						<Services />

						{/* render all the products */}
						{products.map((service, index) => (
							<DressItems key={index} item={service} />
						))}
					</ScrollView>
					{total === 0 ? null : (
						<Pressable
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
								<Text
									style={{ fontSize: 17, fontWeight: "500", color: "white" }}
								>
									{totalItems} items - ${total}
								</Text>
								<Text
									style={{
										fontSize: 13,
										fontWeight: "400",
										color: "white",
										marginBottom: 8,
									}}
								>
									extra charges might be applied
								</Text>
							</View>
							<TouchableOpacity onPress={() => navigation.navigate("PickUp")}>
								<Text
									style={{
										fontSize: 17,
										fontWeight: "600",
										color: "white",
										padding: 15,
									}}
								>
									Go to Pickup
								</Text>
							</TouchableOpacity>
						</Pressable>
					)}
				</>
			)}
		</>
	);
}

const styles = StyleSheet.create({});
