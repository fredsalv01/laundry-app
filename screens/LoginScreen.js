import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Wrapper from '../components/Wrapper';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigation = useNavigation();

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white',
				alignItems: 'center',
				padding: 10,
			}}
		>
			<Wrapper>
				<View
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 100,
					}}
				>
					<Text style={{ fontSize: 20, color: '#662d91', fontWeight: 'bold' }}>
						Sign In
					</Text>

					<Text style={{ fontSize: 18, marginTop: 8, fontWeight: '500' }}>
						Sign in to your account
					</Text>
				</View>

				<View style={{ marginTop: 50 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
						<MaterialCommunityIcons
							name="email-outline"
							size={24}
							color="black"
						/>
						<TextInput
							placeholder="Email"
							placeholderTextColor={'black'}
							style={{
								paddingBottom: 4,
								fontSize: email ? 18 : 18,
								borderBottomWidth: 1,
								borderBottomColor: 'gray',
								width: 300,
								marginVertical: 10,
							}}
							value={email}
							onChangeText={(text) => setEmail(text)}
						/>
					</View>
				</View>

				<View style={{ marginTop: 20 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
						<MaterialIcons name="lock-outline" size={24} color="black" />
						<TextInput
							placeholder="Password"
							placeholderTextColor={'black'}
							style={{
								paddingBottom: 4,
								borderBottomWidth: 1,
								borderBottomColor: 'gray',
								width: 300,
								marginVertical: 10,
								fontSize: password ? 18 : 18,
							}}
							value={password}
							onChangeText={(text) => setPassword(text)}
							secureTextEntry
						/>
					</View>

					<TouchableOpacity
						style={{
							width: 200,
							backgroundColor: '#318CE7',
							padding: 15,
							borderRadius: 7,
							marginTop: 50,
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					>
						<Text
							style={{
								fontSize: 18,
								textAlign: 'center',
								color: 'white',
								fontWeight: 'bold',
								//shadow
								shadowColor: '#000',
								shadowOffset: {
									width: 0,
									height: 2,
								},
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
							}}
						>
							Login
						</Text>
					</TouchableOpacity>
				</View>

				<View
					style={{
						marginTop: 40,
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						gap: 10,
					}}
				>
					<Text
						style={{
							color: 'gray',
							fontSize: 18,
							fontWeight: 400,
						}}
					>
						Don't have an account?
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate('Register')}>
						<Text
							style={{
								color: 'gray',
								fontSize: 18,
								fontWeight: 500,
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
						>
							Sign Up
						</Text>
					</TouchableOpacity>
				</View>
			</Wrapper>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
