import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/globalStyles';

import PrimaryButton from '../../components/PrimaryButton';
import CustomInput from '../../components/CustomInput';
import { useSignUp } from '../../services/auth.service';
import { userStore } from '../../store';


const SignupScreen: React.FC = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const { setAuth } = userStore();

    const signUpMutation = useSignUp();

    const handleSignup = async () => {

        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        setErrorMessage('');
        setSuccessMessage('');

        if (!cleanFirstName || !cleanLastName || !cleanEmail || !cleanPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            setErrorMessage('Invalid email format.');
            return;
        }

        if (cleanPassword.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
            return;
        }

        if (!agreeTerms) {
            setErrorMessage('Please agree to the Terms & Conditions.');
            return;
        }
        signUpMutation.mutate({
            firstName: cleanFirstName,
            lastName: cleanLastName,
            email: cleanEmail,
            password: cleanPassword,
        }, {
            onSuccess: (data) => {
                setSuccessMessage('Sign up successful! Redirecting...');
                navigation.navigate('VerifyEmail', { email: cleanEmail });
            },
            onError: (error: any) => {
                setErrorMessage(error?.message || 'Signup failed. Please try again.');
            }
        });
    };

    const handleGoogleLogin = () => {
        console.log('Google Login pressed');
    };

    const handleFacebookLogin = () => {
        console.log('Facebook Login pressed');
    };

    return (
        <View style={styles.contentContainer}
        // contentContainerStyle={styles.contentContainer}
        >
            <StatusBar barStyle="light-content" backgroundColor="#190F20" />

            {/* Header/Logo */}
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/images/Logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>Create an account</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>

            {/* Form */}
            <View style={styles.formContainer}>
                <View style={styles.nameRow}>
                    <CustomInput
                        label="First Name"
                        placeholder="John"
                        value={firstName}
                        onChangeText={setFirstName}
                        containerStyle={styles.nameInput} // Style to take half width
                        autoCapitalize="words"
                        textContentType="givenName"
                    />
                    <CustomInput
                        label="Last Name"
                        placeholder="Doe"
                        value={lastName}
                        onChangeText={setLastName}
                        containerStyle={styles.nameInput} // Style to take half width
                        autoCapitalize="words"
                        textContentType="familyName"
                    />
                </View>
                <CustomInput
                    label="Email"
                    placeholder="example@domain.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    textContentType="emailAddress"
                />
                <CustomInput
                    label="Password"
                    placeholder="Enter your Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="newPassword"
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
                    title="Signup"
                    onPress={handleSignup}
                    loading={signUpMutation.isPending}
                    textStyle={undefined}
                />

                <TouchableOpacity
                    onPress={() => setAgreeTerms(prev => !prev)}
                    style={styles.termsContainer}>
                    {/* @ts-ignore */}
                    <Icon name={
                        agreeTerms
                            ? "checkbox-marked"
                            : "checkbox-blank-outline"
                    }
                        size={hp(2.5)}
                        color={
                            agreeTerms
                                ? colors.gold
                                : colors.placeholder
                        } />
                    <Text style={styles.termsText}>Agree to </Text>
                    <TouchableOpacity onPress={() => {/* TODO: Navigate to Terms Screen */ }}>
                        <Text style={[styles.linkText, styles.termsLink]}>Terms & Conditions</Text>
                    </TouchableOpacity>
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
                    <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton} onPress={handleFacebookLogin}>
                    {/* @ts-ignore */}
                    <Image source={require('../../assets/images/facebook.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: wp(8),
        paddingTop: Platform.OS === 'android' ? hp(3) : hp(8),
        paddingBottom: hp(5),
        backgroundColor: colors.background.dark,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: hp(2),

    },
    logoImage: {
        width: wp(40),
        height: hp(6),
        marginBottom: hp(1),
    },
    title: {
        ...typography.heading1,
        textAlign: 'left',
        marginBottom: hp(1),
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(3),
        alignSelf: "flex-start"
    },
    subtitleText: {
        ...typography.description,
    },
    linkText: {
        ...typography.linkText,
    },
    formContainer: {
        marginBottom: hp(1),
    },
    nameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameInput: {
        width: '48%',
    },
    signupButton: {
        marginTop: hp(0),
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(1.5),
        alignSelf: 'flex-start',
    },
    termsText: {
        ...typography.description,
        marginLeft: wp(2),
    },
    termsLink: {
        ...typography.linkText,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: hp(3),
        marginTop: hp(1)
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.divider,
    },
    dividerText: {
        ...typography.subheading2,
        marginHorizontal: wp(4),
    },
    socialLoginContainer: {
        // Styles for social login section
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.gold,
        padding: hp(1.5),
        marginBottom: hp(2),
    },
    socialIcon: {
        width: wp(6),
        height: wp(6),
        marginRight: wp(3),
    },
    socialButtonText: {
        ...typography.buttonText,
    },
    errorMessage: {
        ...typography.errorText,
    },
    successMessage: {
        ...typography.successText,
        marginBottom: hp(1),
    },
});

export default SignupScreen;
