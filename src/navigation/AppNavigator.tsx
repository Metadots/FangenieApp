import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/theme';
import { Platform, StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ReferralScreen from '../screens/ReferralScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/Details';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import TicketsScreen from '../screens/TicketsScreen';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import ProfileScreen from '../screens/ProfileScreen';
// Placeholder Screens for Tabs (Create these later)
// const TicketsScreen = () => <View />;
const NotificationsScreen = () => <View />;
const FavoritesScreen = () => <View />;
const ExploreScreen = () => <View />;

// Create Navigators
const Stack = createNativeStackNavigator(); // Single Root Stack
const MainTab = createBottomTabNavigator();

// Main Tab Navigator Component
const MainTabNavigator = () => (
    <MainTab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false, // Hide labels as per image
            tabBarStyle: styles.tabBar,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = null;

                switch (route.name) {
                    case 'Home':
                        iconName = focused ?
                            <MaterialCommunityIcons name="calendar-outline" color={'#A050F0'} size={hp(3)} />
                            : <MaterialCommunityIcons name="calendar-outline" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Tickets':
                        iconName = focused ?
                            <Octicons name="credit-card" color={'#A050F0'} size={hp(3)} />
                            : <Octicons name="credit-card" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Notifications':
                        iconName = focused ?
                            <Feather name="bell" color={'#A050F0'} size={hp(3)} />
                            : <Feather name="bell" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Referral': // Adjust name if needed
                        iconName = focused ?
                            <Octicons name="people" color={'#A050F0'} size={hp(3)} />
                            : <Octicons name="people" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Favorites':
                        iconName = focused ?
                            <MaterialIcons name="thumb-up-off-alt" color={'#A050F0'} size={hp(3)} />
                            : <MaterialIcons name="thumb-up-off-alt" color={'#393939'} size={hp(2.5)} />;
                        break;
                    case 'Explore':
                        iconName = focused ?
                            <Feather name="star" color={'#A050F0'} size={hp(3)} />
                            : <Feather name="star" color={'#393939'} size={hp(2.5)} />;
                        break;
                }

                // @ts-ignore - Temporary fix for potential icon type issues
                return iconName;
            },
            tabBarActiveTintColor: '#A050F0', // Active icon color
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

// Main App Navigator - Simplified
export const AppNavigator = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="MainTabs" // Start with Login (or MainTabs if preferred)
                    screenOptions={{ headerShown: false }}
                >
                    {/* Auth Screens */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />

                    {/* Main App Tabs (as a single screen) */}
                    <Stack.Screen name="MainTabs" component={MainTabNavigator} />
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                    {/* Other Screens */}
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Checkout" component={CheckoutScreen} />
                    <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />
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