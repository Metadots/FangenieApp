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
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import { useResetPassword } from '../../services/auth.service';


const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { email, token } = route.params; // Get email and OTP passed from VerifyEmail
    console.log(email, token);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const resetPasswordMutation = useResetPassword();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');


    const handleResetPassword = () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (password.length < 8) { // Example validation
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        resetPasswordMutation.mutate({
            token,
            password,
        }, {
            onSuccess: (data) => {
                console.log(data);
                setSuccessMessage('Password reset successfully. You can now log in.');
                setErrorMessage('');
                navigation.navigate('Login');
                setPassword('');
                setConfirmPassword('');
                setError(null);
            },
            onError: (error) => {
                console.log(error);
                setErrorMessage('An error occurred. Please try again.');
                setSuccessMessage('');
            }
        })


    };

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

            <Text style={styles.title}>Reset Password</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Back to </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <CustomInput
                    label="Password"
                    placeholder="Enter your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="newPassword"
                    error={error && error.includes('length') ? error : undefined}
                />
                <CustomInput
                    label="Confirm Password"
                    placeholder="Enter your Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    textContentType="newPassword"
                    error={error && error.includes('match') ? error : undefined}
                />


                <View style={{ width: '100%', alignItems: 'center' }} >
                    {errorMessage ? (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ) : null}
                    {successMessage ? (
                        <Text style={styles.successMessage}>{successMessage}</Text>
                    ) : null}
                </View>
                <PrimaryButton
                    title="Reset Password"
                    onPress={handleResetPassword}
                    style={styles.actionButton}
                    loading={resetPasswordMutation.isPending}
                />
            </View>

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
        marginBottom: hp(5),
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
    formContainer: {
        // Styles for the form area
    },
    actionButton: {
        marginTop: hp(1),
    },
    errorMessage: {
        color: colors.status.error,
        marginTop: hp(2),
    },
    successMessage: {
        color: colors.gold,
        marginBottom: hp(2),
    },
});

export default ResetPasswordScreen; 