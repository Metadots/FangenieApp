import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { IconButton } from 'react-native-paper';

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
            <IconButton
                icon="account"
                iconColor="#fff"
                size={24}
                onPress={onProfilePress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#1a1a1a',
    },
    logo: {
        height: 32,
        width: 120,
    },
});

export default Header; 