// styles/SignupScreenStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    
  },
  form: {
  
    borderRadius: 10,
    padding: 20,
    
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
    fontSize: 18,
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
});
