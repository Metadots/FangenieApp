import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Platform, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'; // <-- Import type
import type { RouteProp } from '@react-navigation/native'; // <-- Import type
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // <-- Import Icon
import Header from '../../components/Header';
import { StatusBar } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../constants/colors';



const DetailsScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();

    const event = {
        title: 'Golden Hour',
        artist: 'Coldplay',
        date: new Date(),
        location: 'New York',
        attendees: 190,
        price: 350,
        description: "Step Into A World Where Music And Atmosphere Become One With Coldplay's Golden Hour Party! An Event Designed To Mesmerize And Captivate, The Golden Hour Party Promises An Evening Filled With The Soulful Melodies And Vibrant Energy That Coldplay Is Renowned For.",
        imageUrl: 'https://via.placeholder.com/400x250',
        artistImages: [
            require('../../assets/images/image.png'),
            require('../../assets/images/image-1.png'),
            require('../../assets/images/image-2.png'),
            require('../../assets/images/image-3.png'),
            require('../../assets/images/image-4.png'),
        ],
    };

    const calculateTimeLeft = () => {
        const difference = +event.date - +new Date();
        let timeLeft = {
            days: 21,
            hours: 19,
            minutes: 45,
            seconds: 20,
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const timeLeft = calculateTimeLeft();

    const formatDate = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        }) + ' ' + date.toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const handleCheckout = () => {
        //@ts-ignore
        navigation.navigate('Checkout');
    };

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor={"#190F20"} />
            <ScrollView style={styles.scrollViewContainer}>

                <ImageBackground
                    blurRadius={3}
                    style={styles.header}
                    source={{
                        uri: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop"
                    }}
                >
                    <Header onProfilePress={() => { }} profile={undefined} />

                    <View style={{ alignSelf: 'flex-start', padding: 10 }}>
                        <Text style={styles.eventTitle}>{event.title}</Text>
                        <Text style={styles.eventTitleHighlight}>Party</Text>
                    </View>

                    <View style={{ marginTop: 15, alignSelf: 'flex-start', paddingLeft: 15 }}>

                        <View style={styles.dateChip}>

                            <Feather name="calendar" size={16} color="grey" style={styles.iconStyle} />
                            <Text style={styles.dateChipText}>{formatDate(event.date)}</Text>
                        </View>

                        <View style={styles.infoRow}>
                            <View style={styles.infoItem}>
                                <Image source={require('../../assets/images/ticket-white.png')} style={{ height: 18, width: 18, marginRight: 5 }} />
                                <Text style={styles.infoText}>{event.attendees}</Text>
                            </View>
                            <View style={styles.infoItem}>
                                <Image source={require('../../assets/images/mic-white.png')} style={{ height: 18, width: 18, marginRight: 5 }} />
                                <Text style={styles.infoText}>{event.artist}</Text>
                            </View>
                            <View style={styles.infoItem}>

                                <Feather name="map-pin" size={16} color="#eee" style={styles.iconStyle} />
                                <Text style={styles.infoText}>{event.location}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.countdownContainer}>

                        <View style={styles.timeBox}>
                            <Text style={styles.timeValue}>{timeLeft.days}</Text>
                            <Text style={styles.timeUnit}>Days</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeValue}>{timeLeft.hours}</Text>
                            <Text style={styles.timeUnit}>Hours</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeValue}>{timeLeft.minutes}</Text>
                            <Text style={styles.timeUnit}>Mins</Text>
                        </View>
                        <Text style={styles.colon}>:</Text>
                        <View style={styles.timeBox}>
                            <Text style={styles.timeValue}>{timeLeft.seconds}</Text>
                            <Text style={styles.timeUnit}>Secs</Text>
                        </View>
                    </View>


                    <Text style={styles.startingPrice}>{event.price}$/Starting From</Text>



                    <Text style={styles.startingPrice}>{event.price}$/Starting From</Text>

                </ImageBackground>


                <View style={styles.contentArea}>


                    <View style={styles.artistImageContainer}>
                        {event.artistImages.map((imgUrl, index) => (
                            <Image key={index} source={imgUrl} style={[styles.artistImage,
                            {
                                zIndex: index == 2 ? 10 : index == 3 ? 5 : 0,
                                marginHorizontal: -15,
                                marginTop: index == 2 ? -30 : index == 1 ? -10 : index == 3 ? -10 : index == 0 ? 30 : 30,
                                transform: [{
                                    rotate: index == 0 ? '-15deg'
                                        : index == 4 ? '15deg'
                                            : index == 1 ? '-10deg'
                                                : index == 3 ? '10deg'
                                                    : '0deg'


                                }],
                            }]} />
                        ))}

                    </View>
                    <Text style={styles.sectionTitle}>Performing<Text style={[{ color: colors.gold }]}> Artist</Text></Text>

                    <View style={{ alignSelf: 'flex-start', marginTop: hp(3), marginBottom: hp(2) }}>
                        <Text style={styles.descriptionTitle}>{event.title} <Text style={styles.descriptionSubtitle}>Party</Text></Text>
                        <Text style={styles.descriptionSubtitle}><Text style={styles.descriptionTitle}>By</Text> {event.artist}</Text>
                    </View>
                    {/* Event Description */}
                    <Text style={styles.descriptionText}>
                        Step into a world where music and atmosphere become one with Coldplay's Golden Hour Party! An event designed to mesmerize and captivate, the Golden Hour Party promises an evening filled with the soulful melodies and vibrant energy that Coldplay is renowned for.
                    </Text>
                    {/* Add more sections like venue details, tickets, etc. */}
                    <Text style={styles.descriptionText}>
                        As the sun begins to dip below the horizon, painting the sky with hues of gold and amber, the stage comes alive with Coldplay's electrifying performance. Imagine the mesmerizing glow of twilight blending seamlessly with the band's iconic tunes, as shimmering lights and immersive visuals create a dreamlike setting that will leave you breathless.
                        This is not just a concert – it's an experience where emotions soar and memories are made. Feel the rush of adrenaline as Coldplay performs their biggest hits, from the anthemic "Viva La Vida" to the ethereal "Yellow" and the uplifting "A Sky Full of Stars." The band's signature fusion of rock, pop, and atmospheric melodies will keep your heart pounding and your soul singing.
                    </Text>
                    <Text style={styles.descriptionText}>
                        Join thousands of fans in a celebration of music and connection as Coldplay takes you on a journey through their timeless discography, including tracks from their latest album that explore love, loss, hope, and triumph. With captivating visuals, dynamic light shows, and a passionate performance that transcends ordinary concerts, the Golden Hour Party will be a truly transformative experience.
                    </Text>
                    <Text style={styles.descriptionText}>
                        Whether you're a devoted fan or new to Coldplay's world, this event offers something for everyone – a celebration of life, light, and love wrapped in an evening of unforgettable music. Come as you are, sing along, and let the Golden Hour Party become a cherished memory you'll carry with you forever.
                    </Text>


                    <View style={{
                        marginTop: hp(3), marginBottom: hp(2), zIndex: 10,
                        width: wp(100),
                    }}>
                        <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <Image source={require('../../assets/images/reel1.png')} style={{ height: hp(35), width: wp(45) }} />
                            <Image source={require('../../assets/images/reel2.png')} style={{ height: hp(35), width: wp(45) }} />
                            <Image source={require('../../assets/images/reel1.png')} style={{ height: hp(35), width: wp(45) }} />
                            <View style={{ width: wp(10) }} />
                        </ScrollView>
                    </View>

                    <View style={{ alignSelf: 'center', marginTop: hp(3), marginBottom: hp(6) }}>
                        <Text style={styles.sectionTitle}>Event <Text style={{ color: colors.gold }}>Schedule</Text></Text>
                    </View>

                    <View style={styles.scheduleContainer}>
                        {/* Timeline item 1 */}
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineCircle} >
                                <Text style={styles.timelineNumber}>1</Text>
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Gates Open – 4:30 PM</Text>
                                <Text style={styles.timelineDescription}>
                                    Start arriving early to soak in the atmosphere, grab your favorite merch, enjoy food stalls, and secure the best spot for the evening.
                                </Text>
                            </View>
                        </View>

                        {/* Timeline item 2 */}
                        <View style={[styles.timelineItem, styles.timelineItemRight]}>
                            <View style={styles.timelineCircle}>
                                <Text style={styles.timelineNumber}>2</Text>
                            </View>
                            <View style={[styles.timelineContent, styles.timelineContentRight]}>
                                <Text style={[styles.timelineTitle, styles.textRight]}>Pre-Show Vibes – 5:00 PM</Text>
                                <Text style={[styles.timelineDescription, styles.textRight]}>
                                    Live DJ sets, ambient lighting, and interactive booths to get you in the mood. A great time to chill, connect with other fans, and take photos.
                                </Text>
                            </View>
                        </View>

                        {/* Timeline item 3 */}
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineCircle}>
                                <Text style={styles.timelineNumber}>3</Text>
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Opening Act – 6:00 PM</Text>
                                <Text style={styles.timelineDescription}>
                                    A surprise guest artist will take the stage to warm up the crowd with soulful tunes and energetic beats before Coldplay begins.
                                </Text>
                            </View>
                        </View>

                        {/* Timeline item 4 */}
                        <View style={[styles.timelineItem, styles.timelineItemRight]}>
                            <View style={styles.timelineCircle}>
                                <Text style={styles.timelineNumber}>4</Text>
                            </View>
                            <View style={[styles.timelineContent, styles.timelineContentRight]}>
                                <Text style={[styles.timelineTitle, styles.textRight]}>Golden Hour Begins – 7:00 PM</Text>
                                <Text style={[styles.timelineDescription, styles.textRight]}>
                                    As the sun sets, Coldplay makes their grand entrance. This magical moment kicks off the main performance in perfect harmony with the evening sky.
                                </Text>
                            </View>
                        </View>

                        {/* Timeline item 5 */}
                        <View style={styles.timelineItem}>
                            <View
                                // Bottom-right
                                style={styles.timelineCircle}
                            >
                                <Text style={styles.timelineNumber}>5</Text>
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Main Performance – 7:15 PM to 9:00 PM</Text>
                                <Text style={styles.timelineDescription}>
                                    A breathtaking journey through Coldplay's greatest hits and latest tracks, paired with stunning visuals, lights, and crowd engagement moments.
                                </Text>
                            </View>
                        </View>

                        {/* Timeline item 6 */}
                        <View style={[styles.timelineItem, styles.timelineItemRight]}>
                            <View style={styles.timelineCircle}>
                                <Text style={styles.timelineNumber}>6</Text>
                            </View>
                            <View style={[styles.timelineContent, styles.timelineContentRight]}>
                                <Text style={[styles.timelineTitle, styles.textRight]}>Encore + Crowd Moments – 9:00 PM</Text>
                                <Text style={[styles.timelineDescription, styles.textRight]}>
                                    The band returns for an encore featuring fan-favorite anthems and a surprise acoustic performance to connect deeply with the audience.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            width: 5, height: '100%',
                            position: "absolute", backgroundColor: "grey", left: wp(44.5), top: -10,
                            zIndex: 1
                        }} ></View>
                        {/* Timeline item 7 */}
                        <View style={styles.timelineItem}>
                            <View style={styles.timelineCircle}>
                                <Text style={styles.timelineNumber}>7</Text>
                            </View>
                            <View style={styles.timelineContent}>
                                <Text style={styles.timelineTitle}>Closing Ceremony – 9:30 PM</Text>
                                <Text style={styles.timelineDescription}>
                                    A heartfelt thank you from the band, a final light show, and a golden confetti send-off to wrap up an unforgettable night.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Seating Map and Ticket Categories */}
                    <View style={{ marginTop: hp(5), marginBottom: hp(3) }}>

                        <View style={styles.seatingMapContainer}>
                            {/* Stage Label */}

                            {/* Seating Map Grid - More detailed structure */}
                            <View style={styles.seatingGridContainer}>
                                {/* Top VIP Sections (Orange) */}
                                <View style={styles.gridRowTop}>
                                    <View style={styles.vipSection}>
                                        {Array(5).fill(0).map((_, r) =>
                                            <View key={`vip-l-r-${r}`} style={styles.seatRowH}>
                                                {Array(20).fill(0).map((_, s) => <View key={`vip-l-s-${s}`} style={[styles.seat, styles.seatVip]} />)}
                                            </View>
                                        )}
                                    </View>
                                    <View
                                        // Bottom-right
                                        style={styles.stageLabel}
                                    >
                                        <Text style={styles.stageLabelText}>Stage</Text>
                                    </View>

                                    <View style={styles.vipSection}>
                                        {Array(5).fill(0).map((_, r) =>
                                            <View key={`vip-r-r-${r}`} style={styles.seatRowH}>
                                                {Array(20).fill(0).map((_, s) => <View key={`vip-r-s-${s}`} style={[styles.seat, styles.seatVip]} />)}
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {/* Middle Sections */}
                                <View style={styles.gridRowMiddle}>
                                    {/* Left Premium (Blue) */}
                                    <View style={styles.premiumSectionLeft}>
                                        {Array(12).fill(0).map((_, r) =>
                                            <View key={`prem-l-r-${r}`} style={styles.seatRowH}>
                                                {Array(20).fill(0).map((_, s) => <View key={`prem-l-s-${s}`} style={[styles.seat, styles.seatPremium]} />)}
                                            </View>
                                        )}
                                    </View>
                                    {/* Center Executive (Green) - V Shape */}
                                    <View style={styles.executiveSection}>
                                        {/* Lower V part */}
                                        {Array(6).fill(0).map((_, r) =>
                                            <View key={`exec-l-r-${r}`} style={[styles.seatRowH, { justifyContent: 'center' }]}>
                                                {/* Adjust seat count per row for V shape */}
                                                {Array(12 - r * 2).fill(0).map((_, s) => <View key={`exec-l-s-${s}`} style={[styles.seat, styles.seatExecutive]} />)}
                                            </View>
                                        )}
                                        {/* Upper part */}
                                        {Array(6).fill(0).map((_, r) =>
                                            <View key={`exec-u-r-${r}`} style={styles.seatRowH}>
                                                {Array(20).fill(0).map((_, s) => <View key={`exec-u-s-${s}`} style={[styles.seat, styles.seatExecutive]} />)}
                                            </View>
                                        )}

                                    </View>
                                    {/* Right Premium (Blue) */}
                                    <View style={styles.premiumSectionRight}>
                                        {Array(12).fill(0).map((_, r) =>
                                            <View key={`prem-r-r-${r}`} style={styles.seatRowH}>
                                                {Array(20).fill(0).map((_, s) => <View key={`prem-r-s-${s}`} style={[styles.seat, styles.seatPremium]} />)}
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {/* Lower Middle Sections */}
                                <View style={styles.gridRowLowerMiddle}>
                                    {/* Center Platinum (Purple) & Golden (Pink) */}
                                    <View style={styles.lowerCenterSection}>

                                        {Array(6).fill(0).map((_, r) =>
                                            <View key={`exec-l-r-${r}`} style={[styles.seatRowH, { justifyContent: 'center' }]}>
                                                {/* Adjust seat count per row for V shape */}
                                                {Array(20 - r * 2).fill(0).map((_, s) => <View key={`exec-l-s-${s}`} style={[styles.seat, styles.seatPlatinum]} />)}
                                            </View>
                                        )}
                                        {/* Golden */}
                                        {Array(5).fill(0).map((_, r) =>
                                            <View key={`gold-r-${r}`} style={[styles.seatRowH, { justifyContent: 'center' }]}>
                                                {Array(20).fill(0).map((_, s) => <View key={`gold-s-${s}`} style={[styles.seat, styles.seatGolden]} />)}
                                            </View>
                                        )}
                                    </View>
                                </View>
                                {/* Bottom Medium Area (Teal) */}
                                <View style={styles.gridRowBottom}>
                                    <View style={styles.mediumSection}>
                                        {Array(3).fill(0).map((_, r) =>
                                            <View key={`med-l-r-${r}`} style={styles.seatRowH}>
                                                {Array(15).fill(0).map((_, s) => <View key={`med-l-s-${s}`} style={[styles.seat, styles.seatMedium]} />)}
                                            </View>
                                        )}
                                    </View>
                                    <View style={{ width: wp(40) }} /> {/* Spacer */}
                                    <View style={styles.mediumSection}>
                                        {Array(3).fill(0).map((_, r) =>
                                            <View key={`med-r-r-${r}`} style={styles.seatRowH}>
                                                {Array(15).fill(0).map((_, s) => <View key={`med-r-s-${s}`} style={[styles.seat, styles.seatMedium]} />)}
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Ticket Categories - Two Columns */}
                            <View style={styles.ticketCategoriesContainer}>
                                <View style={styles.categoryColumn}>
                                    {/* Left Column Categories */}
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Medium Area</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatMedium]} />
                                            <Text style={styles.categoryPrice}>350$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Silver</Text>
                                        <View style={styles.categoryDetails}>
                                            {/* Assuming Silver maps to Premium visually */}
                                            <View style={[styles.categoryColorBox, styles.seatPremium]} />
                                            <Text style={styles.categoryPrice}>380$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Golden</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatGolden]} />
                                            <Text style={styles.categoryPrice}>400$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Executive</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatExecutive]} />
                                            <Text style={styles.categoryPrice}>500$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.categoryColumn}>

                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Premium</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatPremium]} />
                                            <Text style={styles.categoryPrice}>400$</Text>
                                            <Text style={styles.categoryAvailability}>(2)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>VIP</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatVip]} />
                                            <Text style={styles.categoryPrice}>420$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>
                                    <View style={styles.ticketCategory}>
                                        <Text style={styles.categoryTitle}>Platinum</Text>
                                        <View style={styles.categoryDetails}>
                                            <View style={[styles.categoryColorBox, styles.seatPlatinum]} />
                                            <Text style={styles.categoryPrice}>420$</Text>
                                            <Text style={styles.categoryAvailability}>(0)</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>


                            <PrimaryButton
                                title="Checkout (800$)"
                                //@ts-ignore
                                onPress={() => { navigation.navigate('Checkout'); }}
                                textStyle={undefined}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView >
        </View >
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#190F20',
    },
    scrollViewContainer: {
        flex: 1,
        backgroundColor: '#190F20',
    },
    container: {
        backgroundColor: '#190F20',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? hp(6) : hp(1),
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        paddingBottom: hp(2),
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        backgroundColor: '#190F20', // Dark overlay for text contrast
        padding: 20,
        justifyContent: 'space-between', // Pushes content
        paddingTop: 10, // Adjust for status bar if not using SafeAreaView here
        paddingBottom: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    signInButton: {
        backgroundColor: '#c061ff',
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 25,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    eventTitle: {
        fontSize: hp(4),
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        marginTop: 10,
    },
    eventTitleHighlight: {
        fontSize: hp(4),
        fontWeight: 'bold',
        color: colors.gold,
        textAlign: 'left',
    },
    dateChip: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateChipText: {
        color: 'grey',
        fontSize: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 15,
    },
    infoText: {
        color: '#eee',
        fontSize: 12,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    iconStyle: {
        marginRight: 5,
    },
    countdownContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 20,
        alignSelf: 'flex-start',
        marginLeft: 10
    },
    timeBox: {
        borderColor: colors.gold,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 50,
        maxHeight: 50,
        width: 55,
        marginHorizontal: 5,
        backgroundColor: "rgba(200, 100, 255, 0.3)",
    },
    timeValue: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    timeUnit: {
        color: '#eee',
        fontSize: 12,
        marginTop: 2,
    },
    colon: {
        color: '#eee',
        fontSize: 20,
        fontWeight: 'bold',
        marginHorizontal: 2,
    },
    startingPrice: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginTop: 5,
        marginLeft: 15,
        marginBottom: 20
    },
    contentArea: {
        padding: 20,
        marginTop: -20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    artistImageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
        height: 120,
        position: 'relative',
    },
    artistImage: {
        width: 80,
        height: '100%',
        borderRadius: 10,
    },
    overlappingImage: {

    },
    descriptionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'left',
        lineHeight: 32,
    },
    descriptionSubtitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.gold,
        textAlign: 'left',
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff',
        lineHeight: 20,
        textAlign: 'left',
        marginBottom: 10
    },
    scheduleContainer: {
        width: '100%',
        paddingVertical: hp(2),
        position: 'relative',
    },
    timelineItem: {
        flexDirection: 'row',
        marginBottom: hp(4),
        position: 'relative',
        minHeight: hp(10),
        zIndex: 7
    },
    timelineItemRight: {
        flexDirection: 'row-reverse',
    },
    timelineCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'linear-gradient(90deg, rgba(180, 60, 255, 1) 0%, rgba(130, 50, 220, 0.2) 100%)',
        borderColor: colors.gold,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: '50%',
        marginLeft: -30,
        zIndex: 10,
        top: -55
    },
    timelineNumber: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',

    },
    timelineContent: {
        flex: 1,
        paddingHorizontal: wp(0),
        paddingRight: wp(50),
        marginVertical: 15,

    },
    timelineContentRight: {
        paddingLeft: wp(50),
        paddingRight: wp(0),
        marginVertical: 15
    },
    timelineTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'right',
        paddingRight: wp(3)
    },
    timelineDescription: {
        color: colors.text.light,
        fontSize: 10,
        paddingRight: wp(3),
        textAlign: 'right',
    },
    textRight: {
        textAlign: 'left',
        paddingLeft: wp(3)
    },
    seatingMapContainer: {
        marginTop: hp(1),
        alignItems: 'center',
    },
    stageLabel: {
        backgroundColor: 'rgba(192, 97, 255, 0.7)',
        paddingVertical: hp(0.8),
        paddingHorizontal: wp(6),
        borderRadius: 15,
        marginBottom: hp(2),
        borderWidth: 1,
        borderColor: 'rgba(192, 97, 255, 1)',
    },
    stageLabelText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 10,
    },
    seatingGridContainer: {
        width: wp(90),
        marginBottom: hp(3),
    },
    gridRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    gridRowMiddle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: hp(0.5),
    },
    gridRowLowerMiddle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp(0.5),
    },
    gridRowBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -hp(3),
        width: '100%',
    },
    vipSection: {

    },
    premiumSectionLeft: {

    },
    executiveSection: {
        alignItems: 'center'
    },
    premiumSectionRight: {

    },
    lowerCenterSection: {
        alignItems: 'center'
    },
    mediumSection: {

    },
    seatRowH: {
        flexDirection: 'row',
        marginVertical: 1,
    },
    seat: {
        width: wp(1.2),
        height: hp(0.6),
        margin: 0.5,
        borderRadius: 1,
    },
    // Seat Colors (match the image)
    seatVip: { backgroundColor: '#f0c27a' },
    seatPremium: { backgroundColor: '#89cff0' },
    seatExecutive: { backgroundColor: '#98fb98' },
    seatPlatinum: { backgroundColor: '#c3aed6' },
    seatGolden: { backgroundColor: '#ffb6c1' },
    seatMedium: { backgroundColor: '#afeeee' },

    ticketCategoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: wp(90),
        marginTop: hp(2),
        paddingHorizontal: wp(2),
    },
    categoryColumn: {
        width: '48%',
    },
    ticketCategory: {
        marginBottom: hp(1.5),
    },
    categoryTitle: {
        color: '#fff',
        fontSize: hp(1.7),
        fontWeight: '600',
        marginBottom: hp(0.6),
    },
    categoryDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryColorBox: {
        width: wp(10),
        height: hp(1.2),
        borderRadius: 2,
        marginRight: wp(2),
    },
    categoryPrice: {
        color: '#fff',
        fontSize: hp(1.7),
        fontWeight: 'bold',
        marginRight: wp(2),
    },
    categoryAvailability: {
        color: '#aaa',
        fontSize: hp(1.7),
    },
    fixedBottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(10),
        backgroundColor: '#190F20',
        borderTopWidth: 1,
        borderTopColor: '#333',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp(5),
    },
});

export default DetailsScreen;
