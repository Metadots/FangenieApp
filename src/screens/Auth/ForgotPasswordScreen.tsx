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
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../constants/colors';
import { useForgotPassword } from '../../services/auth.service';


const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const forgotPasswordMutation = useForgotPassword();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleSendEmail = () => {
        const cleanedEmail = email.trim();
        if (cleanedEmail === '') {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
        forgotPasswordMutation.mutate({ email: cleanedEmail }, {
            onSuccess: (data) => {
                console.log(data);
                setSuccessMessage('Email sent successfully. Please check your inbox.');
                setErrorMessage('');
                setEmail('');
                navigation.navigate('VerifyEmail', { email: cleanedEmail });
            },
            onError: (error) => {
                console.log(error);
                setErrorMessage(error.message);
                setSuccessMessage('');
            },
        });
    };

    return (
        <View style={styles.contentContainer}>
            <StatusBar barStyle="light-content" backgroundColor={colors.background.dark} />
            <View style={{ marginTop: hp(15) }}>
                {/* Header/Logo */}
                <View style={styles.headerContainer}>
                    <Image
                        source={require('../../assets/images/Logo.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                <Text style={styles.title}>Forgot Password</Text>
                <View style={styles.subtitleContainer}>
                    <Text style={styles.subtitleText}>Back to </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.linkText}>Login</Text>
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
                        textContentType="emailAddress"
                    />
                    <View style={{ width: '100%', alignItems: 'center' }} >
                        {errorMessage ? (
                            <Text style={styles.errorMessage}>{errorMessage}</Text>
                        ) : null}
                        {successMessage ? (
                            <Text style={styles.successMessage}>{successMessage}</Text>
                        ) : null}
                    </View>
                    <PrimaryButton title="Send Email" onPress={handleSendEmail} style={styles.actionButton} />
                </View>

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
        paddingTop: Platform.OS === 'android' ? hp(2) : hp(8),
        paddingBottom: hp(5),
        backgroundColor: colors.background.dark,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: hp(6),
    },
    logoImage: {
        width: wp(40),
        height: hp(6),
    },
    title: {
        color: colors.text.light,
        fontSize: hp(3),
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: hp(1),
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
    formContainer: {
        // Container for the input and button
    },
    actionButton: {
        marginTop: hp(3),
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

export default ForgotPasswordScreen; 