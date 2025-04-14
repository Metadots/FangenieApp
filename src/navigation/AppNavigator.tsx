import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../constants/theme';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/Details';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                    />
                    <Stack.Screen
                        name="Details"
                        component={DetailsScreen}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}; 