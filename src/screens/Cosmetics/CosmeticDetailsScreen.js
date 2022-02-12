import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,ScrollView,Dimensions,Image
} from 'react-native';
import {BASE_URL} from '../../store/constants'
import { Tab, Tabs, ScrollableTab, Container, Header, List, ListItem,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body} from 'native-base';
import * as cosmeticAction from '../../store/actions/cosmetics'
import {connect} from 'react-redux';


class CosmeticDetailsScreen extends Component{
    state={
        loading:true,
        id:''
    }
    constructor (props){
        super(props);
        console.log(this.props.userDetails.user_diseases);
      }
   async componentDidMount(){
        this.setState({loading:true,medicationId:this.props.navigation.getParam('id')})
        const id =this.props.navigation.getParam('id')
        await this.props.fetchCosmeticDetails(id)
        this.setState({loading:false})
    }
    render(){
        if (this.state.loading == true) {
            return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
              </View> 
              )
        }
        else{
            const diseaseStatusRender = (userdisease)=>{
                const disease=this.props.cosmeticDetails.cosmeticseverityfordisease_set.filter(diseases=>diseases.disease.id==userdisease.item.disease_category.id)
                if(disease.length==0){
                  return(<ListItem>
                    <Left>
                      <Text>{userdisease.item.disease.name}</Text>
                    </Left>
                    <Right >
                    <Icon name='md-body'style={{color:"green",fontSize:28}} ></Icon>
                    </Right>
                  </ListItem>);
                }
                 else{
                return(
                  disease.map(dis=>(
                    <ListItem>
                      <Left>
                        <Text>{dis.disease.name}</Text>
                      </Left>
                      <Right>
                        <Icon name='md-body'style={{color:dis.color,fontSize:28}}></Icon>
                      </Right>
                    </ListItem>
                  ))
                
                );}
            }
            const renderMedication = itemData =>{
          
                return(                      
                <ListItem thumbnail onPress={()=>this.props.navigation.push('cosmeticDetails',
                    {
                       medicationId:itemData.item.alternate_cosmetic.id,
                     }
                )}>
                     <Left>
                         <Thumbnail square source={{uri:BASE_URL+itemData.item.alternate_cosmetic.image}} />
                     </Left>
                     <Body>
                         <Text style={{fontWeight:"bold"}}>{itemData.item.alternate_cosmetic.name}</Text>
                         <Text note numberOfLines={1}>{itemData.item.alternate_cosmetic.medicen_type}</Text>
                     </Body>
                 </ListItem>
                );
            };
            
            return(
                <Container>
                    <Content>
                    <Content padder>
                        <Text>{this.props.cosmeticDetails.name}</Text>
                        <Text note>{this.props.cosmeticDetails.manufacturer}</Text>
                        <Image source={{uri:BASE_URL+this.props.cosmeticDetails.image}} style={{height: 200, width: 200, flex: 1,alignSelf:"center",justifyContent:"center"}}/>
                    </Content>
                        <Card>
                            <CardItem header bordered>
                                <Text>Description</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                    {this.props.cosmeticDetails.description}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        {/* <Tabs tabContainerStyle="border" tabBarInactiveTextColor="#4eb9cb">
                                <Tab heading="Disease Severity" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                                <View>
                                  <List>
                                    <FlatList
                                        keyExtractor={(item, index) => item.id.toString()}
                                        data={this.props.userDetails.user_diseases}
                                        renderItem={diseaseStatusRender}
                                        extraData={this.props}
                                    />
                                </List>
                                </View>
                                </Tab>
                                <Tab heading="Alergic For Diseases" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                                <View>
                                  <List>
                                            {this.props.cosmeticDetails.cosmeticalergicfordisease_set.map(diseases => (
                                    <ListItem >
                                    <Left>
                                        <Text>{diseases.disease.name}</Text>
                                    </Left>
                                    <Right/>
                                    </ListItem>
                                    ))}
                                </List>
                                </View>
                                </Tab>
                            </Tabs> */}
                            <Tabs tabContainerStyle="border" tabBarInactiveTextColor="#4eb9cb">
                                    <Tab heading="Content" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                                    <View>
                                    <List>
                                                {this.props.cosmeticDetails.contents.map(content => (
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
                                <Card>
                            <CardItem header bordered>
                                <Text>Alternate Cosmetics</Text>
                            </CardItem>
                            <CardItem>
                                <List>
                                    <FlatList
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        legacyImplementation={false}
                                        data={this.props.cosmeticDetails.cosmetic_alt}
                                        keyExtractor={(item ) => item.id.toString()}
                                        renderItem={renderMedication}
                                        extraData={this.props}
                                    />
                                </List>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            );
        }
        
    }
}

mapStateToProps = (state) => ({
    language:state.selectdLanguage.selectdLanguage,
    userDetails:state.userDetails.userDetails,
    cosmetics:state.cosmetics.cosmetics,
    categories:state.cosmeticsCategories.cosmeticsCategories,
    cosmeticDetails:state.cosmeticDetails.cosmeticDetails
  })
const mapDispatchToProps = (dispatch) => ({
    fetchCosmeticDetails:(id)=>dispatch(cosmeticAction.fetchCosmeticsDetails(id)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(CosmeticDetailsScreen);