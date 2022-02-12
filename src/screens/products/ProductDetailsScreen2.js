import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,ScrollView
} from 'react-native';
import {BASE_URL} from '../../store/constants'
import { useSelector, useDispatch } from 'react-redux';
import { Tab, Tabs, ScrollableTab, Container, Header, List, ListItem,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body} from 'native-base';
import * as productAction from '../../store/actions/products';
import * as diseasesAction from '../../store/actions/diseases';
import UserAvatar from 'react-native-user-avatar';

const ProductDetailsScreen = props => {
  const prodId = props.navigation.getParam('productId');
  const isFav = props.navigation.getParam('isFav')
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productAction.fetchContentList({id:prodId}));
  }, [dispatch]);

  const product = useSelector(state => state.product_details.productDetails);
  
  
  const userDetails = useSelector(state=>state.userDetails.userDetails)
  
  
  if (product == null){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3F51B5" />
    </View>
    );
  }
  if(product != null){
     const diseaseStatusRender = (userdisease)=>{
      const disease=product.productdiseases_set.filter(productDiseases=>productDiseases.disease_category.id==userdisease.item.disease_category.id)
       
       if(disease.length>0){
      return(
        disease.map(disease=>(
          <ListItem>
            <Left>
              <Text>{disease.disease_category.name}</Text>
            </Left>
            <Right>
              <Thumbnail small style={{backgroundColor:disease.severity_color}}/>
            </Right>
          </ListItem>
        ))
      
      );}
      else{
        return(<ListItem>
          <Left>
            <Text>{userdisease.item.disease_category.name}</Text>
          </Left>
          <Right >
          <Thumbnail small style={{backgroundColor:"green"}}/>
          </Right>
        </ListItem>);
      }
      }
    
  return (
    <Container> 
      <ScrollView>
        <Card>
          <CardItem>
            <Left>{product.image==null ? <UserAvatar name={product.product_name} size={50} /> :<UserAvatar name={product.product_name} src={BASE_URL+product.image} size={50} />}
             <Body><Text style={{fontWeight:"bold"}}>{product.product_name}</Text></Body>
             </Left>
              <Right>
                <Icon name={isFav ? "favorite":"favorite-border"} type='MaterialIcons' style={{color:"#3F51B5"}}/>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                {product.description}
                </Text>
              </Body>
            </CardItem>
          </Card>
          <Tabs renderTabBar={()=> <ScrollableTab />}>
            <Tab heading="Disease Status">
              <View>
              <List>
              <FlatList
                keyExtractor={(item, index) => item.id.toString()}
                data={userDetails.user_diseases}
                renderItem={diseaseStatusRender}
              />
            </List>
              </View>
              </Tab>
              <Tab heading="Content">
                <View>
                <List>
            {product.contents.map(content => (
            <ListItem >
              <Left>
                <Text>{content.content_name}</Text>
              </Left>
              <Right>
              <Text>{content.quantity}({content.units.name})</Text>
            </Right>
            </ListItem>
            ))}
          </List>
                </View>
              </Tab>
            </Tabs>
            </ScrollView>
      </Container>
  );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductDetailsScreen;
