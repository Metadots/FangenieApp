import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    Platform,
    StatusBar,
    TextInput,
    Clipboard, // Import Clipboard
    Alert, // For feedback on copy
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Using MCI
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Assuming Header component exists
import Header from '../components/Header';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';


// Define MainTabParamList (or import from navigator types)
type MainTabParamList = {
    Home: undefined;
    Tickets: undefined;
    Notifications: undefined;
    Referral: undefined; // Renamed from Profile
    Favorites: undefined;
    Explore: undefined;
};

type ReferralScreenNavigationProp = BottomTabNavigationProp<
    MainTabParamList,
    'Referral'
>;

const ticketHistory = [
    { date: '14-09-2024', event: 'james@hey.com', cost: 'James Petter' },
    { date: '14-08-2024', event: 'alex@gmail.com', cost: 'Alex' },
    { date: '14-07-2024', event: 'newon@zus.com', cost: 'Newon' },
    { date: '14-06-2024', event: 'max@jola.com', cost: 'Max' },
    // Add more history items
];

const ReferralScreen: React.FC = () => {
    const navigation = useNavigation<ReferralScreenNavigationProp>();
    const [inviteEmail, setInviteEmail] = useState('');
    const inviteLink = 'fangenie.com/u/invite/7gbx233'; // Example invite link

    const copyToClipboard = () => {
        Clipboard.setString(inviteLink);
        Alert.alert('Copied!', 'Invite link copied to clipboard.'); // Simple feedback
    };

    const handleInviteViaEmail = () => {
        // TODO: Implement API call to send invite email
        console.log('Sending invite to:', inviteEmail);
        // Clear input or show success message
        setInviteEmail('');
        Alert.alert('Invite Sent', `Invite email sent to ${inviteEmail}`);
    };

    return (
        <View style={styles.outerContainer}>
            <StatusBar barStyle="light-content" backgroundColor="#190F20" />
            <Header onProfilePress={() => console.log('Profile Pressed')} profile={true} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >

                {/* Stats Section */}
                <View style={styles.topSectionContainer}>
                    <View style={styles.statsRow}>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Earnings</Text>
                            <Text style={styles.statValue}>$0.00</Text>
                            <Text style={styles.statPeriod}>Available for Withdraw</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={styles.statLabel}>Total Usage Count</Text>
                            <Text style={styles.statValueLarge}>341</Text>
                            <Text style={styles.statPeriod}>Code used by others</Text>
                        </View>
                    </View>

                    {/* Invite Link Section */}
                    <View style={styles.inviteLinkContainer}>
                        <Text style={styles.sectionTitle}>Invite Link</Text>
                        <View style={styles.linkBox}>
                            <Text style={styles.linkTextActual} numberOfLines={1}>{inviteLink}</Text>
                            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                                <Text style={styles.copyButtonText}>Copy</Text>
                                {/* @ts-ignore */}
                                <AntDesign name="addfile" size={15} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* QR Code & Email Invite Section */}
                <View style={styles.inviteMethodsContainer}>

                    <View style={styles.qrPlaceholder}>
                        <AntDesign name="qrcode" size={hp(15)} color="#FFF" />
                    </View>

                    <Text style={[styles.sectionTitle, styles.inviteViaEmailTitle]}>Invite via Email</Text>
                    <View style={styles.emailInviteBox}>
                        <TextInput
                            style={styles.emailInput}
                            placeholder="Email Address"
                            placeholderTextColor="#fff"
                            value={inviteEmail}
                            onChangeText={setInviteEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.inviteButton} onPress={handleInviteViaEmail}>
                            <Text style={styles.inviteButtonText}>Invite</Text>
                            {/* @ts-ignore */}
                            <AntDesign name="addfile" size={15} color="#FFF" />
                        </TouchableOpacity>
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
        paddingTop: Platform.OS === 'android' ? hp(1) : hp(6),
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: wp(5),
        paddingBottom: hp(12), // Space for tab bar
    },
    topSectionContainer: {
        backgroundColor: colors.background.discount,
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
    },
    statValue: {
        ...typography.heading2,
    },
    statValueLarge: {
        ...typography.heading1,
    },
    statPeriod: {
        ...typography.descriptionSmall,
    },
    inviteLinkContainer: {
        // Container for Invite Link section within the top box
    },
    sectionTitle: {
        ...typography.subheading1,
        marginBottom: hp(1),
    },
    linkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.discount,
        borderRadius: 10,
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        justifyContent: 'space-between',
    },
    linkTextActual: {
        ...typography.description,
        flex: 1,
        marginRight: wp(2),
    },
    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.button.primary,
        paddingVertical: hp(1),
        paddingHorizontal: wp(4),
        borderRadius: 8,
    },
    copyButtonText: {
        ...typography.buttonTextSmall,
        marginRight: wp(1.5),
    },
    inviteMethodsContainer: {
        backgroundColor: colors.background.discount,
        borderRadius: 15,
        padding: wp(4),
        marginBottom: hp(3),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gold,
    },
    qrContainer: {
        backgroundColor: colors.background.qr,
        borderRadius: 15,
        padding: wp(4),
        marginBottom: hp(2.5),

    },
    qrPlaceholder: {
        width: hp(15), // Match the size you'd give to QRCode
        height: hp(15),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.gold,
        marginBottom: hp(2),
        alignSelf: 'flex-start', borderRadius: 10
    },
    inviteViaEmailTitle: {
        alignSelf: 'flex-start',
    },
    emailInviteBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.input.background,
        borderRadius: 10,
        paddingLeft: wp(4),
        paddingRight: wp(2),
        paddingVertical: hp(0.5),
        marginTop: hp(0),
        width: '100%', // Make box full width
    },
    emailInput: {
        flex: 1,
        color: colors.input.text,
        fontSize: hp(1.4),
        paddingVertical: hp(1.2),
        marginRight: wp(2),
    },
    inviteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.button.primary,
        paddingVertical: hp(1.2),
        paddingHorizontal: wp(4),
        borderRadius: 8,
    },
    inviteButtonText: {
        ...typography.buttonTextSmall,
        marginRight: wp(1.5),
    },
    historyContainer: {
        // backgroundColor: '#3E2A5A', // Table doesn't have distinct background in image
        // borderRadius: 15,
        padding: wp(2),
        marginBottom: hp(2),
    },

    historyHeaderRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        paddingHorizontal: 10,
        marginBottom: hp(1.5),
        backgroundColor: colors.history.header.background,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 1,
        // overflow: 'hidden',
        borderColor: colors.gold,
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
        paddingHorizontal: wp(1), // Add padding for spacing
    },
    historyCostCol: {
        width: '25%',
        textAlign: 'right',
    },
    tableBottomDivider: {
        height: 1,
        backgroundColor: colors.history.divider,
        marginHorizontal: wp(2),
        marginTop: hp(1),
    },
});

export default ReferralScreen; 