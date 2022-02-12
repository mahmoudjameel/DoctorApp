import React, { useState, useEffect, Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,ScrollView,Dimensions
} from 'react-native';
import {BASE_URL} from '../../store/constants'
import { Tab, Tabs, ScrollableTab, Container, Header, List, ListItem,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body} from 'native-base';
import * as productAction from '../../store/actions/products';
import * as diseasesAction from '../../store/actions/diseases';
import UserAvatar from 'react-native-user-avatar';
import {connect} from 'react-redux';
import AlternateProductsScreen from './AlternateProductsScreen';

class AlternateProductDetailsScreen extends Component{
    state={
        prodId:this.props.navigation.getParam('productId'),
        isFav:this.props.navigation.getParam('isFav'),
        product:'',
        deviceWidth: Dimensions.get("window").width
    }
    
    constructor (props){
        super(props);
      }
      async componentDidMount() {
        await this.props.fetchProduct(prodId=this.state.prodId)
        this.setState({product:this.props.product})
      }
    render(){
      
        if (this.props.product == null){
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#3F51B5" />
            </View>
            );
          }
          if(this.props.product != null){
             const diseaseStatusRender = (userdisease)=>{
              const disease=this.props.product.productdiseases_set.filter(productDiseases=>productDiseases.disease_category.id==userdisease.item.disease_category.id)
              if(disease.length==0){
                return(<ListItem>
                  <Left>
                    <Text>{userdisease.item.disease_category.name}</Text>
                  </Left>
                  <Right >
                  <Icon name='md-body'style={{color:"green",fontSize:28}} ></Icon>
                  </Right>
                </ListItem>);
              }
               else{
              return(
                disease.map(disease=>(
                  <ListItem>
                    <Left>
                      <Text>{disease.disease_category.name}</Text>
                    </Left>
                    <Right>
                      <Icon name='md-body'style={{color:disease.severity_color,fontSize:28}}></Icon>
                    </Right>
                  </ListItem>
                ))
              
              );}
              }
            
          return (
            <Container> 
              <ScrollView>
                <Card>
                  <CardItem>
                    
                    <Left>{this.props.product.image==null ? <UserAvatar name={this.props.product.product_name}  size={50} /> :<UserAvatar name={this.props.product.product_name} src={BASE_URL+this.props.product.image} size={50} />}
                     <Body><Text style={{fontWeight:"bold"}}>{this.props.product.product_name}</Text></Body>
                     </Left>
                      <Right>
                        <Icon name={this.state.isFav ? "favorite":"favorite-border"} type='MaterialIcons' style={{color:"#3F51B5"}}/>
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                        {this.props.product.description}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                  <Tabs tabBarInactiveTextColor="#4eb9cb" >
                      <Tab heading={this.props.language.content} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                        <View>
                        <List>
                    {this.props.product.contents.map(content => (
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
                      <Tab heading={this.props.language.productStatus} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                      <View>
                      <List>
                      <FlatList
                        keyExtractor={(item, index) => item.id.toString()}
                        data={this.props.userDetails.user_diseases}
                        renderItem={diseaseStatusRender}
                      />
                    </List>
                      </View>
                      </Tab>
                    </Tabs>
                    <Tabs>
                    <Tab heading={this.props.language.alternateProducts} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                        <AlternateProductsScreen {...this.props}/>
                      </Tab>
                    </Tabs>
                    
                    </ScrollView>
              </Container>
          );
          }
    }
}
mapStateToProps = (state) => ({
    product: state.product_details.productDetails,
    userDetails:state.userDetails.userDetails,
    language:state.selectdLanguage.selectdLanguage,
  })
const mapDispatchToProps = (dispatch) => ({
  fetchProduct:(prodId)=>dispatch(productAction.fetchContentList({id:prodId}))
});
export default connect(mapStateToProps,mapDispatchToProps)(AlternateProductDetailsScreen);