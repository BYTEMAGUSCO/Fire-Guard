import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    thumbnailButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    thumbnailButtonText: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
    },
    thumbnailPreview: {
        width: 100, // Adjust width as needed
        height: 100, // Adjust height as needed
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    postButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    postButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#ff0000', // Changed to bright red
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default styles;
