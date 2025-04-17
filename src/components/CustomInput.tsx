import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TextInputProps, // Import TextInputProps
    Platform,
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon set

interface CustomInputProps extends TextInputProps {
    label: string;
    iconName?: string;
    onIconPress?: () => void;
    containerStyle?: object;
    inputStyle?: object;
    error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    iconName,
    onIconPress,
    containerStyle,
    inputStyle,
    secureTextEntry,
    error,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [internalSecureTextEntry, setInternalSecureTextEntry] = useState(secureTextEntry);

    const handleIconPress = () => {
        if (secureTextEntry && onIconPress) {
            onIconPress();
        } else if (secureTextEntry) {
            setInternalSecureTextEntry(!internalSecureTextEntry);
        }
    };

    const dynamicIconName = secureTextEntry ? (internalSecureTextEntry ? 'eye-off-outline' : 'eye-outline') : iconName;

    return (
        <View style={[styles.outerContainer, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused,
                error ? styles.inputContainerError : null]}>
                <TextInput
                    style={[styles.input, inputStyle]}
                    placeholderTextColor="#fff"
                    secureTextEntry={internalSecureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {dynamicIconName && (
                    <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
                        {/* @ts-ignore */}
                        <Icon name={dynamicIconName} size={hp(2.5)} color="#B0A0C0" />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        marginBottom: hp(2),
        width: '100%',
    },
    label: {
        color: '#fff',
        fontSize: hp(1.8),
        marginBottom: hp(1),
        marginLeft: wp(1),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#353535',
        borderColor: '#5A4573',
        paddingHorizontal: wp(4),
        height: hp(6.5),
    },
    inputContainerFocused: {
        borderColor: '#A050F0',
    },
    inputContainerError: {
        borderColor: '#FF6B6B',
    },
    input: {
        flex: 1,
        color: '#FFF',
        fontSize: hp(1.6),
        paddingVertical: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    },
    iconContainer: {
        paddingLeft: wp(2),
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: hp(1.5),
        marginTop: hp(0.5),
        marginLeft: wp(1),
    }
});

export default CustomInput; 