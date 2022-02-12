import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableNativeFeedback,
  ImageBackground,Dimensions
} from 'react-native';

const DiseaseCategoryGridTile = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <ImageBackground source={props.image} style={{flex:1,width:"100%", height: '100%'}} resizeMode={'stretch'}>
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={props.onSelect}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: props.color } }}
        >
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
        </View>
      </TouchableCmp>
    </View>
    </ImageBackground>
  );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    
    height: width * 0.2 * 1.5,
    borderRadius: 10,
    borderWidth:0.5,
    borderColor:'#3F51B5',
    overflow: 'hidden'
  },
  container: {
    flex: 1,
    borderRadius: 3,
    shadowColor: '#3F51B5',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right'
  }
});

export default DiseaseCategoryGridTile;
