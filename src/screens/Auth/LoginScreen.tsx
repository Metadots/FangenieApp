import React, { useState, useEffect, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using Material Community Icons
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import { useLogin } from '../../services/auth.service';
import { userStore } from '../../store';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const loginMutation = useLogin();
    const { setAuth } = userStore();

    useEffect(() => {
        GoogleSignin.configure({
            iosClientId: '557893898710-vgsbkclnjrsjecga59j842vo0lhuifb7.apps.googleusercontent.com',
        });
    }, []);

    const handleLogin = async () => {
        const cleanEmail = email.trim();
        const cleanPassword = password.trim();

        setErrorMessage('');
        setSuccessMessage('');

        if (!cleanEmail || !cleanPassword) {
            setErrorMessage('All fields are required.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(cleanEmail)) {
            setErrorMessage('Invalid email format.');
            return;
        }

        //@ts-ignore
        loginMutation.mutate({
            email: cleanEmail,
            password: cleanPassword,
        }, {
            onSuccess: (data) => {
                setSuccessMessage('Login successful! Redirecting...');
                setAuth(data);
                setTimeout(() => {
                    //@ts-ignore
                    navigation.navigate('MainTabs');
                }, 2000);
            },
            onError: (error: any) => {
                const errorMsg = error?.message || 'An unknown error occurred. Please try again.';
                if (errorMsg.includes('401')) {
                    setErrorMessage('Account not found. Please create a new one.');
                } else {
                    setErrorMessage(errorMsg);
                }
            },
        });
    };


    const handleForgotPassword = () => {
        console.log('Forgot Password pressed');
        //@ts-ignore
        navigation.navigate('ForgotPassword');
    };

    const handleGoogleLogin = async () => {
        if (isGoogleLoading) return; // Prevent multiple sign-in attempts

        setIsGoogleLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            if (!userInfo?.data?.user) {
                throw new Error('Failed to get user information from Google');
            }

            const user = {
                firstName: userInfo.data.user.givenName || '',
                lastName: userInfo.data.user.familyName || '',
                email: userInfo.data.user.email || '',
                accountType: 'google',
                socialID: userInfo.data.user.id || '',
                profileImage: userInfo.data.user.photo || '',
            };

            // TODO: Implement your social sign-up logic here
            // const response = await socialSignUp(user);
            // setAuth(response);

        } catch (error: any) {
            console.log('Google Sign-In Error:', error);

            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User cancelled the sign-in flow
                setErrorMessage('Sign-in was cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Sign-in is in progress already
                setErrorMessage('Sign-in is already in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play services not available or outdated
                setErrorMessage('Google Play Services are not available or outdated');
            } else {
                // Some other error happened
                setErrorMessage('Google Sign-In failed. Please try again.');
            }

            // Clean up the sign-in state
            try {
                await GoogleSignin.signOut();
            } catch (signOutError) {
                console.log('Error signing out:', signOutError);
            }
        } finally {
            setIsGoogleLoading(false);
        }
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
                <Image
                    source={require('../../assets/images/Logo.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>

            <Text style={styles.title}>Login to your account</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subtitleText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() =>
                    //@ts-ignore
                    navigation.navigate('Signup')}>
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

                <TouchableOpacity
                    onPress={handleForgotPassword}
                    style={styles.forgotPasswordContainer}>
                    <Text style={styles.linkText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.errorContainer} >
                    {errorMessage ? (
                        <Text style={styles.errorMessage}>{errorMessage}</Text>
                    ) : null}
                    {successMessage ? (
                        <Text style={styles.successMessage}>{successMessage}</Text>
                    ) : null}
                </View>

                <PrimaryButton
                    title="Login"
                    onPress={handleLogin}
                    style={styles.loginButton}
                    textStyle={undefined}
                    loading={loginMutation.isPending}
                />

                <TouchableOpacity
                    onPress={() => setKeepLoggedIn(!keepLoggedIn)}
                    style={styles.keepLoggedInContainer}>
                    {/* @ts-ignore */}
                    <Icon
                        name={
                            keepLoggedIn
                                ? 'checkbox-marked'
                                : 'checkbox-blank-outline'
                        }
                        size={hp(2.5)}
                        color={keepLoggedIn
                            ? colors.gold
                            : colors.placeholder
                        } />
                    <Text style={styles.keepLoggedInText}>Keep me <Text style={{ color: colors.gold }} >Logged in</Text></Text>
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
                <TouchableOpacity
                    style={[styles.socialButton, isGoogleLoading && styles.disabledButton]}
                    onPress={handleGoogleLogin}
                    disabled={isGoogleLoading}>
                    <Image source={require('../../assets/images/google.png')} style={styles.socialIcon} />
                    {isGoogleLoading ? (
                        <ActivityIndicator size="small" color={colors.gold} />
                    ) : (
                        <Text style={styles.socialButtonText}>Google</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialButton}
                    onPress={handleFacebookLogin}>
                    {/* @ts-ignore */}
                    <Image source={require('../../assets/images/facebook.png')} style={styles.socialIcon} />
                    <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
            </View>

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
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: hp(4),
    },
    logoImage: {
        width: wp(40),
        height: hp(6),
        marginBottom: hp(2),
    },
    title: {
        color: colors.text.light,
        fontSize: hp(3),
        textAlign: 'left',
        marginBottom: hp(1),
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(4),
        alignSelf: 'flex-start',
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
        marginBottom: hp(2),
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginTop: -hp(1),
        marginBottom: hp(3),
    },
    loginButton: {
        marginTop: hp(1),
    },
    keepLoggedInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(2),
        alignSelf: 'flex-start',
    },
    keepLoggedInText: {
        color: colors.text.light,
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
        backgroundColor: colors.divider,
    },
    dividerText: {
        color: colors.text.light,
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
        color: colors.text.light,
        fontSize: hp(1.8),
        fontWeight: 'bold',
    },
    errorMessage: {
        color: colors.status.error,
        marginBottom: hp(0),
    },
    successMessage: {
        color: colors.gold,
        marginBottom: hp(2),
    },
    errorContainer: {
        width: '100%',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
});

export default LoginScreen;