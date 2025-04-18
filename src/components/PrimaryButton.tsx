import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
    loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style, textStyle, loading }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}>
            {loading ? (
                <ActivityIndicator size={'small'} color={colors.secondary} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.button.primary, // Base purple color
        paddingVertical: hp(1.8),
        borderRadius: 10,
        alignItems: 'center',
        width: "100%", // Default width, can be overridden by style prop
        alignSelf: 'center', // Center the button by default
        marginTop: hp(3), // Default margin top
    },
    text: {
        ...typography.buttonText,
        color: colors.button.text, // White text color
        fontSize: hp(2),
        fontWeight: 'bold',
    },
});

export default PrimaryButton; 