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

export default function HomeScreen() {
  const cart = useSelector((state) => state.cart.cart);
  console.log("cart", cart);
  const [displayCurrenAddress, setDisplayCurrentAddress] = useState(
    "we are loading your location..."
  );
  const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnable();
    getCurrentLocation();
  }, []);

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
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  useEffect(() => {
    if (products.length > 0) return;
    const fetchProducts = () => {
      services.map((item) => {
        dispatch(getProducts(item));
      });
    };
    fetchProducts();
  }, [products]);

  console.log("products", products);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 20,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 15,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 17,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 25,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 27,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 8,
    },
  ];

  return (
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

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
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
  );
}

const styles = StyleSheet.create({});
