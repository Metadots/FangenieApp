import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    TextInput,
    Image, // Assuming you have a logo image
    StatusBar,
    Platform, // Import Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';

// Re-add or define your RootStackParamList including PaymentSuccess
type RootStackParamList = {
    Home: undefined;
    Details: undefined;
    Checkout: undefined;
    PaymentSuccess: undefined; // Make sure this is included
    // Add other screens here
};

// Type for the navigation prop specific to CheckoutScreen
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Checkout' // This screen's name in the stack
>;

// Assuming you have icons, replace with your actual icon components or libraries
const PlaceholderIcon = () => <View style={styles.iconPlaceholder}><Text style={styles.iconText}>B</Text></View>; // Added simple text
const VisaIcon = () => <Text style={styles.cardIconText}>VISA</Text>; // Placeholder
const MasterCardIcon = () => <Text style={styles.cardIconText}>MC</Text>; // Placeholder

// Define Props for TicketItem
interface TicketItemProps {
    // icon: React.ReactNode; // icon was removed in user edits
    name: string;
    price: number;
    quantity: number;
    onDecrease: () => void;
    onIncrease: () => void;
}

// Define Props for OrderDetailRow
interface OrderDetailRowProps {
    label: string;
    value: number;
    isTotal?: boolean; // Optional prop
}

const CheckoutScreen = () => {
    const navigation = useNavigation<CheckoutScreenNavigationProp>();
    const [vipTickets, setVipTickets] = useState<number>(2);
    const [executiveTickets, setExecutiveTickets] = useState<number>(2);
    const [startingTickets, setStartingTickets] = useState<number>(1);
    const [discountCode, setDiscountCode] = useState<string>('');

    const vipPrice = 400;
    const executivePrice = 500;
    const startingPrice = 350;

    const subtotal =
        vipTickets * vipPrice +
        executiveTickets * executivePrice +
        startingTickets * startingPrice;
    const serviceCharges = 10; // Example value
    const taxRate = 0.05; // Example 5% tax
    const tax = (subtotal + serviceCharges) * taxRate;
    const total = subtotal + serviceCharges + tax;

    const handleQuantityChange = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        currentQuantity: number,
        delta: number
    ) => {
        const newQuantity = currentQuantity + delta;
        if (newQuantity >= 0) {
            setter(newQuantity);
        }
    };

    const handlePayNow = () => {
        // TODO: Implement payment logic
        console.log('Processing payment...');
        // Navigate to success screen
        navigation.navigate('PaymentSuccess');
    };

    const handleApplyDiscount = () => {
        // TODO: Implement discount logic
        console.log('Applying discount code:', discountCode);
        // Add logic to potentially update the total
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="light-content" />
            {/* Header */}
            <Header onProfilePress={() => { }} />
            <Text style={styles.title}>Checkout</Text>

            {/* Ticket Selection */}
            <View style={styles.section}>
                <TicketItem
                    name="VIP Tickets"
                    price={vipPrice}
                    quantity={vipTickets}
                    onDecrease={() => handleQuantityChange(setVipTickets, vipTickets, -1)}
                    onIncrease={() => handleQuantityChange(setVipTickets, vipTickets, 1)}
                />
                <View style={styles.divider} />
                <TicketItem
                    name="Executive Tickets"
                    price={executivePrice}
                    quantity={executiveTickets}
                    onDecrease={() => handleQuantityChange(setExecutiveTickets, executiveTickets, -1)}
                    onIncrease={() => handleQuantityChange(setExecutiveTickets, executiveTickets, 1)}
                />
                <View style={styles.divider} />
                <TicketItem
                    name="Starting Tickets"
                    price={startingPrice}
                    quantity={startingTickets}
                    onDecrease={() => handleQuantityChange(setStartingTickets, startingTickets, -1)}
                    onIncrease={() => handleQuantityChange(setStartingTickets, startingTickets, 1)}
                />
            </View>

            {/* Payment Method */}
            <View style={[styles.section, { backgroundColor: "#2E1D3B", borderWidth: 0 }]}>
                <Text style={styles.sectionTitle}>Payment Method</Text>
                <TouchableOpacity style={styles.paymentOption}>
                    <View style={styles.radioOuter}>
                        <View style={styles.radioInner} />
                    </View>
                    <Text style={styles.paymentText}>Debit/Credit Card</Text>
                    <View style={styles.cardIcons}>
                        <VisaIcon />
                        <MasterCardIcon />
                    </View>
                </TouchableOpacity>

                <Text style={styles.inputLabel}>Card Holder Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="JAME PETER"
                    placeholderTextColor="#5A5A5A" // Darker placeholder
                    defaultValue="JAME PETER" // Set default value from image
                />

                <Text style={styles.inputLabel}>Card Number</Text>
                <TextInput
                    style={styles.input}
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor="#5A5A5A"
                    keyboardType="numeric"
                    defaultValue="0000 0000 0000 0000" // Set default value from image
                />

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Expiry</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/YY"
                            placeholderTextColor="#5A5A5A"
                            defaultValue="MM/YY" // Set default value from image
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>CVV</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="000"
                            placeholderTextColor="#5A5A5A"
                            keyboardType="numeric"
                            secureTextEntry
                            maxLength={3}
                            defaultValue="000" // Set default value from image
                        />
                    </View>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 30, }]}>Order Details</Text>
                <OrderDetailRow label="Subtotal" value={subtotal} />
                <OrderDetailRow label="Service Charges" value={serviceCharges} />
                <OrderDetailRow label="Tax" value={tax} />
                <View style={[styles.divider, styles.orderDetailsDivider]} />
                <OrderDetailRow label="Total" value={total} isTotal />

                <View style={styles.discountContainer}>
                    <TextInput
                        style={[styles.input, styles.discountInput]}
                        placeholder="Discount Code"
                        placeholderTextColor="#5A5A5A"
                        value={discountCode}
                        onChangeText={setDiscountCode}
                    />
                    <TouchableOpacity style={styles.applyButton} onPress={handleApplyDiscount}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
                <PrimaryButton title="Pay Now" onPress={handlePayNow} />
            </View>
        </ScrollView>
    );
};

