import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../components/Header';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';

// Assuming RootStackParamList and MainTabParamList are defined correctly in AppNavigator or a types file
// If MainTabParamList is defined in AppNavigator, import it or redefine it here
type MainTabParamList = {
    Home: undefined;
    Tickets: undefined;
    Notifications: undefined;
    Profile: undefined; // Or Community
    Favorites: undefined;
    Explore: undefined;
};

type TicketsScreenNavigationProp = BottomTabNavigationProp<
    MainTabParamList,
    'Tickets'
>;

// Mock data for the table
const ticketHistory = [
    { date: '14-09-2024', event: 'Cold Play Night', cost: '0.00$' },
    { date: '14-08-2024', event: 'Cold Play Night', cost: '0.00$' },
    { date: '14-07-2024', event: 'Cold Play Night', cost: '0.00$' },
    { date: '14-06-2024', event: 'Cold Play Night', cost: '0.00$' },
    // Add more history items
];

const TicketsScreen: React.FC = () => {
    const navigation = useNavigation<TicketsScreenNavigationProp>();

    return (
        <View style={styles.outerContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#190F20" />
            {/* Use your existing Header component */}
            <Header onProfilePress={() => console.log('Profile Pressed')} profile={true} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Optional Title if needed */}
                {/* <Text style={styles.screenTitle}>Recommendations</Text> */}

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Spent</Text>
                            <Text style={styles.statValue}>$0.00</Text>
                            <Text style={styles.statPeriod}>Today</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>This Month</Text>
                            <Text style={styles.statValue}>$0.00</Text>
                            <Text style={styles.statPeriod}>Sep 12 - Oct 11</Text>
                        </View>
                    </View>

                    <View>
                        <Text style={styles.sectionTitle}>Discounts</Text>
                        <View style={styles.discountBox}>
                            <Text style={styles.discountValue}>$ 150</Text>
                        </View>
                    </View>
                </View>

                {/* Discounts Section */}




                {/* Payment Method Section */}
                <View style={styles.paymentContainer}>
                    <View style={styles.paymentHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Payment Method</Text>
                            <Text style={styles.sectionSubtitle}>Change how you pay for your plan</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardInfoBox}>
                        {/* Replace with actual card component or image */}
                        <Text style={styles.visaText}>VISA</Text>
                        <View style={styles.cardDetails}>
                            <Text style={styles.cardText}>Visa ending with 4954</Text>
                            <Text style={styles.cardText}>Expiry 06/2028</Text>
                            <Text style={styles.cardText}>johndoe@domain.com</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.historyHeaderRow}>
                    <Text style={[styles.historyHeaderText, styles.historyDateCol]}>Date</Text>
                    <Text style={[styles.historyHeaderText, styles.historyEventCol]}>Event</Text>
                    <Text style={[styles.historyHeaderText, styles.historyCostCol]}>Cost</Text>
                </View>
                {/* Ticket History Table */}
                <View style={styles.historyContainer}>
                    {ticketHistory.map((item, index) => (
                        <View key={index} style={styles.historyRow}>
                            <Text style={[styles.historyCellText, styles.historyDateCol]}>{item.date}</Text>
                            <Text style={[styles.historyCellText, styles.historyEventCol]}>{item.event}</Text>
                            <Text style={[styles.historyCellText, styles.historyCostCol]}>{item.cost}</Text>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: colors.background.dark,
        paddingTop: Platform.OS === 'android' ? hp(1) : hp(6), // Adjust for status bar/notch
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: wp(5),
        paddingBottom: hp(12), // Ensure content doesn't hide behind custom tab bar
    },
    screenTitle: {
        ...typography.heading2,
        marginBottom: hp(2),
    },
    statsContainer: {
        // backgroundColor: colors.background.discount,
        borderRadius: 15,
        padding: wp(4),
        marginBottom: hp(3),
        borderWidth: 1,
        borderColor: colors.gold,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(3),
        width: "100%",
    },
    statBox: {
        backgroundColor: '#CC7BFF4D', // Darker purple for inner boxes
        borderRadius: 15,
        padding: wp(4),
        width: '48%',
        alignItems: 'flex-start',
        minHeight: hp(15), // Ensure consistent height
        justifyContent: 'space-between',

    },
    statLabel: {
        ...typography.subheading2,
        marginBottom: hp(0.5),
    },
    statValue: {
        ...typography.heading2,
        marginBottom: hp(0.5),
    },
    statPeriod: {
        ...typography.descriptionSmall,
    },
    discountContainer: {
        backgroundColor: '#CC7BFF4D',
        borderRadius: 15,
        padding: wp(4),
        marginBottom: hp(3),
        borderWidth: 1,
        borderColor: '#CC7BFF',
    },
    sectionTitle: {
        ...typography.subheading1,
        marginBottom: hp(1),
    },
    discountBox: {
        backgroundColor: colors.background.discount,
        borderRadius: 10,
        paddingVertical: hp(2),
        paddingHorizontal: wp(4),
        marginTop: hp(1),
    },
    discountValue: {
        ...typography.heading3,
    },
    paymentContainer: {
        backgroundColor: colors.background.discount,
        borderRadius: 15,
        padding: wp(4),
        marginBottom: hp(3),
        borderWidth: 1,
        borderColor: colors.gold,
    },
    paymentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2),
    },
    sectionSubtitle: {
        ...typography.description,
    },
    editButton: {
        backgroundColor: colors.card.background,
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gold,
    },
    editButtonText: {
        ...typography.buttonTextSmall,
    },
    cardInfoBox: {
        backgroundColor: colors.card.background,
        borderRadius: 15,
        padding: wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gold,
    },
    visaText: {
        color: colors.text.light,
        fontSize: hp(4),
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginRight: wp(5),
    },
    cardDetails: {
        flex: 1,
    },
    cardText: {
        ...typography.description,
    },
    historyContainer: {
        padding: wp(2),
        marginBottom: hp(3),
    },
    historyHeaderRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.history.divider,
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginBottom: hp(1.5),
        backgroundColor: colors.history.header.background,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        // overflow: 'hidden',
        borderColor: colors.history.header.border,
    },
    historyHeaderText: {
        ...typography.subheading2,
        fontWeight: 'bold',
    },
    historyRow: {
        flexDirection: 'row',
        marginBottom: hp(1.4),
    },
    historyCellText: {
        ...typography.description,
    },
    historyDateCol: {
        width: '30%',
    },
    historyEventCol: {
        width: '45%',
        paddingHorizontal: wp(1),
    },
    historyCostCol: {
        width: '25%',
        textAlign: 'right',
    },
});

export default TicketsScreen;
