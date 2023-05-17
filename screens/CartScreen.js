import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { decrementQuantity, incrementQuantity } from "../reducer/CartReducer";
import { decrementQty, incrementQty } from "../reducer/ProductReducer";
import { Image } from "react-native";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const totalItems = cart
    .map((item) => item.quantity)
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
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 12,
              marginHorizontal: 10,
              padding: 14,
              shadowColor: "#000000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 3.05,
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
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: 70,
                    backgroundColor: "#e0e7ff",
                    padding: 8,
                    borderRadius: 10,
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.Image} />
                  <Text
                    style={{
                      textAlign: "center",
                      paddingVertical: 5,
                      textTransform: "capitalize",
                      fontWeight: "600",
                      fontSize: 12,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <Pressable style={styles.ButtonsContainer}>
                  <Pressable
                    onPress={() => {
                      dispatch(decrementQuantity(item)); // cart
                      dispatch(decrementQty(item)); // product
                    }}
                  >
                    <Text style={styles.qtyButton}> - </Text>
                  </Pressable>
                  <Pressable>
                    <Text style={{ fontWeight: "600", fontSize: 16 }}>
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      dispatch(incrementQuantity(item)); // cart
                      dispatch(incrementQty(item)); // product
                    }}
                  >
                    <Text style={styles.qtyButton}> + </Text>
                  </Pressable>
                </Pressable>
                <Text style={{ fontWeight: "600", fontSize: 18, width: 50 }}>
                  ${item.quantity * item.price}
                </Text>
              </View>
            ))}
          </View>

          {/* billing detail section */}
          <View style={styles.BillingDetailContainer}>
            <Text style={styles.Titles}>Billing Details</Text>
            <View style={styles.BillingContainer}>
              {/* total items */}
              <View style={styles.ItemsWrapper}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Items Total
                </Text>
                <Text style={styles.Items}>${total}</Text>
              </View>

              {/* delivery fees */}
              <View style={styles.ItemsWrapper}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    flexDirection: "column",
                  }}
                >
                  Delivery Fees{" "}
                  <Text style={{ fontSize: 13, fontWeight: "normal" }}>
                    (outside 10 km)
                  </Text>
                </Text>
                <Text style={styles.Items}>$50</Text>
              </View>

              {/* PickUp */}
              <View style={styles.ItemsWrapper}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    flexDirection: "column",
                  }}
                >
                  PickUp Fees{" "}
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "normal",
                      color: "blue",
                    }}
                  >
                    (Free within 10 km)
                  </Text>
                </Text>
                <Text style={styles.Items}>$0</Text>
              </View>

              {/* Total */}
              <View style={styles.ItemsWrapper}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  Total{" "}
                </Text>
                <Text style={styles.Total}>${total + 50}</Text>
              </View>
            </View>
          </View>

          <View style={styles.PayButtonContainer}>
            <TouchableOpacity
              onPress={() => console.log("You have pay")}
            >
              <Text style={styles.PayButtonText}>Pay</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: "space-between",
    width: 150,
    borderColor: "#BEBEBE",
    borderWidth: 0.5,
    borderRadius: 10,
  },
  qtyButton: {
    fontSize: 25,
    color: "#088F8F",
    paddingHorizontal: 6,
    fontWeight: "600",
  },
  Image: {
    width: 40,
    height: 40,
  },
  BillingDetailContainer: {
    marginHorizontal: 10,
    marginBottom: 20,
  },
  Titles: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
  },
  BillingContainer: {
    backgroundColor: "white",
    borderRadius: 7,
    padding: 10,
    marginTop: 15,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
  },
  ItemsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  Items: {
    fontSize: 18,
    fontWeight: "400",
    width: 100,
    textAlign: "right",
    marginRight: 20,
  },
  Total: {
    fontSize: 18,
    fontWeight: "bold",
    width: 100,
    textAlign: "right",
    marginRight: 20,
    color: "#088F8F",
  },
  PayButtonContainer: {
    backgroundColor: "#088F8F",
    padding: 10,
    margin: 10,
    marginBottom: Platform.OS === "android" ? 15 : 15,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.05,
  },
  PayButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 10,
    textAlign: "center",
  },
});
