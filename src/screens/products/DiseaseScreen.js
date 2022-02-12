import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import {BASE_URL} from '../../store/constants';
import { useSelector, useDispatch } from 'react-redux';
import { Container,List, Header, Card, Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import ProductCategoryGridTile from '../../components/ProductCategoryGridTile';
import DiseaseCategoryGridTile from '../../components/DiseaseCategoryGridTile';

const DiseaseScreen = props => {
  
    
  const disease_categories = useSelector(state=>state.selectDiseases.diseasesCategories)
  const language = useSelector(state=>state.selectdLanguage.selectdLanguage)

  const renderDiseaseGridItem = itemData => {
    return (

      <Card style={{width:"90%", height:120,justifyContent:"center",backgroundColor:"#41AEA9", borderRadius:8,alignSelf:"center"}}>
      <List>
        <ListItem avatar noBorder onPress={() => {
          props.navigation.navigate({
            routeName: 'DiseaseProducts',
            params: {
              diseaseId: itemData.item.id,
              title:itemData.item.name
            }
          });
        }}>
        
          <Left/> 
          <Body>
            <Text style={{fontWeight:"normal", textAlign:"center",fontSize:20}}>{itemData.item.name}</Text>
           
           
            {/* <Text note>{doctor.item.spicality.name}</Text> */}
          </Body>
          <Right/>
        </ListItem>
      </List>
       </Card>
    );
  };

  return (
    
    <Container>
            
      {disease_categories == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred!</Text>
        <Button style={{color:"#fff"}} onPress={loadProductCategories}>
          <Text style={{color:"#ffff"}}>Try Again</Text>
        </Button>
      </View> :
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={disease_categories}
          renderItem={renderDiseaseGridItem}
       
        />
      }
        
      
      
        <Footer style={{backgroundColor:"#fff"}}>
          <FooterTab style={{backgroundColor:"#dddddd"}}>
            <Button transparent vertical onPress={()=>props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{language.home}</Text>
            </Button>
            <Button transparent  onPress={()=>props.navigation.navigate({routeName:'Search',params:{headerTitle:language.search}})}>
              <Icon name="search" style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{language.search}</Text>
            </Button>
            <Button rounded style={{backgroundColor:"#009479",height:80}}  onPress={()=>props.navigation.navigate('BarcodeSearch')}>
              <Icon active name="barcode" style={{color:"#fff",fontSize:45}}/>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate({routeName:'Favourite',params:{headerTitle:language.favorieteCollections}})}>
              <Icon name="favorite"  type='MaterialIcons' style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{language.favoriete}</Text>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{language.profile}</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
};
DiseaseScreen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('headerTitle')
  };
}
export default DiseaseScreen;

