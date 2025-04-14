import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using Material Community Icons
import CustomInput from '../components/CustomInput';
import PrimaryButton from '../components/PrimaryButton'; // Assuming you have this

// Define RootStackParamList including Login and Signup
type RootStackParamList = {
    Home: undefined;
    Details: undefined;
    Checkout: undefined;
    PaymentSuccess: undefined;
    Login: undefined; // Add Login
    Signup: undefined; // Add Signup
    // Add other screens here
};

// Type for the navigation prop
type LoginScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Login'
>;

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    const handleLogin = () => {
        // TODO: Implement login logic (validate, API call, navigate)
        navigation.navigate('Home');
        // On success, navigate to Home or appropriate screen
        // navigation.navigate('Home'); 
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
        // TODO: Implement forgot password navigation/logic
        console.log('Forgot Password pressed');
    };

    const handleGoogleLogin = () => {
        // TODO: Implement Google Sign-In
        console.log('Google Login pressed');
    };

    const handleFacebookLogin = () => {
        // TODO: Implement Facebook Sign-In
        console.log('Facebook Login pressed');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#190F20" />

            {/* Header/Logo */}
            <View style={styles.headerContainer}>
                {/* Replace with your actual logo */}
                <Text style={styles.logoText}>FanGenie</Text>
            </View>

            <Text style={styles.title}>Login to your account</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.linkText}>Signup</Text>
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <CustomInput
                    label="Email"
                    placeholder="example@domain.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress" // Help with autofill
                />
                <CustomInput
                    label="Password"
                    placeholder="Enter your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry // Enables the eye icon toggle
                    textContentType="password" // Help with autofill
                />

                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordContainer}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <PrimaryButton title="Login" onPress={handleLogin} style={styles.loginButton} />

                <TouchableOpacity onPress={() => setKeepLoggedIn(!keepLoggedIn)} style={styles.keepLoggedInContainer}>
                    {/* @ts-ignore */}
                    <Icon name={keepLoggedIn ? "checkbox-marked" : "checkbox-blank-outline"} size={hp(2.5)} color={keepLoggedIn ? '#A050F0' : '#5A5A5A'} />
                    <Text style={styles.keepLoggedInText}>Keep me Logged in</Text>
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
            </View>

            {/* Social Logins */}
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                    {/* @ts-ignore */}
                    <Icon name="google" size={hp(2.5)} color="#FFF" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                    {/* @ts-ignore */}
                    <Icon name="facebook" size={hp(2.5)} color="#FFF" style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190F20', // Dark background
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(8),
        paddingTop: Platform.OS === 'android' ? hp(2) : hp(8), // Adjust top padding
        paddingBottom: hp(5),
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: hp(4),
    },
    logoText: { // Placeholder - use Image component for actual logo
        color: '#FFF',
        fontSize: hp(4),
        fontWeight: 'bold',
        // Replace with <Image source={require('../assets/logo.png')} ... />
    },
    title: {
        color: '#FFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(1),
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(4),
    },
    subtitleText: {
        color: '#B0A0C0',
        fontSize: hp(1.8),
    },
    linkText: {
        color: '#A050F0', // Purple link
        fontSize: hp(1.8),
        fontWeight: 'bold',
    },
    formContainer: {
        marginBottom: hp(2),
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: -hp(1), // Pull up slightly
        marginBottom: hp(3),
    },
    loginButton: {
        marginTop: hp(1), // Add some space above button
    },
    keepLoggedInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        alignSelf: 'flex-start', // Align to left
    },
    keepLoggedInText: {
        color: '#B0A0C0',
        fontSize: hp(1.7),
        marginLeft: wp(2),
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: hp(4),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#5A4573', // Divider color
    },
    dividerText: {
        color: '#B0A0C0',
        marginHorizontal: wp(4),
        fontSize: hp(1.7),
        fontWeight: 'bold',
    },
    socialLoginContainer: {
        // Styles for social login section
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2C1D3E', // Darker button background
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#5A4573',
        paddingVertical: hp(1.8),
        marginBottom: hp(2),
    },
    socialIcon: {
        marginRight: wp(3),
    },
    socialButtonText: {
        color: '#FFF',
        fontSize: hp(1.9),
        fontWeight: 'bold',
    },
});

export default LoginScreen; 