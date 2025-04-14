import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SignInButton from './SignInButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface HeaderProps {
    onProfilePress?: () => void;
}

const Header = ({ onProfilePress }) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('./../assets/images/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            <SignInButton />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: 'transparent',
        width: wp(100),
        paddingHorizontal: 10,
    },
    logo: {
        height: 32,
        width: 120,
    },

});

export default Header; 