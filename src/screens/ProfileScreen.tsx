import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
} from 'react-native';
import CustomInput from '../components/CustomInput';

const ProfileScreen = () => {
    // State for input fields could be added here later
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            {/* Header Placeholder */}
            <View style={styles.header}>
                {/* Replace with actual logo */}
                <Text style={styles.logo}>FanGenie</Text>
                <View style={styles.headerIconPlaceholder} />
            </View>

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

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>

            {/* Password Change Section */}
            <Text style={styles.label}>Old Password</Text>
            <CustomInput
                label="Old Password"
                placeholder="Enter your Password"
                placeholderTextColor="#a0a0a0"
                secureTextEntry={!oldPasswordVisible}
            />

            <CustomInput
                label="Old Password"
                placeholder="Enter your Password"
                placeholderTextColor="#a0a0a0"
                secureTextEntry={!newPasswordVisible}
            />

            <CustomInput
                label="Confirm Password"
                placeholder="Enter your Password"
                placeholderTextColor="#a0a0a0"
                secureTextEntry={!confirmPasswordVisible}
            />


            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#190F20', // Dark purple background
    },
    contentContainer: {
        paddingHorizontal: 20,
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
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        // Add FanGenie logo styling/image replacement here
    },
    headerIconPlaceholder: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#d3d3d3', // Light gray placeholder
    },
    profilePicContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicPlaceholder: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#d3d3d3', // Light gray placeholder
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5, // Add some space between inputs
    },
    label: {
        color: '#fff',
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#353535', // Darker input background
        color: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 12,

        fontSize: 16,
        marginBottom: 15, // Add margin below single inputs
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3e325a',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    inputPassword: {
        flex: 1,
        color: '#fff',
        paddingVertical: 12,
        fontSize: 16,
    },
    eyeIcon: {
        color: '#a0a0a0',
        fontSize: 20, // Adjust size as needed
        paddingLeft: 10,
    },
    button: {
        backgroundColor: '#a259ff', // Vibrant purple button
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10, // Margin above buttons
        marginBottom: 25, // Margin below buttons
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen; 