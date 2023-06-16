import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: 'white',
				alignItems: 'center',
				padding: 10,
			}}
		>
			<KeyboardAvoidingView>
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

				<View style={{ marginTop: 40 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
						<MaterialIcons name="lock-outline" size={24} color="black" />
						<TextInput
							placeholder="Password"
							placeholderTextColor={'black'}
							style={{
								borderBottomWidth: 1,
								borderBottomColor: 'gray',
								width: 300,
								marginVertical: 10,
							}}
							value={password}
							onChangeText={(text) => setPassword(text)}
							secureTextEntry
						/>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
