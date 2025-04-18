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
import { useResendOtp, useVerifyOtp } from '../../services/auth.service';
import { typography } from '../../constants/globalStyles';

const OTP_LENGTH = 6;

const VerifyEmailScreen: React.FC = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const { email } = route.params;
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(''));
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const verifyOtpMutation = useVerifyOtp();
    const resendOtpMutation = useResendOtp();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

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
        console.log(email, enteredOtp)
        //@ts-ignore
        verifyOtpMutation.mutate({
            email: email,
            otp: enteredOtp,
        }, {
            onSuccess: (data) => {
                console.log('Verify Email Page Response--->', data, data.message);
                if (data.message === 'OTP verified. Please reset your password.') {
                    setSuccessMessage('OTP Verified Successfully!');
                    setErrorMessage('');
                    //@ts-ignore
                    navigation.navigate('ResetPassword',
                        {
                            email,
                            token: data.data.resetToken,
                        });
                }
                else {
                    setSuccessMessage('OTP Verified Successfully!');
                    setErrorMessage('');
                    //@ts-ignore
                    navigation.navigate('Login');
                }
            },
            onError: (error: any) => {
                console.log('Verify Email Page Error---->', error);
                setErrorMessage(error?.message);
                setSuccessMessage('');
            },
        });
    };

    const handleResendOtp = () => {
        //@ts-ignore
        resendOtpMutation.mutate({
            email: email,
        }, {
            onSuccess: (data) => {
                console.log('Verify Email Page Response--->', data, data.message);
                setSuccessMessage('OTP Resent Successfully!');
                setErrorMessage('');
            },
            onError: (error: any) => {
                console.log('Verify Email Page Error---->', error);
                setErrorMessage(error?.message);
                setSuccessMessage('');
            },
        });
    }

    return (
        <View style={styles.contentContainer}>
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
                        onFocus={() => { setSuccessMessage(''); setErrorMessage('') }}
                    />
                ))}
            </View>



            <Text style={styles.resendText}>Did't receive otp? <Text
                // onPress={handleResendOtp}
                style={{ color: colors.gold }}>Resend OTP</Text> </Text>


            <View style={{ width: '100%', alignItems: 'center' }} >
                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : null}
                {successMessage ? (
                    <Text style={styles.successMessage}>{successMessage}</Text>
                ) : null}
            </View>

            <PrimaryButton
                title="Verify"
                onPress={handleVerify}
                style={styles.actionButton}
                textStyle={undefined}
                loading={verifyOtpMutation.isPending}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.dark,
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(8),
        paddingTop: Platform.OS === 'android' ? hp(2) : hp(8),
        paddingBottom: hp(5),
        alignItems: 'center',
        backgroundColor: colors.background.dark,
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
        ...typography.heading1,
        textAlign: 'center',
        marginBottom: hp(1),
    },
    instructionText: {
        ...typography.heading1,
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
        ...typography.description,
    },
    linkText: {
        ...typography.linkText,
    },
    otpLabel: {
        ...typography.description,
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
        width: 50,
        height: hp(7),
        textAlign: 'center',
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: 'black',
        backgroundColor: colors.background.primary,
    },
    actionButton: {
        marginTop: hp(2),
        width: '100%',
    },
    resendText: {
        ...typography.description,
        marginTop: hp(2),
        marginBottom: hp(2),
    },
    errorMessage: {
        ...typography.errorText,
        marginTop: hp(2),
    },
    successMessage: {
        ...typography.successText,
        marginBottom: hp(2),
    },
});

export default VerifyEmailScreen; 