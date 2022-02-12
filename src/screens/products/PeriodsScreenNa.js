import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { Container,List, Header,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import { PERIODS } from '../../data/dummy-data';
import CategoryGridTile from '../../components/ProductCategoryGridTile';

const DiseasesCategory = props => {
  const renderGridItem = itemData => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryProduct',
            params: {
              categoryId: itemData.item.id
            }
          });
        }}
      />
    );
  };

  return (
    <Container>
      <FlatList
      keyExtractor={(item, index) => item.id}
      data={PERIODS}
      renderItem={renderGridItem}
      numColumns={2}
    />
      <Footer>
          <FooterTab>
            <Button onPress={()=>props.navigation.navigate('Home')}>
              <Icon  name="apps" />
              <Text style={{color:"white"}}>Category</Text>
            </Button>
            <Button active>
              <Icon active name="time-slot" type="Entypo"/>
              <Text style={{color:"white"}}>Time</Text>
            </Button>
            <Button onPress={()=>props.navigation.navigate('Search')}>
              <Icon name="search" />
              <Text style={{color:"white"}}>Search</Text>
            </Button>
            <Button active>
              <Icon active name="barcode" />
              <Text style={{color:"white"}}>barcode</Text>
            </Button>
            <Button>
              <Icon name="favorite"  type='MaterialIcons'/>
              <Text style={{color:"white"}}>favorite</Text>
            </Button>
            <Button>
              <Icon name="person" />
              <Text style={{color:"white"}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default DiseasesCategory;
