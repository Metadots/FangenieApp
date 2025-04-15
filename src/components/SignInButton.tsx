import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
export const SignInButton = ({ onPress }) => {
    return (

        <TouchableOpacity style={styles.signInButton} onPress={onPress} >
            <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: colors.button.primary,
        paddingHorizontal: 20,
        height: 32,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInButtonText: {
        color: "#fff",
        fontSize: 16,
    }
});

export default SignInButton;    