import React from 'react';
import { View, StyleSheet, ScrollView, Platform, Touchable, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import EventCard from '../../components/EventCard';
import Header from '../../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/colors';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('Acoustic Sessions');
    const navigation = useNavigation();

    const events = [
        {
            title: 'Golden\nHour Party',
            date: '10:00 PM Fri 29 Mar, 2025',
            venue: 'New York',
            category: 'Cold Play',
            ticketsCount: 190,
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
        },
        {
            title: 'Golden\nHour Party',
            date: '10:00 PM Fri 29 Mar, 2025',
            venue: 'New York',
            category: 'Cold Play',
            ticketsCount: 190,
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
        },
        {
            title: 'Golden\nHour Party',
            date: '10:00 PM Fri 29 Mar, 2025',
            venue: 'New York',
            category: 'Cold Play',
            ticketsCount: 190,
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
        },
    ];

    return (
        <View style={styles.container}>
            <Header onProfilePress={() => console.log('Profile pressed')} />
            <View style={styles.categoryContainer}>
                <View style={styles.categoryChip}>
                    <Text>Acoustic Sessions</Text>
                    <Feather name="chevron-down" size={16} color="white" />
                </View>
                <TouchableOpacity >
                    <Ionicons name="options-outline" size={16} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <ScrollView>
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            {...event}
                            onPress={() => navigation.navigate('Details')}
                        />
                    ))}
                </ScrollView>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(1),
        backgroundColor: colors.background.dark,
    },
    categoryContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    categoryChip: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
    },
    content: {
        flex: 1,
        paddingBottom: hp(10),
    },
});

export default HomeScreen; 