import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 40,
        paddingBottom:60,
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
        height: 50,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 12,
        borderColor: '#ff0000', // Changed to bright red
        borderWidth: 1,
        marginBottom: 10,
    },
    sendButton: {
        backgroundColor: '#ff0000', // Changed to bright red
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    notificationList: {
        flex: 1,
    },
    notification: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 8,
        marginVertical: 5,
        borderColor: '#ff0000', // Changed to bright red
        borderWidth: 1,
    },
    notificationMessage: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    notificationTimestamp: {
        fontSize: 15,
        color: '#666',
        marginTop: 5,
    },
    deleteButton: {
        backgroundColor: '#ff0000', // Changed to bright red
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        marginTop: 10,
        alignSelf: 'flex-end', // Align to the right
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default styles;
