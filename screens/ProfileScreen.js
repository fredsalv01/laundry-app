import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TouchableOpacity,
	Pressable,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
	const user = auth.currentUser;
	const navigation = useNavigation();
	const signOutUser = () => {
		signOut(auth)
			.then(() => {
				navigation.replace("Login");
			})
			.catch((error) => {
				Alert.alert(error.message);
			});
	};

	return (
		<SafeAreaView
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<View>
				<Text>Welcome {user.email}</Text>
			</View>

			<TouchableOpacity onPress={signOutUser} style={{
        backgroundColor: "lightgrey",
        padding: 10,
        margin: 10,
        marginBottom: Platform.OS === "android" ? 15 : 15,
        borderRadius: 7,
      }}>
				<Text>Sign Out</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({});
