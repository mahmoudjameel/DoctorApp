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
import UserAvatar from 'react-native-user-avatar';
import {connect} from 'react-redux';
import AlternateProductsScreen from './AlternateProductsScreen';
import checkDiseaseSeverity from '../products/DiseasesAlgorithm';


class ProdutDetailsScreen extends Component{
    state={
      isLoading:true,
        product:null
       
    }
    
    constructor (props){
        super(props);
      }
      async componentDidMount() {
        await this.setState({product:this.props.navigation.getParam('product')})
        this.setState({isLoading:false})
      }
    render(){
     if (this.state.isLoading == true){
            return (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#3F51B5" />
            </View>
            );
          }
          if(this.state.product != null){
            
          return (
           
            <Container> 
              
              <Content>
                <Card>
              
                  <CardItem>
                 
                    <Left>{this.state.product.packaging_photos.front.small==null ? <UserAvatar name={this.state.product.name}  size={50} /> :<UserAvatar name={this.state.product.name} src={this.state.product.packaging_photos.front.small} size={50} />}
                     <Body><Text style={{fontWeight:"bold"}}>{this.state.product.name}</Text></Body>
                     </Left>
                      <Right>
                        {/* <Icon name={this.state.isFav ? "favorite":"favorite-border"} type='MaterialIcons' style={{color:"#3F51B5"}}/> */}
                      </Right>
                    </CardItem>
                    <CardItem>
                      <Body>
                        <Text>
                        <Text style={{fontWeight:"bold"}}>Brand:</Text> {this.state.product.brand}
                        </Text>
                        <Text>
                        <Text style={{fontWeight:"bold"}}>Barcode:</Text> {this.state.product.barcode}
                        </Text>
                        <Text>
                        <Text style={{fontWeight:"bold"}}>Countries:</Text> {this.state.product.countries.map(country => (
                          <Text> {country}</Text>
                    ))}
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
                  <Tabs tabContainerStyle="border" tabBarInactiveTextColor="#009479">
                      <Tab heading={this.props.language.content} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#009479"}:{color:"#009479"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
                      <ScrollView>
                     
                        <View>
                        <List>
                    {this.state.product.nutrients.map(nutrients => (
                    <ListItem >
                      <Left>
                        <Text style={{fontWeight:"bold"}}>{nutrients.name}</Text>
                      </Left>
                      <Right>
                      <Text>{nutrients.per_100g}({nutrients.measurement_unit})/per 100g</Text>
                    </Right>
                    </ListItem>
                    ))}
                  </List>
                        </View>
                        </ScrollView>  
                      </Tab>
                    
                         <Tab heading={this.props.language.productStatus} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#009479"}:{color:"#009479"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
             {this.props.userDetails.user_diseases.map(disease => (
            <List>
             <ListItem>
                <Left>
                   <Text style={{fontWeight: '400',fontWeight:"bold", fontSize: 15}}>
                   {disease.disease_category.name}
                   </Text>
                </Left>
                <Right>
                {checkDiseaseSeverity(disease.disease_category.name,this.state.product.nutrients)=="NA" ? <Text>Na</Text> : <Icon name='md-body'style={{color:checkDiseaseSeverity(disease.disease_category.name,this.state.product.nutrients),fontSize:28}} ></Icon>}

                </Right>
             </ListItem>
           </List>
            ))}
         <Tabs>
           <Tab heading={this.props.language.alternateProducts} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}} 
                textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#009479"}:{color:"#009479"}} 
                tabStyle={{backgroundColor:"#fff"}} 
                activeTabStyle={{backgroundColor:"#009479"}}> 
               <View>
                 <ScrollView>
                 <List>
                  <ListItem >
                    <Left>
                      <Text style={{fontWeight:"bold"}}>{this.state.product.diet_labels.vegan.name}</Text>
                    </Left>
                     {this.state.product.diet_labels.vegan.is_compatible ==null ? <Right>
                    <Text>NA</Text>
                    </Right>:<Right>
                      {this.state.product.diet_labels.vegan.is_compatible==true ?  <Icon name='md-body'style={{color:"green",fontSize:28}} ></Icon>: <Icon name='md-body'style={{color:"red",fontSize:28}} ></Icon>}
                    </Right>}
                  </ListItem>
                 <ListItem >
                    <Left>
                      <Text style={{fontWeight:"bold"}}>{this.state.product.diet_labels.vegetarian.name}</Text>
                    </Left>
                   {this.state.product.diet_labels.vegetarian.is_compatible ==null ? <Right>
                   <Text>NA</Text>
                  </Right>:<Right>
                      {this.state.product.diet_labels.vegetarian.is_compatible==true ?  <Icon name='md-body'style={{color:"green",fontSize:28}} ></Icon>: <Icon name='md-body'style={{color:"red",fontSize:28}} ></Icon>}
                  </Right>}
                  </ListItem>
                  <ListItem >
                    <Left>
                      <Text style={{fontWeight:"bold"}}>{this.state.product.diet_labels.gluten_free.name}</Text>
                    </Left>
                   {this.state.product.diet_labels.gluten_free.is_compatible ==null ? <Right>
                   <Text>NA</Text>
                  </Right>:<Right>
                      {this.state.product.diet_labels.gluten_free.is_compatible==true ?  <Icon name='md-body'style={{color:"green",fontSize:28}} ></Icon>: <Icon name='md-body'style={{color:"red",fontSize:28}} ></Icon>}
                  </Right>}
                  </ListItem>
                   </List>
                   </ScrollView>
               </View>
             </Tab>
           </Tabs> 
       </Tab>
       
   </Tabs>
   </Content>
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
export default connect(mapStateToProps,mapDispatchToProps)(ProdutDetailsScreen);