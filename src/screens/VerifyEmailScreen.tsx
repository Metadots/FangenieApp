import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    TextInput,
    Keyboard,
    Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PrimaryButton from '../components/PrimaryButton';

// Re-use or define RootStackParamList
type RootStackParamList = {
    Home: undefined;
    Details: undefined;
    Checkout: undefined;
    PaymentSuccess: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    VerifyEmail: { email: string };
    ResetPassword: { email: string; otp: string };
    // Add other screens here
};

// Type for the navigation prop
type VerifyEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'VerifyEmail'
>;

// Type for the route prop
type VerifyEmailScreenRouteProp = RouteProp<
    RootStackParamList,
    'VerifyEmail'
>;

const OTP_LENGTH = 5; // Match the image (5 boxes)

const VerifyEmailScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params; // Get email passed from ForgotPassword

    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        // Focus the first input when the screen mounts
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        // Allow only one digit per box
        newOtp[index] = text.length > 0 ? text.charAt(text.length - 1) : '';
        setOtp(newOtp);

        // Move to the next input if a digit is entered
        if (text.length > 0 && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        // If the last digit is entered, attempt verification
        if (newOtp.every(digit => digit !== '')) {
            Keyboard.dismiss(); // Dismiss keyboard
            // Optionally auto-trigger verify
            // handleVerify(); 
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
        // Move to the previous input if Backspace is pressed and the current input is empty
        if (key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
            // Also clear the previous input if needed? Depends on desired UX
            // const newOtp = [...otp];
            // newOtp[index - 1] = '';
            // setOtp(newOtp);
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        // TODO: Implement API call to verify OTP
        console.log('Verifying OTP:', enteredOtp, 'for email:', email);


        navigation.navigate('ResetPassword', { email, otp: enteredOtp });

    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#190F20" />

            {/* Header/Logo */}
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/images/Logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.instructionText}>
                Verify Email
            </Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Back to </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* OTP Input */}
            <Text style={styles.otpLabel}>OTP</Text>
            <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                    <TextInput
                        key={index}
                        ref={ref => inputRefs.current[index] = ref}
                        style={styles.otpInput}
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={text => handleOtpChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        value={digit}
                        textContentType="oneTimeCode" // Helps with autofill from SMS
                    />
                ))}
            </View>

            <PrimaryButton title="Verify" onPress={handleVerify} style={styles.actionButton} />

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190F20',
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(8),
        paddingTop: Platform.OS === 'android' ? hp(2) : hp(8),
        paddingBottom: hp(5),
        alignItems: 'center', // Center content horizontally
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: hp(6),
        marginTop: hp(15)
    },
    logoImage: {
        width: wp(40),
        height: hp(6),
    },
    title: {
        color: '#FFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(1),
    },
    instructionText: {
        color: '#FFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(1),
        alignSelf: "flex-start"
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(6),
        alignSelf: "flex-start"
    },
    subtitleText: {
        color: '#fff',
        fontSize: hp(1.8),
    },
    linkText: {
        color: '#A050F0',
        fontSize: hp(1.8),
        fontWeight: 'bold',
    },
    otpLabel: {
        color: '#fff',
        fontSize: hp(1.8),
        marginBottom: hp(1),
        alignSelf: 'flex-start', // Align label to left
        marginLeft: wp(1),
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%', // Take full width to space out boxes
    },
    otpInput: {
        width: wp(14), // Adjust width based on screen size and number of inputs
        height: hp(7),
        textAlign: 'center',
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: '#FFF',
        backgroundColor: '#353535',
    },
    actionButton: {
        marginTop: hp(3),
        width: '100%', // Make button full width
    },
});

export default VerifyEmailScreen; 