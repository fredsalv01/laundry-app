import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../reducer/CartReducer";
import { incrementQty } from "../reducer/ProductReducer";

const DressItems = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart(item)); // cart reducer
    dispatch(incrementQty(item)); // product
  };

  const cart = useSelector((state) => state.cart.cart);

  return (
    <View>
      <View style={styles.ClotheCard}>
        <Image source={{ uri: item.image }} style={styles.Image} />
        <View>
          <Text style={styles.Name}>{item.name}</Text>
          <Text style={styles.Price}>${item.price}</Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            {/* minus button */}
            <Pressable
              style={{
                width: 35,
                height: 35,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>
            {/* quantity */}
            <Pressable
              style={{
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>
            {/* plus button */}
            <Pressable
              style={{
                width: 35,
                height: 35,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={styles.AddBtn}>
            <Text style={styles.BtnText}>Add</Text>
          </Pressable>
        )}
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
