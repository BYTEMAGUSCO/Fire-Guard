import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window'); // Get the screen width


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Platform.OS === 'android' ? 20 : 20,  // Different padding for Android/iOS
        backgroundColor: '#fff',
        paddingTop: 30,
        paddingHorizontal: width > 400 ? 20 : 20, // Increase padding for wider screens (e.g., tablets)
      },

    title: {
        fontSize: 24, 
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
        marginTop: -5,
    },
    inputContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    input: {
        height: 50,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: '#ff0000',
        borderWidth: 1,
        marginBottom: 10,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        paddingHorizontal: 10,
        borderColor: '#ff0000',
        borderWidth: 1,
        marginBottom: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#ff0000',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    plusButton: {
        backgroundColor: '#ff0000',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginHorizontal: 10,
        marginBottom: 20,
    },
    fireButton: {
        backgroundColor: '#ff0000',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        marginHorizontal: 10,
    },
    imagePickerButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        color: '#333',
        fontSize: 16,
    },
    removeButton: {
        backgroundColor: '#ff0000',
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    postContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        marginLeft: 10,
        flex: 1, // Ensures the card fills its container
        height: width > 600 ? 250 : 180, 
    },
    thumbnail: {
        width: '20%',
        height: width > 600 ? 180 : 110, 
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
    },
    postTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        alignSelf: 'center',
    },
    postDate: {
        fontSize: 12,
        color: '#999',
    },
    postBody: {
        fontSize: 14,
        marginTop: 5,
    },
    postCard: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        marginBottom: 15,
        marginRight: 10,
        width: '48%',  // This allows two cards to fit in a row for better layout
    },
});

export default styles;
