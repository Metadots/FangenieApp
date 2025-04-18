import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Text, Card, useTheme, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { typography } from '../constants/globalStyles';
import { colors } from '../constants/colors';

interface EventCardProps {
    title: string;
    date: string;
    venue: string;
    category: string;
    ticketsCount: number;
    imageUrl: string;
    onPress?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
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
                blurRadius={1}
                source={require('../assets/images/dummyConcert.png')}
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
            >
                <View style={styles.overlay}>
                    <View style={styles.dateContainer}>
                        <View style={styles.dateIconContainer}>
                            <Feather name="calendar" size={16} color={colors.text.muted} />
                            <Text style={styles.dateText}>{date}</Text>
                        </View>

                        <View style={styles.ticketsContainer}>
                            <Image source={require('../assets/images/ticket-white.png')}
                                style={styles.ticketIcon} />

                            <Text style={styles.ticketsText}>{ticketsCount}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContent}>
                        <Text style={styles.title}>{title}</Text>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detail}>
                                <Image source={require('../assets/images/mic-white.png')}
                                    style={{ height: 18, width: 18, marginRight: 5 }} />
                                <Text style={styles.detailText}>{category}</Text>
                            </View>
                            <View style={styles.detail}>
                                <EvilIcons
                                    name="location"
                                    size={18}
                                    color={colors.text.light}
                                    style={{
                                        marginRight: 5
                                    }} />
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
    },
    imageBackground: {
        height: 350,
        justifyContent: 'space-between',
        borderRadius: 16,
    },
    imageStyle: {
        borderRadius: 16,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 16,
        justifyContent: 'space-between',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        padding: 8,
        borderRadius: 30,
        width: '100%',
    },
    dateText: {
        ...typography.descriptionSmall,
        color: colors.text.muted,
        marginLeft: 8,
    },
    ticketIcon: {
        width: 20,
        height: 20,
        marginRight: 4,
    },
    dateIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.light,
        height: "100%",
        width: "65%",
        justifyContent: "center",
        borderRadius: 30,
    },
    ticketsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30
    },
    ticketsText: {
        ...typography.descriptionSmall,
        color: colors.text.light,
    },
    bottomContent: {
        gap: 8,
    },
    title: {
        ...typography.heading2,
        color: colors.text.light,
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        height: 22
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        ...typography.descriptionSmall,
        color: colors.text.light,
    },
    icon: {
        margin: 0,
        padding: 0,
    },
});

export default EventCard; 