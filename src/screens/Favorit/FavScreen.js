import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container,List, Header, Accordion,Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import PeriodGridTile from '../../components/PeriodGridTile';
import * as favouritsActions from '../../store/actions/favourites';


const FavScreeen = props => {
    const user_details = useSelector(state => state.userDetails.userDetails);
    const periods_list = useSelector(state=>state.periods.periods)
    const choices_list = useSelector(state=>state.choices.choices);
    const language = useSelector(state=>state.selectdLanguage.selectdLanguage)
    
    useEffect(() => {
        dispatch(favouritsActions.fetchFavouriteList(user_id=user_details.user_id));
    }, [dispatch]);
  
  
  const dispatch = useDispatch();
  const favorites = useSelector(state=>state.favourites.favourites)
  

  if(favorites == null){
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      );
  }
  const _renderHeader=(item, expanded) =>{
    return (
      <View style={{
        flexDirection: "row",
        padding: 30,
        justifyContent: "space-between",
        alignItems: "center" ,
         }}>
      <Text style={{ fontWeight: "400" ,fontSize:18,color:"#3F51B5"}}>
          {" "}{item.name}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove" />
          : <Icon style={{ fontSize: 18 }} name="add" />}
      </View>
    );
  }
  const _renderContent= (item)=>{
      const meal_choice = choices_list.filter(choices=>choices.period ==item.id)
      return (
          
        meal_choice.map(choice=>(
        <List>
            <ListItem onPress={() => {
          props.navigation.navigate({
            routeName: 'FavProducts',
            params: {
              choiceId: choice.id,
              periodId:item.id,
              title:choice.name
            }
          });
        }}>
              <Left>
                <Text style={{ fontWeight: "400" ,fontSize:14}}>{choice.name}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
        </List>
      ))  
    );
  }
  if(favorites != null){
    if(favorites.length == 0){
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text> {language.favNotFound}</Text>
        </View>
      );
    }
  return (
    
    <Container>
      
      <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            dataArray={periods_list}
            animation={true}
            expanded={true}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
          />
        </Content>
              
        <Footer style={{backgroundColor:"#fff"}}>
          <FooterTab style={{backgroundColor:"#4eb9cb"}}>
            <Button transparent vertical onPress={()=>props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#fff"}} />
              <Text style={{color:"#3F51B5"}}>{language.home}</Text>
            </Button>
            <Button transparent  onPress={()=>props.navigation.navigate({routeName:'Search',params:{headerTitle:this.props.language.search}})}>
              <Icon name="search" style={{color:"#fff"}}/>
              <Text style={{color:"#3F51B5"}}>{language.search}</Text>
            </Button>
            <Button rounded style={{backgroundColor:"#fff"}}  onPress={()=>props.navigation.navigate('BarcodeSearch')}>
              <Icon active name="barcode" style={{color:"#4eb9cb"}}/>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate({routeName:'Favourite',params:{headerTitle:this.props.language.favoriete}})}>
              <Icon name="favorite"  type='MaterialIcons' style={{color:"#fff"}}/>
              <Text style={{color:"#3F51B5"}}>{language.favoriete}</Text>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:"#fff"}} />
              <Text style={{color:"#3F51B5"}}>{language.profile}</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
}
};
FavScreeen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('headerTitle')
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FavScreeen;

