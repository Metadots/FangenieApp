import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import EventCard from '../components/EventCard';
import Header from '../components/Header';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = React.useState('Acoustic Sessions');

    const events = [
        {
            title: 'Golden Hour Party',
            date: '10:00 PM Fri 29 Mar, 2025',
            venue: 'New York',
            category: 'Cold Play',
            ticketsCount: 190,
            imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
        },
        {
            title: 'Golden Hour Party',
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
                <Chip
                    selected={selectedCategory === 'Acoustic Sessions'}
                    onPress={() => setSelectedCategory('Acoustic Sessions')}
                    style={styles.categoryChip}
                >
                    Acoustic Sessions
                </Chip>
            </View>
            <ScrollView style={styles.content}>
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        {...event}
                        onPress={() => console.log('Event pressed:', event.title)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    categoryContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    categoryChip: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignSelf: 'flex-start',
    },
    content: {
        flex: 1,
    },
});

export default HomeScreen; 