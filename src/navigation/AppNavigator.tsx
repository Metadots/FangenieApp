import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/theme';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReferralScreen from '../screens/ReferralScreen';

import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/Auth/VerifyEmailScreen';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import TicketsScreen from '../screens/TicketsScreen';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import DetailsScreen from '../screens/Home/Details';
import { colors } from '../constants/colors';
import { userStore } from '../store';

const NotificationsScreen = () => <View />;
const FavoritesScreen = () => <View />;
const ExploreScreen = () => <View />;

const Stack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => (
    <MainTab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused }) => {
                let iconName = null;

                switch (route.name) {
                    case 'Home':
                        iconName = focused ?
                            <MaterialCommunityIcons name="calendar-outline" color={colors.gold} size={hp(3)} />
                            : <MaterialCommunityIcons name="calendar-outline" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Tickets':
                        iconName = focused ?
                            <Octicons name="credit-card" color={colors.gold} size={hp(3)} />
                            : <Octicons name="credit-card" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Notifications':
                        iconName = focused ?
                            <Feather name="bell" color={colors.gold} size={hp(3)} />
                            : <Feather name="bell" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Referral': // Adjust name if needed
                        iconName = focused ?
                            <Octicons name="people" color={colors.gold} size={hp(3)} />
                            : <Octicons name="people" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Favorites':
                        iconName = focused ?
                            <MaterialIcons name="thumb-up-off-alt" color={colors.gold} size={hp(3)} />
                            : <MaterialIcons name="thumb-up-off-alt" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Explore':
                        iconName = focused ?
                            <Feather name="star" color={colors.gold} size={hp(3)} />
                            : <Feather name="star" color={'#393939'} size={hp(2.5)} />;
                        break;
                }

                // @ts-ignore - Temporary fix for potential icon type issues
                return iconName;
            },
            tabBarActiveTintColor: colors.gold, // Active icon color
            tabBarInactiveTintColor: '#888', // Inactive icon color
        })}
    >
        <MainTab.Screen name="Home" component={HomeScreen} />
        <MainTab.Screen name="Tickets" component={TicketsScreen} />
        <MainTab.Screen name="Notifications" component={NotificationsScreen} />
        <MainTab.Screen name="Referral" component={ReferralScreen} />
        <MainTab.Screen name="Favorites" component={FavoritesScreen} />
        <MainTab.Screen name="Explore" component={ExploreScreen} />
    </MainTab.Navigator>
);

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </Stack.Navigator>
    );
}

export const AppNavigator = () => {

    const { loggedInUser, loading } = userStore();

    if (loading) {
        return null;
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    // initialRouteName="Auth"
                    screenOptions={{ headerShown: false }}
                >
                    {loggedInUser === null || loggedInUser.token === null ?
                        <Stack.Screen name="Auth" component={AuthStack} />
                        :
                        <>
                            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                            <Stack.Screen name="Profile" component={ProfileScreen} />
                            <Stack.Screen name="Details" component={DetailsScreen} />
                            <Stack.Screen name="Checkout" component={CheckoutScreen} />
                            <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
                        </>
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
};

// Styles for Tab Bar
const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute', // Make it float
        bottom: hp(3), // Position from bottom
        // left: wp(2.5),   // Position from left
        // right: wp(2.5),  // Position from right
        paddingTop: hp(0.5),
        height: hp(5.5), // Height of the tab bar
        borderRadius: hp(4), // Fully rounded corners
        backgroundColor: '#FFF', // White background
        borderTopWidth: 0, // Remove top border
        paddingBottom: 0, // Remove default padding
        // Shadow for elevation (iOS)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        // Elevation for shadow (Android)
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp(95),
        marginLeft: wp(2.5),
    },
}); 