import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Pressable } from "react-native";
import React from "react";


const ProfileScreen = () => {
	return (
		<SafeAreaView>
			<View>
        <Text>Welcome User</Text>  
      </View>

			<TouchableOpacity>
        <Text>Sign Out</Text>
      </TouchableOpacity>
		</SafeAreaView>
	);
};

export default ProfileScreen;

const styles = StyleSheet.create({});
