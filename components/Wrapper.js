import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	Keyboard,
} from 'react-native';
import React from 'react';
import { KeyboardAvoidingView } from 'react-native';

const Wrapper = ({ children }) => {
	return (
		<TouchableWithoutFeedback
			style={{
				height: '100%',
				width: '100%',
			}}
			onPress={() => Keyboard.dismiss()}
		>
			<KeyboardAvoidingView>{children}</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

export default Wrapper;

const styles = StyleSheet.create({});