// Apply Props to TicketItem
const TicketItem: React.FC<TicketItemProps> = ({ name, price, quantity, onDecrease, onIncrease }) => (
    <View style={styles.ticketItem}>
        <View style={styles.ticketInfo}>
            <View style={{
                backgroundColor: '#fff', height: 40, width: 40,
                borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: wp(3)
            }}>
                <Image source={require('../assets/images/ticket-grey.png')}
                    style={{ height: 20, width: 20 }} />
            </View>
            <View style={styles.ticketTextContainer}>
                <Text style={styles.ticketName}>{name}</Text>
                <Text style={styles.ticketPricePer}>/{price}$</Text>
            </View>
        </View>
        <View style={styles.quantityControlContainer}>
            <View style={styles.quantityControls}>
                <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.ticketTotalPrice}>{quantity * price}$</Text>
        </View>
    </View>
);

// Apply Props to OrderDetailRow
const OrderDetailRow: React.FC<OrderDetailRowProps> = ({ label, value, isTotal = false }) => (
    <View style={styles.orderDetailRow}>
        <Text style={isTotal ? styles.totalLabel : styles.orderDetailLabel}>{label}</Text>
        <Text style={isTotal ? styles.totalValue : styles.orderDetailValue}>
            {value % 1 !== 0 ? value.toFixed(2) : value}$
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? hp(1) : hp(6), // Adjust for status bar
        flex: 1,
        backgroundColor: '#190F20', // Darker purple background matching image more closely
    },
    contentContainer: {
        paddingBottom: 40, // Add padding to the bottom
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50, // Adjust for status bar
        paddingBottom: 10,
    },
    logoText: { // Replace with Image styles if using an image
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
        // Add font family if you have a custom font
    },
    signInButton: {
        backgroundColor: '#A050F0', // Lighter purple
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    signInButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        color: '#c061ff',
        fontSize: hp(4),
        fontWeight: 'bold',
        marginTop: 10, // Reduced top margin
        marginBottom: 20,
        marginLeft: 20,
    },
    section: {
        backgroundColor: '#3E2A5A', // Slightly lighter purple section background
        marginHorizontal: 15,
        marginBottom: 20,
        paddingVertical: 15, // Adjusted padding
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#c061ff',
    },
    divider: {
        height: 1,
        backgroundColor: '#5A4573', // Divider color
        marginVertical: 15,
    },
    ticketItem: {
        flexDirection: "column",
        width: '100%',
    },
    ticketInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1, // Allow info to shrink if needed
    },
    iconPlaceholder: { // Style your icon container
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFF', // White background for icon
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        // Add elevation/shadow if needed
    },
    iconText: { // If using text as placeholder
        color: '#3E2A5A',
        fontWeight: 'bold',
        fontSize: 18,
    },
    ticketTextContainer: { // Wrap text elements
        flexDirection: 'row', // Stack name and price
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10, // Add space between text and quantity controls
    },
    ticketName: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 10
    },
    ticketPricePer: {
        color: '#fff',
        fontSize: 12,
    },
    quantityControlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(200, 100, 255, 0.3)",
        borderRadius: 10,
        height: hp(3),
        marginBottom: 5,
        borderWidth: 1,
        borderColor: 'rgba(180, 60, 255, 1)',
        width: wp(22),
        justifyContent: "space-around"
    },
    quantityButton: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    quantityButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    quantityText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#ccc",
        width: wp(6),
    },
    ticketTotalPrice: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5, // Add space above total price
    },
    sectionTitle: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15, // Adjusted margin
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C1D3E', // Darker background for selected option
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#A050F0', // Purple border
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#A050F0', // Purple inner circle
    },
    paymentText: {
        color: '#FFF',
        fontSize: 16,
        flex: 1, // Take remaining space
    },
    cardIcons: {
        flexDirection: 'row',
    },
    cardIconText: { // Placeholder styling
        color: '#FFF',
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 10, // smaller font for card type
        backgroundColor: '#5A4573',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
        overflow: 'hidden', // Ensure text fits in rounded corners
    },
    inputLabel: {
        color: '#fff',
        fontSize: 14,
        marginBottom: 8,
        marginTop: 10, // Consistent top margin
    },
    input: {
        backgroundColor: '#190F20', // Darker input background
        paddingVertical: 12,
        paddingHorizontal: 15,
        color: '#FFF',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -5, // Counteract inputGroup margin
        marginTop: 0, // Removed margin top for row
    },
    inputGroup: {
        flex: 1, // Each group takes half the space
        marginHorizontal: 5, // Add spacing between inputs
    },
    orderDetailsDivider: {
        marginVertical: 20, // More space around total divider
        backgroundColor: '#5A4573', // Ensure divider has color
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderDetailLabel: {
        color: '#B0A0C0',
        fontSize: 16,
    },
    orderDetailValue: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
    },
    totalLabel: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    totalValue: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    discountContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: "#190F20",
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    discountInput: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#190F20',
        // Ensure input style consistency
    },
    applyButton: {
        backgroundColor: '#A050F0',
        height: hp(4),
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: '#FFF',
        fontSize: 14,
    },
    payButton: {
        backgroundColor: '#A050F0',
        borderRadius: 15,
        paddingVertical: 18,
        marginHorizontal: 15,
        marginTop: 30, // Increased space above pay button
        marginBottom: 20, // Added margin bottom
        alignItems: 'center',
    },
    payButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CheckoutScreen; 