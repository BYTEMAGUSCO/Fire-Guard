import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff', // Keep the background white
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#000', // Black title
  },
  searchInputContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#f8f9fa', // Light grey background
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%', // Set width to 100%
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#ff0000', // Changed to bright red
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%', // Set width to 100%
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#f8f9fa', // Light grey background
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ff0000', // Changed to bright red
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%', // Set the button to full width
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ff0000', // Changed to bright red
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f8d7da', // Light red background for the cancel button
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
    flex: 1, // Allow the cancel button to grow
  },
  cancelButtonText: {
    color: '#ff0000', // Changed to bright red for cancel text
    fontSize: 16,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Set the container to full width
    marginVertical: 10,
  },
  contact: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000', // Black contact name
  },
  upperRightButtons: {
    flexDirection: 'row',
  },
  callButton: {
    marginLeft: 10,
    backgroundColor: '#218838', // Green for call button
    padding: 5,
    borderRadius: 5,
  },
  textButton: {
    marginLeft: 10,
    backgroundColor: '#117a8b', // Teal for text button
    padding: 5,
    borderRadius: 5,
  },
  contactDetail: {
    fontSize: 16, // Increased font size from 14 to 16
    marginTop: 5,
    color: '#000', // Black text
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#e0a800', // Yellow for edit button
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#ff0000', // Changed to bright red
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24, // Increased font size for modal title
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000', // Black modal title
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    alignItems: 'flex-start',
  },
  modalOptionText: {
    fontSize: 24, // Increased font size for modal option text
    color: '#000', // Black text
  },
});

export default styles;
