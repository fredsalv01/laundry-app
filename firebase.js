// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCFZN_wizjre0BnmRisabtveFsPtawLoog',
	authDomain: 'react-native-2e0bc.firebaseapp.com',
	projectId: 'react-native-2e0bc',
	storageBucket: 'react-native-2e0bc.appspot.com',
	messagingSenderId: '590382595261',
	appId: '1:590382595261:web:95018dba77acafef24cbd4',
	measurementId: 'G-D0TMKHS0RH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
