import React, { Component} from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator ,ScrollView} from 'react-native';
import { Container, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Picker,Input} from "native-base";
import MealItem from '../../components/MealItem';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as productsActions from '../../store/actions/products';
import * as productAction from '../../store/actions/products';
import * as addFavouritAction from '../../store/actions/favourites';
import * as periodsAction from '../../store/actions/periods';
import * as choicesAction from '../../store/actions/choices';



class AlternateProductsScreen extends Component{
  state={
    periodsModalVisible : false,
    addFavProductId:null,
    choiceModalVisible:false,
    addFavPeriodId:null,
    addFavChoiceId:null

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
        
        this.setState({periodsModalVisible:!visible});
        this.setState({addFavPeriodId:period_id});
      }
      addToFav = (user_id,product_id,period_id,choice_id)=>{
    
        this.props.addFavourites(user_id=user_id,product_id=product_id,period_id=period_id,choice_id=choice_id);
        this.setState({choiceModalVisible:false})
      }
      removeFav =(user_id,product_id)=>{
          
        this.props.addFavourites(user_id=user_id,product_id=product_id);
      } 
      render(){
        
        if(this.props.availableProducts.availableProducts == null){
          return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View> 
          )
        }        
        if(this.props.product.alternate_products.length==0){
            return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{this.props.language.alternateProductsNotFound}</Text>
          </View> 
            )
          }
        
        const mealProducts = this.props.product.alternate_products
        
        const renderPeriods = itemData=>{
          return(
            <ListItem onPress={()=>this.setChoiceModalVisible(visible=true,period_id=itemData.item.id)}>
                <Body>
                <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
                </Body>
              </ListItem>
          )
        }
        const renderChoices = itemData=>{
          return(
            <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
                <Body>
                <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
                </Body>
              </ListItem>
          )
        }
        
        const renderProductItem = itemData =>{
            
            if(this.props.favouritProducts.favourites != null){
              if(this.props.favouritProducts.favourites.length > 0){
                
             const productId = itemData.item.alt_product.id
             const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
             
             return(  <MealItem
                   title={itemData.item.alt_product.product_name}
                   complexity={itemData.item.alt_product.description}
                   favIcon = {prodIsFav ?"favorite":"favorite-border"}
                   onSelectMeal={() => {
                    this.props.navigation.navigate({
                      routeName: 'AlternateProductDetails',   
                      params: {
                        productId: itemData.item.alt_product.id,
                        isFav:false
                           }
                     });
                   }}
                   onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
                 />
             );
           }
          }
           if(this.props.favouritProducts.favourites != null){
           if(this.props.favouritProducts.favourites.length == 0){
            const productId = itemData.item.alt_product.id
           return(  <MealItem
             title={itemData.item.alt_product.product_name}
             complexity={itemData.item.alt_product.description}
             favIcon = {"favorite-border"}
             onSelectMeal={() => {
              this.props.navigation.push('ProductDetails',   
                {
                  productId: itemData.item.alt_product.id,
                  isFav:false
                     }
               );
             }}
              onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
              />);
            }
          }
       };
        return(
          <View style={styles.screen}>
            <Modal
            onBackdropPress={() => this.setState({ periodsModalVisible: false })}
            isVisible={this.state.periodsModalVisible} style={styles.bottomModal} onDismiss={()=>this.setState({choiceModalVisible:visible})}>
            <Header style={{borderTopRadius:7}}>
            <Left>
              <Button transparent onPress={() => {
                  this.setState({periodsModalVisible:false});}}>
                    <Icon name='md-close'/>
              </Button>
            </Left>
              <Body>
                <Title>{this.props.language.addToMeal}</Title>
              </Body>
            </Header>
            <ScrollView style={styles.modalContent}>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={this.props.periodsList.periods}
              renderItem={renderPeriods}
              extraData={this.props}
              /> 
            </ScrollView>
          </Modal>
          <Modal
            onBackdropPress={() => this.setState({ choiceModalVisible: false })}
            isVisible={this.state.choiceModalVisible} style={styles.bottomModal}>
            <Header style={{borderTopRadius:7}}>
            <Left>
              <Button transparent onPress={() => {
                  this.setState({choiceModalVisible:false});}}>
                    <Icon name='md-close'/>
              </Button>
            </Left>
              <Body>
                <Title>{this.props.language.addToChoice}</Title>
              </Body>
            </Header>
            <ScrollView style={styles.modalContent}>
            <FlatList
              keyExtractor={(item, index) => item.id.toString()}
              data={this.props.choiceList.choices}
              renderItem={renderChoices}
              /> 
            </ScrollView>
          </Modal>
          <FlatList
            data={mealProducts}
            keyExtractor={(item ) => item.id.toString()}
            renderItem={renderProductItem}
            style={{ width: '100%' }}
          />
        </View>
        )
      }
}
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
    borderRadius:7,
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
    choiceList:state.choices,
    language:state.selectdLanguage.selectdLanguage,
  })
const mapDispatchToProps = (dispatch) => ({
  fetchProducts:(user_id)=>dispatch(productsActions.fetchProducts(user_id)),
  addFavourites:(user_id,product_id,period_id,choice_id)=>dispatch(addFavouritAction.addFavouritList(user_id,product_id,period_id,choice_id)),
  fetchPeriods:()=>dispatch(periodsAction.fetchPeriods()),
  fetchChoices:()=>dispatch(choicesAction.fetchChoices()),
  fetchProduct:(prodId)=>dispatch(productAction.fetchContentList({id:prodId}))
});
export default connect(mapStateToProps,mapDispatchToProps)(AlternateProductsScreen);