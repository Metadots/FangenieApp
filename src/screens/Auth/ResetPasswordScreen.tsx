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
type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ResetPassword'
>;

// Type for the route prop
type ResetPasswordScreenRouteProp = RouteProp<
    RootStackParamList,
    'ResetPassword'
>;

const ResetPasswordScreen: React.FC = () => {
    const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
    const route = useRoute<ResetPasswordScreenRouteProp>();
    const { email, otp } = route.params; // Get email and OTP passed from VerifyEmail

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleResetPassword = () => {
        // setError(null); // Clear previous errors
        // if (password !== confirmPassword) {
        //     setError('Passwords do not match.');
        //     return;
        // }
        // if (password.length < 6) { // Example validation
        //     setError('Password must be at least 6 characters long.');
        //     return;
        // }

        console.log('Resetting password for:', email, 'with OTP:', otp, 'New password:', password);

        navigation.navigate('Login');
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
                {/* Display general errors or API errors if needed */}
                {/* {error && !error.includes('match') && !error.includes('length') && <Text style={styles.generalErrorText}>{error}</Text>} */}

                <PrimaryButton title="Reset Password" onPress={handleResetPassword} style={styles.actionButton} />
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
    // Optional style for general errors
    // generalErrorText: {
    //     color: colors.status.error,
    //     fontSize: hp(1.6),
    //     textAlign: 'center',
    //     marginBottom: hp(2),
    // }
});

export default ResetPasswordScreen; 