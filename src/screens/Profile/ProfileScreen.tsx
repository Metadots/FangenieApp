import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Platform,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { useUpdatePassword } from '../../services/settings.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userStore } from '../../store';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/globalStyles';

const ProfileScreen = () => {
    const navigation = useNavigation();

    // State for input fields could be added here later
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] = useState(false);
    const updatePasswordMutation = useUpdatePassword();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');



    const handleUpdatePaswsword = () => {

        if (newPassword.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return;
        }
        //@ts-ignore
        updatePasswordMutation.mutate({
            currentPassword, newPassword,
        }, {
            onSuccess: (data) => {
                console.log(data);
            },
            onError: (error) => {
                console.log(error);
            },
        });

    };

    return (
        <View style={styles.container} >
            <ScrollView contentContainerStyle={styles.contentContainer}>

                <Header onProfilePress={() => { }} profile={3} logout={true} />
                <View style={styles.mainContent}>

                    {/* Profile Picture Placeholder */}
                    <View style={styles.profilePicContainer}>
                        <View style={styles.profilePicPlaceholder} />
                    </View>

                    {/* User Info Section */}
                    <View style={styles.nameContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>First Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="John"
                                placeholderTextColor="#a0a0a0"
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Last Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Doe"
                                placeholderTextColor="#a0a0a0"
                            />
                        </View>
                    </View>

                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@domain.com"
                        placeholderTextColor="#a0a0a0"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <PrimaryButton
                        title="Update"
                        onPress={() => { }}
                        style={undefined}
                        textStyle={undefined}
                        loading={undefined}
                    />

                    <View style={{ height: hp(5) }} />

                    <CustomInput
                        label="Old Password"
                        placeholder="Enter your Password"
                        placeholderTextColor="#a0a0a0"
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        onFocus={() => setErrorMessage('')}
                        secureTextEntry={!currentPasswordVisible}
                    />

                    <CustomInput
                        label="New Password"
                        placeholder="Enter your Password"
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        onFocus={() => setErrorMessage('')}
                        secureTextEntry={!newPasswordVisible}
                    />

                    <CustomInput
                        label="Confirm New Password"
                        placeholder="Enter your Password"
                        placeholderTextColor="#a0a0a0"
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        onFocus={() => setErrorMessage('')}
                        secureTextEntry={!confirmNewPasswordVisible}
                    />

                    <PrimaryButton
                        title="Change Password"
                        onPress={handleUpdatePaswsword}
                        style={undefined}
                        textStyle={undefined}
                        loading={updatePasswordMutation.isPending}
                    />

                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(1),
        backgroundColor: colors.background.dark,
    },
    contentContainer: {
        width: "100%",
        alignSelf: "center",
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        marginBottom: 20,
    },
    logo: {
        ...typography.heading2,
        color: colors.text.light,
    },
    headerIconPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.background.primary,
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.background.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroup: {
        width: "48%",
    },
    label: {
        ...typography.subheading2,
        color: colors.text.light,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.background.primary,
        paddingHorizontal: 15,
        paddingVertical: 12,
        ...typography.description,
        marginBottom: 15,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.primary,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputPassword: {
        flex: 1,
        paddingVertical: 12,
        ...typography.description,
    },
    eyeIcon: {
        color: colors.text.secondary,
        fontSize: 20,
        paddingLeft: 10,
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 25,
    },
    buttonText: {
        ...typography.buttonText,
        color: colors.text.light,
    },
    mainContent: {
        width: '90%',
        alignSelf: 'center',
        marginTop: hp(5),
    },
});

export default ProfileScreen;


