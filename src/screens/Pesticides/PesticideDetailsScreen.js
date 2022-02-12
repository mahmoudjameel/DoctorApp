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
import * as pesticideAction from '../../store/actions/pesticides';
import {connect} from 'react-redux';


class PesticideDetailsScreen extends Component{
    state={
        loading:true,
        pesticideId:''
    }
    constructor (props){
        super(props);
      }
   async componentDidMount(){
        this.setState({loading:true,pesticideId:this.props.navigation.getParam('pesticideId')})
        const id =this.props.navigation.getParam('pesticideId')
        console.log(id);
        await this.props.fetchPesticideDetails(id)
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
            const renderMedication = itemData =>{
          
                return(                      
                <ListItem thumbnail onPress={()=>this.props.navigation.push('pesticideDetails',
                    {
                        pesticideId:itemData.item.alternate_medication.id,
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
                        <Text>{this.props.pesticideDetails.name}</Text>
                        <Text note>{this.props.pesticideDetails.manufacturer}</Text>
                        <Image source={{uri:BASE_URL+this.props.pesticideDetails.image}} style={{height: 200, width: 200, flex: 1,alignSelf:"center",justifyContent:"center"}}/>
                    </Content>
                        <Card>
                            <CardItem header bordered>
                                <Text>Description</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    <Text>
                                    {this.props.pesticideDetails.description}
                                    </Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card>
                            <CardItem header bordered>
                                <Text>Content</Text>
                            </CardItem>
                            <CardItem>
                            <List>
                                                {this.props.pesticideDetails.contents.map(content => (
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

                            </CardItem>
                        </Card>
                                <Card>
                            <CardItem header bordered>
                                <Text>Alternate Pesticide</Text>
                            </CardItem>
                            <CardItem>
                                <List>
                                    <FlatList
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        legacyImplementation={false}
                                        data={this.props.pesticideDetails.medication_alt}
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
    pesticides:state.pesticides.pesticides,
    categories:state.pesticideCategories.pesticideCategories,
    pesticideDetails:state.pesticideDetails.pesticideDetails
  })
const mapDispatchToProps = (dispatch) => ({
    fetchPesticideDetails:(id)=>dispatch(pesticideAction.fetchPesticideDetails(id)),
  });
export default connect(mapStateToProps,mapDispatchToProps)(PesticideDetailsScreen);