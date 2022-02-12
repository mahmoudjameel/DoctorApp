import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import { Container, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Picker,Input} from "native-base";
import MealItem from '../../components/MealItem';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as productsActions from '../../store/actions/products';
import * as addFavouritAction from '../../store/actions/favourites';
import * as periodsAction from '../../store/actions/periods';
import * as choicesAction from '../../store/actions/choices'


class FavProductsScreen extends Component{
  state={
    periodId :this.props.navigation.getParam('periodId'),
    choiceId :this.props.navigation.getParam('choiceId')
  }
    constructor (props){
        super(props);
      }

      componentDidMount() {
        this.props.fetchProducts(user_id=this.props.authInfo.userDetails.user_id)
        this.props.fetchChoices()
      }

      setPeriodsModalVisible(visible,product_id) {
        
        
        this.setState({addFavProductId:product_id})
        this.setState({periodsModalVisible: visible});
      }
      setChoiceModalVisible(visible,period_id){
        
        
        this.setState({addFavPeriodId:period_id});
        this.setState({periodsModalVisible:!visible})
        this.setState({choiceModalVisible:visible});        
      }
      addToFav = (user_id,product_id,period_id,choice_id)=>{
    
        this.props.addFavourites(user_id=user_id,product_id=product_id,period_id=period_id,choice_id=choice_id);
        this.setState({choiceModalVisible:false})
      }
      removeFav =(user_id,product_id)=>{
          
        this.props.addFavourites(user_id=user_id,product_id=product_id);
      } 
      render(){
        
        if(this.props.favouritProducts.favourites == null){
          return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View> 
          )
        }
        const favProducts = this.props.favouritProducts.favourites.filter(prod=>prod.period.id === this.state.periodId && prod.choice.id===this.state.choiceId)
        
        const renderProductItem = itemData =>{
          if(this.props.favouritProducts.favourites != null){
            if(this.props.favouritProducts.favourites.length > 0){
              
           const productId = itemData.item.product.id
           
           
           return(  <MealItem
                 title={itemData.item.product.product_name}
                 complexity={itemData.item.product.description}
                 favIcon = {"favorite"}
                 onSelectMeal={() => {
                   this.props.navigation.navigate({
                     routeName: 'ProductDetails',   
                     params: {
                       productId: itemData.item.product.id,
                       diseaseCategory:itemData.item.product.disease_category,
                       isFav:true
                     }
                   });
                 }}
                 onFavSelect={()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId)}
               />
           );
         }
        }
       };
        return(
          <View style={styles.screen}>
          <FlatList
            data={favProducts}
            keyExtractor={(item ) => item.id.toString()}
            renderItem={renderProductItem}
            style={{ width: '100%' }}
          />
        </View>
        )
      }
}

FavProductsScreen.navigationOptions = navigationData => {
  return {
    headerTitle: navigationData.navigation.getParam('title')
  };
};  

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomModal: {
    margin: 0, 
    backgroundColor: 'white', 
    height: "50%", 
    flex:0 , 
    bottom: 0, 
    position: 'absolute',
    width: '100%'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
});



mapStateToProps = (state) => ({
    availableProducts: state.product,
    authInfo:state.userDetails,
    favouritProducts:state.favourites,
    periodsList:state.periods,
    choiceList:state.choices
  })
const mapDispatchToProps = (dispatch) => ({
  fetchProducts:(user_id)=>dispatch(productsActions.fetchProducts(user_id)),
  addFavourites:(user_id,product_id,period_id,choice_id)=>dispatch(addFavouritAction.addFavouritList(user_id,product_id,period_id,choice_id)),
  fetchPeriods:()=>dispatch(periodsAction.fetchPeriods()),
  fetchChoices:()=>dispatch(choicesAction.fetchChoices())
});
export default connect(mapStateToProps,mapDispatchToProps)(FavProductsScreen);