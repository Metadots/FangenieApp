import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { colors } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryButton = ({ title, onPress, style, textStyle }) => {
    return (
        <LinearGradient
            colors={['#F9AF47', '#CA8D38']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.button]}
        >
            <TouchableOpacity onPress={onPress}>
                <Text style={[styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.button.primary, // Base purple color
        paddingVertical: hp(1.8),
        borderRadius: 50,
        alignItems: 'center',
        width: "100%", // Default width, can be overridden by style prop
        alignSelf: 'center', // Center the button by default
        marginTop: hp(3), // Default margin top
    },
    text: {
        color: colors.button.text, // White text color
        fontSize: hp(2),
        fontWeight: 'bold',
    },
});

export default PrimaryButton; 