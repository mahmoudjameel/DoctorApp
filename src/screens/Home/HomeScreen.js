import React, { Component } from 'react';
import {StyleSheet,Image,ImageBackground,View,ScrollView,Dimensions,Linking,TouchableOpacity} from 'react-native';
import { Container, Header, Title, Content, Tab, Tabs, ScrollableTab, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Col,Row } from 'native-base';
import HealthyFood from './HealthyFood'
import ComingSoon from '../../screens/ComingSoon';
import {connect} from 'react-redux';
import DrTreatment from './DrTreatment';

import MedicationScreen from './MedicationScreen'
import PesticidesScreen from './PesticidesScreen';
//import CosmeticsScreen from './CosmeticsScreen';
import MenuScreen from './MenuScreen'


class HomeScreen extends Component {
  state={
    deviceWidth: Dimensions.get("window").width
  }
  constructor (props){
    super(props);  
   
    
  }


  open_hecpharmacy = () => {

   
    Linking.openURL('hecpharmacy://app');
  }
  
  _onSearch=()=>{
        
    this.props.navigation.navigate({
      routeName: 'SearchResult',
      params:{
        searchData:this.state.searchData,
        productCatId:this.state.productCatId,
        diseaseCatId:this.state.diseaseCatId,
        periodId:this.state.periodId,
        title:'Search Result'
      }
    })
  
  }
  render() {
    return (
      <Container>

        <Header style={{backgroundColor:"white",borderBottomColor:"#4eb9cb"}} >
          <Row style={{width:"100%"}}>
              <Col style={{width:"100%"}}>
                <Image source={require('../../assets/homelogo.png')}  style={{marginLeft:"2%",width:'80%', height:'100%'}} resizeMode={'cover'}></Image>
        
              </Col>
              <Col>
                <Icon name="person-outline" type="MaterialIcons" style={{fontSize:42,color:"#4eb9cb",textAlign:"right"}} onPress={()=>this.props.navigation.navigate('Profile')}></Icon>
              </Col>
          </Row>

        </Header>
        <Tabs tabBarInactiveTextColor="#4eb9cb" tabBarUnderlineStyle={{ backgroundColor:"#fff" }} renderTabBar={()=> <ScrollableTab />}>


   
        
          <Tab heading={this.props.language.healthyfood}  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            
              <HealthyFood {...this.props}/>
          </Tab>
          <Tab heading={this.props.language.DrTreatment}  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            <DrTreatment {...this.props}/>
          </Tab>
          <Tab heading={this.props.language.hecpharmace} onPress={this.open_hecpharmacy}  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            
           
          </Tab>
          <Tab heading="Pesticides"  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            <PesticidesScreen {...this.props}/>
          </Tab>
          <Tab heading="Cosmetics"  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            <CosmeticsScreen {...this.props}/>
          </Tab>
      
          <Tab heading="menu"  activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
            <MenuScreen {...this.props}/>
          </Tab>
      
        </Tabs>
      </Container>
    );
  }
}

mapStateToProps=(state)=>({
  language:state.selectdLanguage.selectdLanguage,
  userInfo: state.userDetails,
 
})
const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    chatLogin:(param)=>dispatch(authAction.chatsignIn(param))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);