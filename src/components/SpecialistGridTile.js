import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import { Container, Header, Content,Card, List, ListItem, Thumbnail,Icon, Text, Left, Body, Right, Button } from 'native-base';
import UserAvatar from 'react-native-user-avatar';
const SpecialistGridTile = props => {
  return (
    <View>
       <Card style={{width:"90%", height:100,justifyContent:"center",backgroundColor:"#fff", borderRadius:30,alignSelf:"center",marginTop:"5%"}}>

            <ListItem  onPress={props.onSelect} noBorder>
            
                <UserAvatar name={props.title} size={60} />
              
              <Body style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={{fontSize:20}}>{props.title}</Text>
              </Body>
              <Right>
                <Button transparent>
                <Icon name={props.favIcon}  type='MaterialIcons' onPress={props.onFavSelect}/>
                </Button>
              </Right>
            </ListItem>
         </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 50,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row'
  },
  mealHeader: {
    height: '85%'
  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
});

export default SpecialistGridTile;
