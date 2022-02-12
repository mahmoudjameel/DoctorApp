import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator,Alert ,ScrollView} from 'react-native';
import { Container,Content, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem,Textarea,Label,CheckBox,Picker,Input} from "native-base";
import colors from '../styles/colors';
import MealItem from '../components/MealItem';
import {connect} from 'react-redux';
import * as champSearchAction from '.././store/actions/champProducts'

class ChampProducNameScreen extends Component{
    state = {
        isLoading:true,
    }
async componentDidMount(){
    await this.props.fetchProductsByName(this.props.navigation.getParam('name'));
    this.setState({isLoading:false})

}
    render(){
        const renderProductItem = itemdata =>{
            console.log(itemdata);
            return(<MealItem
                title={itemdata.item.name}
                imgsrc = {itemdata.item.packaging_photos.front.small}
                complexity={itemdata.item.brand}
                
                onSelectMeal={() => {
                  this.props.navigation.navigate({
                    routeName: 'ProductDetails',   
                    params: {
                      product: itemdata.item,
                         }
                   });
                 }}
                 
                 />);
        }
        if(this.state.isLoading == true){
            return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3F51B5" />
          </View> 
            )
          }
         return( <View style={styles.screen}>
           
            <FlatList
          data={this.props.champProducts.champProducts.items}
          keyExtractor={(item, index) => item.key}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
          extraData={this.props}
        />
      
        </View>)
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
    userInfo:state.userDetails,
    champProducts:state.champProducts,
    language:state.selectdLanguage.selectdLanguage,
  })
  const mapDispatchToProps = (dispatch) => ({
    fetchProductsByName:(name)=>dispatch(champSearchAction.fetchProductsByName(name))
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ChampProducNameScreen);