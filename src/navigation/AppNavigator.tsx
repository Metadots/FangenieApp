import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/Details';
import CheckoutScreen from '../screens/CheckoutScreen';
import PaymentSuccessScreen from '../screens/PaymentSuccessScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyEmailScreen from '../screens/VerifyEmailScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

// Define RootStackParamList including all screens
// Ensure this matches the definitions in individual screens
type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    VerifyEmail: { email: string };
    ResetPassword: { email: string; otp: string };
    Details: undefined; // Adjust params if needed
    Checkout: undefined;
    PaymentSuccess: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); // Add type here

export const AppNavigator = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home" // Reset initial route to Home (or Login if preferred)
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {/* App Screens First (Example) */}
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Details" component={DetailsScreen} />
                    <Stack.Screen name="Checkout" component={CheckoutScreen} />
                    <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} />

                    {/* Auth Screens */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                    <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
                    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}; 