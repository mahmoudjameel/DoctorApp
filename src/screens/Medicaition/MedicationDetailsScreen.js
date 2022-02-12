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
import * as medicationAction from '../../store/actions/medications';
import {connect} from 'react-redux';


class MedicationDetailsScreen extends Component{
    state={
        loading:true,
        medicationId:''
    }
    constructor (props){
        super(props);
      }
   async componentDidMount(){
        this.setState({loading:true,medicationId:this.props.navigation.getParam('medicationId')})
        const id =this.props.navigation.getParam('medicationId')
        await this.props.fetchMedicationDetails(id)
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
                const disease=this.props.medicationDetails.severityfordisease_set.filter(diseases=>diseases.disease.id === userdisease.item.disease_category.id)
                console.log(disease);
                if(disease.length==0){
                    console.log(userdisease);
                    
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
                <ListItem thumbnail onPress={()=>this.props.navigation.push('MedicationDetails',
                    {
                       medicationId:itemData.item.alternate_medication.id,
                     }
                )}>
                     <Left>
                         <Thumbnail square source={{uri:BASE_URL+itemData.item.alternate_medication.image}} />
                     </Left>
                     <Body>
                         <Text style={{fontWeight:"bold"}}>{itemData.item.alternate_medication.name}</Text>
                         <Text note numberOfLines={1}>{itemData.item.alternate_medication.medicen_type}</Text>
                     </Body>
                 </ListItem>
                );
            };
            
            return(
                <Container>
                    <Content>
                    <Content padder>
                        <Text>{this.props.medicationDetails.name}</Text>
                        <Text note>{this.props.medicationDetails.manufacturer}</Text>
                        <Image source={{uri:BASE_URL+this.props.medicationDetails.image}} style={{height: 200, width: 200, flex: 1,alignSelf:"center",justifyContent:"center"}}/>
                    </Content>
                        <Card>
                            <CardItem header bordered>
                                <Text style={{color:"#009479"}}>Description</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                    {this.props.medicationDetails.description}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Tabs tabContainerStyle="border" tabBarInactiveTextColor="#4eb9cb">
                                <Tab heading="Disease Severity" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
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
                                <Tab heading="Alergic For Diseases" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
                                <View>
                                  <List>
                                            {this.props.medicationDetails.alergicfordisease_set.map(diseases => (
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
                            </Tabs>
                            <Tabs tabContainerStyle="border" tabBarInactiveTextColor="#4eb9cb">
                                    <Tab heading="Content" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
                                    <View>
                                    <List>
                                                {this.props.medicationDetails.contents.map(content => (
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
                                    <Tab heading="Interaction Drug" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
                                    <View>
                                    <List>
                                                {this.props.medicationDetails.medication_intraction.map(medication => (
                                        <ListItem >
                                        <Left>
                                            <Text>{medication.Intraction_medication.name}</Text>
                                        </Left>
                                        <Right/>
                                        </ListItem>
                                        ))}
                                    </List>
                                    </View>
                                    </Tab>
                                </Tabs>
                                <Card>
                            <CardItem header bordered>
                                <Text style={{color:"#009479"}}>Alternate Medicens</Text>
                            </CardItem>
                            <CardItem>
                                <List>
                                    <FlatList
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        legacyImplementation={false}
                                        data={this.props.medicationDetails.medication_alt}
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
    medications:state.medications.medications,
    categories:state.medicationCategories.medicationCategories,
    medicationDetails:state.medicationDetails.medicationDetails
  })
const mapDispatchToProps = (dispatch) => ({
    fetchMedicationDetails:(id)=>dispatch(medicationAction.fetchMedicationDetails(id)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(MedicationDetailsScreen);