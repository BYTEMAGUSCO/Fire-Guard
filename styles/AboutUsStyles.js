import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        backgroundColor: '#fff',
        paddingBottom: 80,
        height: '100%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    aboutText: {
        fontSize: 18,
        color: '#333',
        lineHeight: 26,
        marginBottom: 10,
    },
    missionText: {
        fontSize: 22, // Larger font size for emphasis on "Our Mission"
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 22, // Larger font size for emphasis on "Welcome"
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.5,
        resizeMode: 'cover',
    },
    sendButton: {
        backgroundColor: '#ff0000',
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#000',
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
});

export default styles;
