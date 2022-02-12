import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet,ActivityIndicator,Modal } from 'react-native';
import { Container, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Picker,Text,Input} from "native-base";
import { useSelector,useDispatch } from 'react-redux';
import MealItem from '../../components/MealItem';
import * as productsActions from '../../store/actions/products';
import * as addFavouritAction from '../../store/actions/favourites'


const CategoryProductsScreen = props => {
  const [isLoading,setIsLoading] = useState(false);
  const[modalVisible,setModalVisible]=useState(false)
  const catId = props.navigation.getParam('categoryId');
  const dispatch = useDispatch();
  const user_details = useSelector(state => state.userDetails.userDetails);

  const loadProducts = useCallback(async () =>{
    setIsLoading(true)
    await dispatch(productsActions.fetchProducts(user_id=user_details.user_id));
    setIsLoading(false)
  }, [dispatch, setIsLoading]);
  

  const addToFav = (user_id,product_id,period_id,choice_id)=>{
    
    dispatch(addFavouritAction.addFavouritList(user_id=user_id,product_id=product_id,period_id=period_id,choice_id=choice_id));
  }

  useEffect(() => {
  loadProducts();
  },[dispatch, loadProducts]);

  const availableProducts = useSelector(state => state.product.availableProducts);
  const favouritesProduct = useSelector(state=>state.favourites.favourites)

  if (availableProducts == null && favouritesProduct == null){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }
    
    const categoryProducts = availableProducts.filter(prod=>prod.product_category === catId)
    
    const renderProductItem = itemData =>{
     if(favouritesProduct != null){
      const productId = itemData.item.id
      const prodIsFav = favouritesProduct.some(fav=>fav.product.id === productId)
      
      return(  <MealItem
            title={itemData.item.product_name}
            complexity={itemData.item.description}
            favIcon = {prodIsFav ? "favorite":"favorite-border"}
            onSelectMeal={() => {
              props.navigation.navigate({
                routeName: 'ProductDetails',   
                params: {
                  productId: itemData.item.id,
                  diseaseCategory:itemData.item.disease_category
                }
              });
            }}
            onFavSelect={()=>addToFav(user_id=user_details.user_id,product_id=itemData.item.id,period_id=1,choice_id=1)}
          />
      );
    

    }
    return(  <MealItem
      title={itemData.item.product_name}
      complexity={itemData.item.description}
      favIcon = {"favorite-border"}
      onSelectMeal={() => {
        props.navigation.navigate({
          routeName: 'ProductDetails',   
          params: {
            productId: itemData.item.id,
            diseaseCategory:itemData.item.disease_category
          }
        });
      }}
      onFavSelect={()=>addToFav(user_id=user_details.user_id,product_id=itemData.item.id,period_id=1,choice_id=1)}
    />
);
  };
  
    
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
    
  }

  if (!isLoading && categoryProducts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found. Maybe we will adding some!</Text>
      </View>
    );
  }
    return (
      <View style={styles.screen}>
        <FlatList
          data={categoryProducts}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
    );
    
  }
  
CategoryProductsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('title')
  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CategoryProductsScreen;
