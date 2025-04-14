import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Platform,
    StatusBar,
    Image // Assuming you have a logo image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
// Re-use or define your RootStackParamList
type RootStackParamList = {
    Home: undefined;
    Details: undefined;
    Checkout: undefined;
    PaymentSuccess: undefined; // Add this screen
    // Add other screens here
};

// Type for the navigation prop specific to PaymentSuccessScreen
type PaymentSuccessScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'PaymentSuccess'
>;

// Type for the component props
type Props = {
    // If you need route params later, add: route: RouteProp<RootStackParamList, 'PaymentSuccess'>;
    navigation: PaymentSuccessScreenNavigationProp;
};

const PaymentSuccessScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleSendEmail = () => {
        // TODO: Implement logic to send tickets to email
        console.log('Sending tickets to:', email);
        // Navigate home after sending (or attempting to send)
        navigation.navigate('Home');
    };

    const handleGoHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Header onProfilePress={() => { }} />

            <View style={styles.mainContent}>
                <View style={styles.iconContainer}>
                    <AntDesign name="checkcircleo" size={hp(8)} color="#4CAF50" />
                </View>

                <Text style={styles.title}>Payment Successful</Text>

                <Text style={styles.message}>
                    Your payment was successful! Your tickets for Golden Hour Party by Coldplay are ready. You can download them now and keep a copy on your phone for easy access at the event. If you'd like, simply enter your email below and we'll send the tickets straight to your inbox as well. No need to print—just show your ticket on your phone at the entrance. Thank you for choosing FanGenie, and enjoy the show!
                </Text>

                <View style={styles.emailContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        placeholderTextColor="#fff"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={handleSendEmail}>
                        <Text style={styles.sendButtonText}>Send</Text>
                    </TouchableOpacity>
                </View>

                {/* Optional: Add a button to just go home without entering email */}
                {/* <TouchableOpacity onPress={handleGoHome} style={styles.homeButton}>
                    <Text style={styles.homeButtonText}>Go to Home</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190F20', // Dark background
        alignItems: "center", justifyContent: "center", width: "100%",
        paddingTop: Platform.OS === 'android' ? hp(1) : hp(6),
    },

    header: { // Same header style as Checkout for consistency
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : hp(6),
        paddingBottom: 10,
    },
    logoText: { // Placeholder logo
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    signInButton: { // Copied from CheckoutScreen
        backgroundColor: '#A050F0',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    signInButtonText: { // Copied from CheckoutScreen
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: wp(8),
        // Space below header
        alignSelf: "center",
        justifyContent: "center",
        marginTop: -hp(10),
    },
    iconContainer: {
        marginBottom: hp(3),
    },
    title: {
        color: '#FFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(3),
    },
    message: {
        color: 'white', // Lighter text color
        fontSize: hp(1.6),
        textAlign: 'center',
        lineHeight: hp(2.8),
        marginBottom: hp(4),
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#130C19', // Darker input background
        borderRadius: 10, // Fully rounded ends
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(2),
        width: '100%', // Take full width
        marginBottom: hp(3),
        borderColor: '#5A4573',
    },
    input: {
        flex: 1,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
        color: '#FFF',
        fontSize: hp(1.6),
    },
    sendButton: {
        backgroundColor: '#A050F0', // Purple button
        borderRadius: 20, // Rounded ends
        paddingHorizontal: wp(6),
        height: hp(4),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp(2),
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: hp(1.4),
        fontWeight: 'bold',
    },
    // Optional Home Button Style
    homeButton: {
        marginTop: hp(2),
        padding: wp(4),
    },
    homeButtonText: {
        color: '#A050F0',
        fontSize: hp(2),
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    }
});

export default PaymentSuccessScreen;
