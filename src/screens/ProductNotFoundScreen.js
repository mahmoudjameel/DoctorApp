import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator,Alert ,ScrollView} from 'react-native';
import { Container,Content, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem,Textarea,Label,CheckBox,Picker,Input} from "native-base";
import {connect} from 'react-redux';
import * as mailAction from '../store/actions/sendMail';

class ProductNotFountScreen extends Component{
    state={
        newProductName:'',
        newProductBarcode:this.props.navigation.getParam('barCode'),
        newProductType:this.props.navigation.getParam('type'),
        newProductDiscription:'',
    
        userName:this.props.authInfo.userDetails.name,
        userEmail:this.props.authInfo.userDetails.email,
    }
    constructor (props){
        super(props);
        this.props.navigation.setParams({
          Title: this.props.language.searchResult
        });
      }
      _onSubmitNewProduct=()=>{
        console.log(this.state.userName);
        
         
        this.props.sendProductDetails(this.state.newProductName,this.state.newProductBarcode,
          this.state.newProductDiscription,this.state.userEmail,this.state.userName,this.state.newProductType)
        
      }
      render(){
        if(this.props.sendInfo.isSuccess===true){
          Alert.alert(this.props.language.thankYou,this.props.language.forContribution,[{text:this.props.language.ok}]);
          this.props.navigation.navigate('Home')
        }
        return(
            <Container>
            <Content padder style={{marginTop:"20%"}}>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.productNotFound}</Text>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.helpAddingProduct}</Text>
              <Form style={{marginTop:"10%"}}>
                <Textarea rowSpan={2} bordered placeholder={this.props.language.productName} onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
                <Textarea rowSpan={2} bordered placeholder={this.props.language.barcode} onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
                <Textarea rowSpan={5} bordered placeholder={this.props.language.description} onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
              </Form>
              <Button rounded style={{width:"60%",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        marginTop:"5%",
        backgroundColor:"#009479",
        }} onPress={this._onSubmitNewProduct}> 
                <Text style={{fontSize:22,textAlign:"center",width:"100%",color:"white"}} >{this.props.language.submit}</Text>
              </Button>
            </Content>
              </Container>
          )
      }
}

ProductNotFountScreen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('Title'),
  };
}

mapStateToProps = (state) => ({
    authInfo:state.userDetails,
    sendInfo:state.auth,
    language:state.selectdLanguage.selectdLanguage,
  })
  const mapDispatchToProps = (dispatch) => ({
    sendProductDetails:(product_name,product_barcode,description,email,username,type)=>dispatch(mailAction.sendMail(product_name,product_barcode,description,email,username,type)),
  });
  export default connect(mapStateToProps,mapDispatchToProps)(ProductNotFountScreen);
