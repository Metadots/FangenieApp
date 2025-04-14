import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const SignInButton = () => {
    return (
        <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    signInButton: {
        backgroundColor: "#CC7BFF",
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