import { StatusBar } from "expo-status-bar";
import {
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Provider } from "react-redux";
import store from "./store/store";
import StackNavigator from "./navigator/StackNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripe_publishable_key =
	"pk_test_51KkJ4qCn7TBsELSeqqwPTBshmadqjjwBT82gQyZgVKjEYuJFqEYrRCU5tTyEbWCkzrvhSn7jV11EQRgyQGbWxtzF00EbNlE5Eb";

export default function App() {
	return (
		<Provider store={store}>
			<SafeAreaView style={styles.container}>
				<StripeProvider publishableKey={stripe_publishable_key}>
					<StackNavigator />
				</StripeProvider>
				<StatusBar style="auto" />
			</SafeAreaView>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
		paddingTop: Platform.OS === "android" ? 40 : 0,
	},
});
