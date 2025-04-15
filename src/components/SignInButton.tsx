import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
export const SignInButton = ({ onPress }) => {
    return (
        <LinearGradient
            colors={['#F9AF47', '#CA8D38']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.signInButton}
        >
            <TouchableOpacity onPress={onPress} >
                <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>
        </LinearGradient>
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