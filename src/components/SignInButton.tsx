import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';

interface SignInButtonProps {
    onPress: () => void;
}

export const SignInButton: React.FC<SignInButtonProps> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.signInButton} onPress={onPress}>
            <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: colors.button.primary,
        paddingHorizontal: 20,
        height: 32,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButtonText: {
        ...typography.buttonTextSmall,
        color: colors.button.text,
    }
});

export default SignInButton;    