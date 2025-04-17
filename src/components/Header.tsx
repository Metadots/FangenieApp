import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import SignInButton from './SignInButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { userStore } from '../store';


const Header = ({ onProfilePress, profile, logout }) => {

    const loggedInUser = userStore();
    const { purgeAuth } = userStore();
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image
                source={require('./../assets/images/Logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            {logout &&
                <TouchableOpacity onPress={() => { purgeAuth(); }} >
                    <MaterialIcons name='logout' color={'white'} size={24} />
                </TouchableOpacity>
            }
            {profile === 3 ?
                <></>
                : profile ?
                    <TouchableOpacity style={styles.profileIcon} onPress={() => navigation.navigate('Profile')}>
                        <MaterialIcons name="person" size={24} color="white" />
                    </TouchableOpacity>
                    :
                    !loggedInUser && <SignInButton
                        onPress={() => navigation.navigate('Login')}
                    />
            }
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
    profileIcon: {
        backgroundColor: '#CC7BFF4D',
        borderRadius: 20,
        padding: 5,
    }

});

export default Header; 