// BottomNavBarStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,  // Increased vertical padding for better spacing
    backgroundColor: '#ff0000', // Set background color to bright red
    position: 'absolute',
    bottom: 0,
    left: 0,  // Ensure it starts from the left
    right: 0, // Ensure it ends at the right
    height: 60,  // Increased height for a more substantial feel
    borderTopWidth: 1,  // Optional: to give it a defined border
    borderTopColor: '#ddd',  // Lighter border color for better contrast
    elevation: 5,  // Add shadow for Android
    shadowColor: '#000',  // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 },  // Shadow offset
    shadowOpacity: 0.1,  // Shadow opacity
    shadowRadius: 4,  // Shadow radius
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,  // Add padding for better touch area
  },
 
});
