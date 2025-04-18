import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const typography = StyleSheet.create({
    // Heading Styles
    heading1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: hp(3),
        lineHeight: hp(3.6),
        color: '#FFFFFF',
    },
    heading2: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2.5),
        lineHeight: hp(3),
        color: '#FFFFFF',
    },
    heading3: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(2),
        lineHeight: hp(2.4),
        color: '#FFFFFF',
    },

    // Subheading Styles
    subheading1: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: '#FFFFFF',
    },
    subheading2: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#FFFFFF',
    },

    // Button Text Styles
    buttonText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(2),
        lineHeight: hp(2.4),
        color: '#FFFFFF',
        textAlign: 'center',
    },
    buttonTextSmall: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: '#FFFFFF',
        textAlign: 'center',
    },

    // Input Text Styles
    inputLabel: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: '#FFFFFF',
    },
    inputText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#FFFFFF',
    },
    inputPlaceholder: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#A0A0A0',
    },

    // Description/Paragraph Styles
    description: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: '#FFFFFF',
    },
    descriptionSmall: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#FFFFFF',
    },

    // Link Text Styles
    linkText: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: hp(1.8),
        lineHeight: hp(2.2),
        color: '#FFD700', // Gold color
    },
    linkTextSmall: {
        fontFamily: 'Montserrat-Medium',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#FFD700', // Gold color
    },

    // Error/Success Message Styles
    errorText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#FF4444',
    },
    successText: {
        fontFamily: 'Montserrat-Regular',
        fontSize: hp(1.6),
        lineHeight: hp(2),
        color: '#00C851',
    },
}); 