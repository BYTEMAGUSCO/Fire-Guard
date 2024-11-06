import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebase'; // Ensure the path is correct
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../styles/PostDetailsStyles'; // Adjust the path as necessary
import { ImageBackground } from 'react-native';

const PostDetails = ({ route }) => {
    const navigation = useNavigation();
    const { post } = route.params;
    const [additionalSections, setAdditionalSections] = useState([]);

    useEffect(() => {
        const fetchAdditionalSections = async () => {
            const sectionsRef = collection(db, 'disasterPreparednessPosts');
            const q = query(sectionsRef, where('postID', '==', post.postID)); // Use the appropriate field name for postID

            const querySnapshot = await getDocs(q);
            const sections = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Assuming the sections are stored in the 'sections' field
            const sectionData = sections.length > 0 ? sections[0].sections : [];
            setAdditionalSections(sectionData);
        };

        fetchAdditionalSections();
    }, [post.postID]); // Fetch when postID changes

    return (
        <View style={{ flex: 1 }}>
          <ImageBackground
            source={require('../assets/bg.png')}
            style={{
              position: 'absolute', // Fill the entire container
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              resizeMode: 'cover', // Cover the whole area
            }}
          >
            {/* Overlay with semi-transparent background */}
            <View style={{ 
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0)', // Adjust color and opacity as needed
            }} />
          </ImageBackground>
      
          <ScrollView
            style={[styles.container,{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }]}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
      
            {post.thumbnail ? (
              <Image source={{ uri: post.thumbnail }} style={styles.thumbnail} />
            ) : null}
      
            <Text style={styles.title}>{post.title}</Text>
      
            {post.header1 ? <Text style={styles.header}>{post.header1}</Text> : null}
            {post.header2 ? <Text style={styles.header}>{post.header2}</Text> : null}
            {post.body ? <Text style={styles.body}>{post.body}</Text> : null}
      
            {post.image ? (
              <Image source={{ uri: post.image }} style={styles.image} />
            ) : null}
      
            {/* Render additional sections */}
            {additionalSections.length > 0 ? (
              additionalSections.map((section, index) => (
                <View key={section.id || index} style={styles.sectionContainer}>
                  {section.header ? <Text style={styles.header}>{section.header}</Text> : null}
                  {section.content ? <Text style={styles.body}>{section.content}</Text> : null}
                  {section.sectionImage ? (
                    <Image source={{ uri: section.sectionImage }} style={styles.image} />
                  ) : null}
                </View>
              ))
            ) : (
              <Text style={styles.body}>No additional sections available.</Text>
            )}
      
            {/* Spacer at the bottom */}
            <View style={styles.spacer} />
          </ScrollView>
        </View>
      );
      
    };
    
    export default PostDetails;