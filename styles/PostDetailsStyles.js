// PostDetailsStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: '#fff',
        // Ensuring no shadow properties
        shadowColor: 'transparent', // Prevent any shadow color
        elevation: 0, // Prevent shadow on Android
    },
    backButton: {
        marginBottom: 20,
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#ff0000', // YouTube Red
        borderRadius: 5,
        alignSelf: 'flex-start',
        // Ensuring no shadow properties
        shadowColor: 'transparent', // Prevent any shadow color
        elevation: 0, // Prevent shadow on Android
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    thumbnail: {
        width: '50%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
        alignSelf:'center',
        // Ensuring no shadow properties
        shadowColor: 'transparent', // Prevent any shadow color
        elevation: 0, // Prevent shadow on Android
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: '600',
        color: '#c8102e', // YouTube Red
        marginVertical: 5,
        textAlign: 'center',
    },
    body: {
        fontSize: 18,
        lineHeight: 24,
        marginBottom: 10,
        color: '#333',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 10,
        // Ensuring no shadow properties
        shadowColor: 'transparent', // Prevent any shadow color
        elevation: 0, // Prevent shadow on Android
    },
    sectionContainer: {
        marginVertical: 10,
        padding: 10,
        borderRadius: 10,
        // Ensuring no shadow properties
        shadowColor: 'transparent', // Prevent any shadow color
        elevation: 0, // Prevent shadow on Android
    },
    spacer: {
        height: 40, // Adjust height as necessary for additional spacing at the bottom
    },
});

export default styles;
