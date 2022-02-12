import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Container,List, Header, Card, Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import ProductCategoryGridTile from '../../components/ProductCategoryGridTile';
import DiseaseCategoryGridTile from '../../components/DiseaseCategoryGridTile';
import PeriodGridTile from '../../components/PeriodGridTile';
import TabTitle from '../../components/TabTitle';
import { PRODUCT_CATEGORIES ,DISEASE_CATEGORIES,PERIODS, MEALS } from '../../data/dummy-data';
import * as productCategoryAction from '../../store/actions/productCategory';
import * as periodsAction from '../../store/actions/periods';
import * as diseaseAction from '../../store/actions/diseases'
import * as productsAction from '../../store/actions/products'


const CategoryScreen = props => {
  
    
  const user_details = useSelector(state=>state.userDetails.userDetails);
  const user_id = user_details.user_id;
  const language = useSelector(state=>state.selectdLanguage.selectdLanguage);
  const dispatch = useDispatch();

  const loadProductCategories = useCallback(async () =>{
      await dispatch(productCategoryAction.fetchProductCategory());
  }, [dispatch]);
  const loadProducts = useCallback(async()=>{
    await dispatch(productsAction.fetchProducts(user_id))
  },[dispatch])
  const loadPeriods = useCallback(async()=>{
    await dispatch(periodsAction.fetchPeriods());
  },[dispatch])
  const loadDiseaseCategories = useCallback(async()=>{
    await dispatch(diseaseAction.fetchDiseaseCategories())
  },[dispatch])
  useEffect(() => {
    loadProductCategories();
    loadPeriods()
    loadDiseaseCategories();
    loadProducts();
  },[dispatch, loadProductCategories,loadPeriods,loadDiseaseCategories,loadProducts]);

  const product_categories = useSelector(state=>state.product_categories.availableProductCategories);

  const renderProductGridItem = itemData => {
    return (
      // <ProductCategoryGridTile
        
      //   title={itemData.item.name}
      //   onSelect={() => {
      //     props.navigation.navigate({
      //       routeName: 'CategoryProduct',
      //       params: {
      //         categoryId: itemData.item.id,
      //         title:itemData.item.name
      //       }
      //     });
      //   }}
     
      // />
      <Card style={{width:"90%", height:100,justifyContent:"center",backgroundColor:"#41AEA9", borderRadius:8,alignSelf:"center"}}>
      <List>
        <ListItem avatar noBorder onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoryProduct',
            params: {
              categoryId: itemData.item.id,
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
      
        {product_categories == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred!</Text>
        <Button style={{color:"#000"}} onPress={loadProductCategories}>
          <Text style={{color:"#000f"}}>Try Again</Text>
        </Button>
      </View> :
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={product_categories}
          renderItem={renderProductGridItem}
          numColumns={1}
        />
      }
      
      
      
      <Footer style={{backgroundColor:"#000"}}>
      <FooterTab style={{backgroundColor:"#dddddd"}}>
  
            <Button transparent vertical onPress={()=>props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{language.home}</Text>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate({routeName:'Search',params:{headerTitle:language.search}})}>
              <Icon name="search" style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{language.search}</Text>
            </Button>
            <Button rounded  style={{backgroundColor:"#009479",height:80}}  onPress={()=>props.navigation.navigate('BarcodeSearch')}>
              <Icon active name="barcode" style={{color:"#fff",fontSize:45}}/>
            </Button>
            <Button transparent onPress={()=>props.navigation.navigate({params:{headerTitle:language.favorieteCollections},routeName:'Favourite'})}>
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
CategoryScreen.navigationOptions = navigationData =>{
  
  return {
    headerTitle: navigationData.navigation.getParam('headerTitle')
  };
}

export default CategoryScreen;

