import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text, Card, useTheme, IconButton } from 'react-native-paper';

interface EventCardProps {
    title: string;
    date: string;
    venue: string;
    category: string;
    ticketsCount: number;
    imageUrl: string;
    onPress?: () => void;
}

const EventCard = ({
    title,
    date,
    venue,
    category,
    ticketsCount,
    imageUrl,
    onPress,
}) => {
    const theme = useTheme();

    return (
        <Card style={styles.card} onPress={onPress}>
            <ImageBackground
                source={{ uri: imageUrl }}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay}>
                    <View style={styles.dateContainer}>
                        <IconButton
                            icon="calendar"
                            iconColor="#fff"
                            size={16}
                            style={styles.icon}
                        />
                        <Text style={styles.dateText}>{date}</Text>
                        <View style={styles.ticketsContainer}>
                            <IconButton
                                icon="ticket-outline"
                                iconColor="#fff"
                                size={16}
                                style={styles.icon}
                            />
                            <Text style={styles.ticketsText}>{ticketsCount}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContent}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detail}>
                                <IconButton
                                    icon="music"
                                    iconColor="#fff"
                                    size={16}
                                    style={styles.icon}
                                />
                                <Text style={styles.detailText}>{category}</Text>
                            </View>
                            <View style={styles.detail}>
                                <IconButton
                                    icon="map-marker"
                                    iconColor="#fff"
                                    size={16}
                                    style={styles.icon}
                                />
                                <Text style={styles.detailText}>{venue}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 16,
        overflow: 'hidden',
    },
    imageBackground: {
        height: 200,
        justifyContent: 'space-between',
    },
    imageStyle: {
        borderRadius: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 16,
        justifyContent: 'space-between',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 8,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    dateText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 12,
    },
    ticketsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    ticketsText: {
        color: '#fff',
        marginLeft: 4,
        fontSize: 12,
    },
    bottomContent: {
        gap: 8,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 16,
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        color: '#fff',
        fontSize: 12,
    },
    icon: {
        margin: 0,
        padding: 0,
    },
});

export default EventCard; 