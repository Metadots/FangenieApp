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
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';

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
};

type VerifyEmailScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyEmail'>;
type VerifyEmailScreenRouteProp = RouteProp<RootStackParamList, 'VerifyEmail'>;

const OTP_LENGTH = 5;

const VerifyEmailScreen: React.FC = () => {
    const navigation = useNavigation<VerifyEmailScreenNavigationProp>();
    const route = useRoute<VerifyEmailScreenRouteProp>();
    const { email } = route.params;

    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const inputRefs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text.length > 0 ? text.charAt(text.length - 1) : '';
        setOtp(newOtp);

        if (text.length > 0 && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            Keyboard.dismiss();
        }
    };

    const handleKeyPress = ({ nativeEvent: { key } }: any, index: number) => {
        if (key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const enteredOtp = otp.join('');
        navigation.navigate('ResetPassword', { email, otp: enteredOtp });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background.dark} />

            {/* Header/Logo */}
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/images/Logo.png')}
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
                        textContentType="oneTimeCode"
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
        backgroundColor: colors.background.dark,
    },
    contentContainer: {
        flexGrow: 1,
        paddingHorizontal: wp(8),
        paddingTop: Platform.OS === 'android' ? hp(2) : hp(8),
        paddingBottom: hp(5),
        alignItems: 'center',
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
        color: colors.text.light,
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp(1),
    },
    instructionText: {
        color: colors.text.light,
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
        color: colors.text.light,
        fontSize: hp(1.8),
    },
    linkText: {
        color: colors.gold,
        fontSize: hp(1.8),
        fontWeight: 'bold',
    },
    otpLabel: {
        color: colors.text.light,
        fontSize: hp(1.8),
        marginBottom: hp(1),
        alignSelf: 'flex-start',
        marginLeft: wp(1),
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    otpInput: {
        width: wp(14),
        height: hp(7),
        textAlign: 'center',
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: colors.text.light,
        backgroundColor: colors.background.primary,
    },
    actionButton: {
        marginTop: hp(3),
        width: '100%',
    },
});

export default VerifyEmailScreen; 