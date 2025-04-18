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
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';


const PaymentSuccessScreen = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');

    const handleSendEmail = () => {
        console.log('Sending tickets to:', email);
        navigation.navigate('MainTabs');
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
                    {/* @ts-ignore */}
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
        backgroundColor: colors.background.dark,
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
    logoText: {
        ...typography.heading2,
    },
    signInButton: { // Copied from CheckoutScreen
        backgroundColor: colors.button.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    signInButtonText: {
        ...typography.buttonTextSmall,
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
        ...typography.heading1,
        textAlign: 'center',
        marginBottom: hp(3),
    },
    message: {
        ...typography.description,
        textAlign: 'center',
        lineHeight: hp(2.8),
        marginBottom: hp(4),
    },
    emailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.darker,
        borderRadius: 10, // Fully rounded ends
        paddingVertical: hp(0.5),
        paddingHorizontal: wp(2),
        width: '100%', // Take full width
        marginBottom: hp(3),
        borderColor: colors.card.background,
    },
    input: {
        ...typography.inputText,
        flex: 1,
        paddingVertical: hp(1.5),
        paddingHorizontal: wp(4),
    },
    sendButton: {
        backgroundColor: colors.button.primary,
        borderRadius: 20, // Rounded ends
        paddingHorizontal: wp(6),
        height: hp(4),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: wp(2),
    },
    sendButtonText: {
        ...typography.buttonTextSmall,
    },
    // Optional Home Button Style
    homeButton: {
        marginTop: hp(2),
        padding: wp(4),
    },
    homeButtonText: {
        ...typography.linkText,
        fontSize: hp(2),
    }
});

export default PaymentSuccessScreen;
