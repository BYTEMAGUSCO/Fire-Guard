import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Linking, Modal } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import styles from '../styles/ContactScreenEditor';
import BottomNavBar from '../components/BottomNavBarAdmin';
import Icon from 'react-native-vector-icons/Ionicons';
import { ImageBackground } from 'react-native';

const ContactScreenEditor = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [numberOptions, setNumberOptions] = useState([]);
  const [isTextModalVisible, setIsTextModalVisible] = useState(false);

  const fetchContacts = async () => {
    const contactsCollection = collection(db, "contacts");
    const contactsSnapshot = await getDocs(contactsCollection);
    const contactsList = contactsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        telephone: Array.isArray(data.telephone) ? data.telephone : [],
        mobile: Array.isArray(data.mobile) ? data.mobile : [],
      };
    });
    setContacts(contactsList);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAddOrUpdateContact = async () => {
    try {
      const contactData = {
        name,
        telephone: telephone ? telephone.split(',').map(num => num.trim()) : [],
        mobile: mobile ? mobile.split(',').map(num => num.trim()) : [],
      };

      if (selectedContact) {
        await updateDoc(doc(db, "contacts", selectedContact.id), contactData);
        Alert.alert("Success", "Contact updated successfully");
      } else {
        await addDoc(collection(db, "contacts"), contactData);
        Alert.alert("Success", "Contact added successfully");
      }
      handleCancel();
      fetchContacts();
    } catch (error) {
      Alert.alert("Error", "Failed to add/update contact: " + error.message);
    }
  };

  const handleEditContact = (contact) => {
    setName(contact.name);
    setTelephone(contact.telephone ? contact.telephone.join(', ') : '');
    setMobile(contact.mobile ? contact.mobile.join(', ') : '');
    setSelectedContact(contact);
    setIsFormVisible(true);
  };

  const handleDeleteContact = (contactId) => {
    Alert.alert(
      "Delete Contact",
      "Are you sure you want to delete this contact?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "contacts", contactId));
              Alert.alert("Success", "Contact deleted successfully");
              fetchContacts();
            } catch (error) {
              Alert.alert("Error", "Failed to delete contact: " + error.message);
            }
          } 
        }
      ]
    );
  };

  const handleCancel = () => {
    setName('');
    setTelephone('');
    setMobile('');
    setSelectedContact(null);
    setIsFormVisible(false);
  };

  const handleShowForm = () => {
    setIsFormVisible(true);
    setName('');
    setTelephone('');
    setMobile('');
    setSelectedContact(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (contact) => {
    const labeledNumbers = [];

    contact.telephone.forEach((num, index) => {
      labeledNumbers.push({
        label: `Telephone ${index + 1}: ${num}`,
        number: num,
      });
    });

    contact.mobile.forEach((num, index) => {
      labeledNumbers.push({
        label: `Mobile ${index + 1}: ${num}`,
        number: num,
      });
    });

    setNumberOptions(labeledNumbers);
    setIsModalVisible(true);
  };

  const callNumber = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const textNumber = (number) => {
    Linking.openURL(`sms:${number}`);
  };

  const handleSelectNumber = (number, isText = false) => {
    if (isText) {
      textNumber(number);
    } else {
      callNumber(number);
    }
    setIsModalVisible(false);
    setIsTextModalVisible(false);
  };

  const handleCallModal = (contact) => {
    if (contact.telephone.length > 0 || contact.mobile.length > 0) {
      openModal(contact);
    }
  };

  const handleTextModal = (contact) => {
    if (contact.mobile.length > 0) {
      setNumberOptions(
        contact.mobile.map((num, index) => ({
          label: `Mobile ${index + 1}: ${num}`,
          number: num,
        }))
      );
      setIsTextModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/bg.png')} // Ensure the path to your image is correct
        style={{
          position: 'absolute', // Position absolute to fill the container
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5, // Set the opacity here if you want it
          resizeMode: 'cover', // Ensures the image covers the entire area
        }}
      />
      <Text style={styles.title}>Admin: Manage LGU Contacts</Text>
      {!isFormVisible && (
        <View style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Search Contacts by Name..."
              value={searchQuery}
              onChangeText={handleSearch}
              style={[styles.searchInput, { flex: 1 }]} // Make the input fill available space
            />
          </View>
          <TouchableOpacity
            style={[styles.button, { marginTop: 10, width: '100%' }]} // Keep the button full width
            onPress={handleShowForm}
          >
            <Text style={styles.buttonText}>Add New Contact</Text>
          </TouchableOpacity>
        </View>
      )}

      {isFormVisible && (
        <View>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Telephone (comma-separated)"
            value={telephone}
            onChangeText={setTelephone}
            style={styles.input}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="Mobile (comma-separated)"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            keyboardType="phone-pad"
          />

          <View style={styles.actionButtons}>
            <View style={{ flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity
                style={[styles.button, { flex: 1, marginRight: 5 }]}
                onPress={handleAddOrUpdateContact}
              >
                <Text style={styles.buttonText}>{selectedContact ? "Update Contact" : "Add Contact"}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.cancelButton, { flex: 1 }]} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contact}>
            <TouchableOpacity onPress={() => setSelectedContact(selectedContact?.id === item.id ? null : item)}>
              <View style={styles.contactHeader}>
                <Text style={styles.contactName}>{item.name}</Text>
                <View style={styles.upperRightButtons}>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => handleCallModal(item)}
                  >
                    <Icon name="call" size={20} color="#fff" />
                  </TouchableOpacity>
                  {item.mobile.length > 0 && (
                    <TouchableOpacity
                      style={styles.textButton}
                      onPress={() => handleTextModal(item)}
                    >
                      <Icon name="chatbubble-ellipses" size={20} color="#fff" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              {selectedContact?.id === item.id && (
                <View>
                  {item.telephone.map((number, index) => (
                    <Text key={index} style={styles.contactDetail}>
                      Telephone {index + 1}: {number}
                    </Text>
                  ))}
                  {item.mobile.map((number, index) => (
                    <Text key={index} style={styles.contactDetail}>
                      Mobile {index + 1}: {number}
                    </Text>
                  ))}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditContact(item)}
                    >
                      <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteContact(item.id)}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { fontSize: 24 }]}>Select a Number to Call</Text>
          {numberOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectNumber(option.number)}
              style={styles.modalButton}
            >
              <Text style={[styles.modalButtonText, { fontSize: 18 }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          {/* Close Button */}
          <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>

    <Modal visible={isTextModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, { fontSize: 24 }]}>Select a Mobile Number to Text</Text>
          {numberOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelectNumber(option.number, true)}
              style={styles.modalButton}
            >
              <Text style={[styles.modalButtonText, { fontSize: 18 }]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setIsTextModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={[styles.closeButtonText, { fontSize: 18 }]}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
    <BottomNavBar navigation={navigation} activeScreen="ContactScreenEditor" />
    </View>
  );
};

export default ContactScreenEditor;
