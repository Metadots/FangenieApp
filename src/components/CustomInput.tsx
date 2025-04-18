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
import { typography } from '../constants/globalStyles';
import { colors } from '../constants/colors';

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
                    placeholderTextColor={colors.text.muted}
                    secureTextEntry={internalSecureTextEntry}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />
                {dynamicIconName && (
                    <TouchableOpacity onPress={handleIconPress} style={styles.iconContainer}>
                        <Icon name={dynamicIconName} size={hp(2.5)} color={colors.text.muted} />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        marginBottom: hp(1.5),
        width: '100%',
    },
    label: {
        ...typography.inputLabel,
        color: colors.text.light,
        marginBottom: hp(1),
        marginLeft: wp(1),
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background.dark,
        borderColor: colors.card.background,
        paddingHorizontal: wp(4),
        height: hp(6.5),
    },
    inputContainerFocused: {
        borderColor: colors.primary,
    },
    inputContainerError: {
        borderColor: colors.status.error,
    },
    input: {
        flex: 1,
        ...typography.inputText,
        color: colors.text.light,
        paddingVertical: Platform.OS === 'ios' ? hp(1.5) : hp(1),
    },
    iconContainer: {
        paddingLeft: wp(2),
    },
    errorText: {
        ...typography.errorText,
        marginTop: hp(0.5),
        marginLeft: wp(1),
    }
});

export default CustomInput; 