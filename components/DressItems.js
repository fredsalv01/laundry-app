import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducer/CartReducer";
import { incrementQty } from "../reducer/ProductReducer";

const DressItems = ({ item }) => {
  const dispatch = useDispatch();
	const addItemToCart = () => {
		dispatch(addToCart(item)) // cart reducer
		dispatch(incrementQty(item)) // product
	}
	const product = useSelector((state) => state.product.products);
  return (
    <View>
      <View style={styles.ClotheCard}>
        <Image source={{ uri: item.image }} style={styles.Image} />
        <View>
          <Text style={styles.Name}>{item.name}</Text>
          <Text style={styles.Price}>${item.price}</Text>
        </View>
        <Pressable onPress={addItemToCart} style={styles.AddBtn}>
          <Text style={styles.BtnText}>Add</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default DressItems;

const styles = StyleSheet.create({
  ClotheCard: {
    backgroundColor: "#f8f8f8",
    margin: 14,
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Image: {
    width: 50,
    height: 50,
  },
  Name: {
    textAlign: "center",
    width: 83,
    marginTop: 10,
    marginBottom: 7,
    fontSize: 17,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  Price: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
    fontWeight: "500",
  },
  AddBtn: {
    width: 80,
  },
  BtnText: {
    borderColor: "gray",
    borderWidth: 0.8,
    textAlign: "center",
    padding: 5,
    marginVertical: 10,
    borderRadius: 8,
    color: "#088F0F",
    fontSize: 17,
    fontWeight: "bold",
  },
});
