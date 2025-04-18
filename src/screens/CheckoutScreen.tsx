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
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../constants/colors';
import { typography } from '../constants/globalStyles';

// Define navigation prop type
type CheckoutScreenNavigationProp = NativeStackNavigationProp<any>;

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
            <Header onProfilePress={() => { }} profile={3} logout={true} />
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
                <PrimaryButton
                    title="Pay Now"
                    onPress={handlePayNow}
                    style={styles.payButton}
                    textStyle={styles.payButtonText}
                    loading={false}
                />
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
        paddingTop: Platform.OS === 'android' ? hp(1) : hp(6),
        flex: 1,
        backgroundColor: colors.background.dark,
    },
    contentContainer: {
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 50,
        paddingBottom: 10,
    },
    logoText: {
        ...typography.heading2,
        color: colors.text.light,
    },
    signInButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 25,
        borderRadius: 20,
    },
    signInButtonText: {
        ...typography.buttonText,
        color: colors.text.light,
    },
    title: {
        ...typography.heading1,
        marginBottom: hp(2),
    },
    section: {
        marginHorizontal: 15,
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: colors.gold,
    },
    divider: {
        height: 1,
        backgroundColor: colors.divider,
        marginVertical: 15,
    },
    ticketItem: {
        flexDirection: "column",
        width: '100%',
    },
    ticketInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1,
    },
    iconPlaceholder: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: colors.background.primary,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        ...typography.subheading2,
        color: colors.text.primary,
    },
    ticketTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    ticketName: {
        ...typography.subheading2,
    },
    ticketPricePer: {
        ...typography.description,
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
        backgroundColor: colors.background.primary,
        borderRadius: 10,
        height: hp(3),
        marginBottom: 5,
        width: wp(22),
        justifyContent: "space-around",
        borderWidth: 1,
        borderColor: colors.gold,
    },
    quantityButton: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    quantityButtonText: {
        ...typography.buttonText,
    },
    quantityText: {
        ...typography.description,
    },
    ticketTotalPrice: {
        ...typography.subheading2,
    },
    sectionTitle: {
        ...typography.subheading1,
        marginBottom: hp(2),
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.darker,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.border.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.border.accent,
    },
    paymentText: {
        ...typography.description,
    },
    cardIcons: {
        flexDirection: 'row',
    },
    cardIconText: {
        ...typography.description,
        color: colors.text.light,
        marginLeft: 5,
        backgroundColor: colors.card.background,
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 3,
    },
    inputLabel: {
        ...typography.inputLabel,
        marginBottom: hp(1),
    },
    input: {
        ...typography.inputText,
        backgroundColor: colors.background.discount,
        borderRadius: 10,
        padding: hp(1.5),
        marginBottom: hp(2),
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: -5,
        marginTop: 0,
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: 5,
    },
    orderDetailsDivider: {
        marginVertical: 20,
        backgroundColor: colors.divider,
    },
    orderDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    orderDetailLabel: {
        ...typography.description,
    },
    orderDetailValue: {
        ...typography.description,
    },
    totalLabel: {
        ...typography.subheading1,
    },
    totalValue: {
        ...typography.heading2,
    },
    discountContainer: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: colors.background.dark,
        borderRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    discountInput: {
        flex: 1,
        marginRight: 10,
        backgroundColor: colors.background.dark,
    },
    applyButton: {
        backgroundColor: colors.button.primary,
        height: hp(4),
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        ...typography.buttonTextSmall,
    },
    payButton: {
        backgroundColor: colors.button.primary,
        borderRadius: 15,
        paddingVertical: 18,
        marginHorizontal: 15,
        marginTop: 30,
        marginBottom: 20,
        alignItems: 'center',
    },
    payButtonText: {
        ...typography.buttonText,
        color: colors.button.text,
    },
    gradient: {
        borderRadius: 15,
    },
});

export default CheckoutScreen; 