import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    style?: object; // Optional additional style prop
    textStyle?: object; // Optional additional text style prop
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ title, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#CC7BFF', // Base purple color
        paddingVertical: hp(1.8),
        borderRadius: 25,
        alignItems: 'center',
        width: wp(80), // Default width, can be overridden by style prop
        alignSelf: 'center', // Center the button by default
        marginTop: hp(3), // Default margin top
    },
    text: {
        color: '#fff',
        fontSize: hp(2),
        fontWeight: 'bold',
    },
});

export default PrimaryButton; 