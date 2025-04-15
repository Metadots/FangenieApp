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


const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSendEmail = () => {
        // TODO: Implement API call to send password reset email
        console.log('Sending password reset email to:', email);
        // On success, navigate to VerifyEmail screen, passing the email
        navigation.navigate('VerifyEmail', { email });
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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

                    <PrimaryButton title="Send Email" onPress={handleSendEmail} style={styles.actionButton} />
                </View>

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
});

export default ForgotPasswordScreen; 