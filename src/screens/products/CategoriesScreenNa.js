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
import { Container,List, Header, Tab,Tabs, TabHeading,Footer, FooterTab, Content, Button, ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import ProductCategoryGridTile from '../../components/ProductCategoryGridTile';
import DiseaseCategoryGridTile from '../../components/DiseaseCategoryGridTile';
import PeriodGridTile from '../../components/PeriodGridTile';
import TabTitle from '../../components/TabTitle';
import { PRODUCT_CATEGORIES ,DISEASE_CATEGORIES,PERIODS, MEALS } from '../../data/dummy-data';
import * as productCategoryAction from '../../store/actions/productCategory';
import * as periodsAction from '../../store/actions/periods';
import * as diseaseAction from '../../store/actions/diseases'
import * as productsAction from '../../store/actions/products'


const CategoriesScreen = props => {
  
    
  const user_details = useSelector(state=>state.userDetails.userDetails);
  const user_id = user_details.user_id;
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
  const periods_list = useSelector(state=>state.periods.periods)
  const disease_categories = useSelector(state=>state.selectDiseases.diseasesCategories)
  

  const renderProductGridItem = itemData => {
    return (
      <ProductCategoryGridTile
        
        title={itemData.item.name}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'CategoryProduct',
            params: {
              categoryId: itemData.item.id,
              title:itemData.item.name
            }
          });
        }}
      />
    );
  };



  const renderDiseaseGridItem = itemData => {
    return (
      <DiseaseCategoryGridTile
        title={itemData.item.name}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'DiseaseProducts',
            params: {
              diseaseId: itemData.item.id,
              title:itemData.item.name
            }
          });
        }}
      />
    );
  };

  const renderPeriodsGridItem = itemData =>{
    return (
      <PeriodGridTile
        title={itemData.item.name}
        onSelect={() => {
          props.navigation.navigate({
            routeName: 'PeriodChoices',
            params: {
              periodId: itemData.item.id,
              title: itemData.item.name
            }
          });
        }}
      />
    );
  };
  
  return (
    
    <Container>
      <Tabs>
      <Tab heading={ <TabHeading><TabTitle title={'Meals'}/></TabHeading>}>
      {periods_list == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>:
      <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={periods_list}
          renderItem={renderPeriodsGridItem}
          numColumns={2}
        />
        }
      </Tab>
      <Tab heading={ <TabHeading><TabTitle title={'Products'}/></TabHeading>}>
        {product_categories == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred!</Text>
        <Button style={{color:"#3F51B5"}} onPress={loadProductCategories}>
          <Text style={{color:"#ffff"}}>Try Again</Text>
        </Button>
      </View> :
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={product_categories}
          renderItem={renderProductGridItem}
          numColumns={1}
        />
      }
      </Tab>
      <Tab heading={ <TabHeading><TabTitle title={'Diseases'}/></TabHeading>}>
      {disease_categories == null ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred!</Text>
        <Button style={{color:"#3F51B5"}} onPress={loadProductCategories}>
          <Text style={{color:"#ffff"}}>Try Again</Text>
        </Button>
      </View> :
        <FlatList
          keyExtractor={(item, index) => item.id.toString()}
          data={disease_categories}
          renderItem={renderDiseaseGridItem}
          numColumns={2}
        />
      }
        
      </Tab>
      </Tabs>
      
      <Footer>
          <FooterTab>
            <Button vertical>
              <Icon active name="apps" />
              <Text style={{color:"white"}}>Category</Text>
            </Button>
            <Button onPress={()=>props.navigation.navigate('Search')}>
              <Icon name="search" />
              <Text style={{color:"white"}}>Search</Text>
            </Button>
            <Button active onPress={()=>props.navigation.navigate('BarcodeSearch')}>
              <Icon active name="barcode"/>
              <Text style={{color:"white"}}>barcode</Text>
            </Button>
            <Button onPress={()=>props.navigation.navigate('Favourite')}>
              <Icon name="favorite"  type='MaterialIcons' />
              <Text style={{color:"white"}}>favorite</Text>
            </Button>
            <Button onPress={()=>props.navigation.navigate('Profile')}>
              <Icon name="person" />
              <Text style={{color:"white"}}>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
    </Container>
  );
};

export default CategoriesScreen;

