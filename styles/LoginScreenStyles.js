import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  appTitle: {
    // Adjusted styles for centering and reduced margin
    width: '150%', // Make the image take the full width for proper centering
    resizeMode: 'contain', // Ensures the image scales without distortion
    alignSelf: 'center', // Center the image horizontally
    marginBottom: -200, // Reduced bottom margin
    marginTop:-300,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ff0000', // Updated to red
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 15,
  },
  linkButtonText: {
    color: '#000', // Updated to red
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10, // Adjust margin as needed
  },
  switchLabel: {
    fontSize: 16,
    color: '#333', // You can adjust the color as needed
  },
  
});
