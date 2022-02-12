import React, { Component } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Dimensions,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import {BASE_URL} from '../store/constants/';
import { Tab, Tabs, ScrollableTab,Title, Container, Header, List, ListItem,Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left,Right, Body} from 'native-base';
import {connect} from 'react-redux';
import * as productAction from '../store/actions/products';
import * as addFavouritAction from '../store/actions/favourites';
import * as choicesAction from '../store/actions/choices'
import UserAvatar from 'react-native-user-avatar';
import AlternateProductsScreen from '../screens/products/AlternateProductsScreen'

class BarcodeSearchDetailScreen extends Component{
  state={
      prodId:'',
      barcode:this.props.navigation.getParam('productCode'),
      diseaseCat:'',
      periodsModalVisible : false,
      addFavProductId:null,
      choiceModalVisible:false,
      addFavPeriodId:null,
      addFavChoiceId:null,
      deviceWidth: Dimensions.get("window").width
  }
    constructor (props){
      
      super(props);
  }
  componentDidMount(){
      this.props.fetchProducts(user_id=this.props.userDetails.userDetails.user_id)
      this.props.fetchChoices()
      const products = this.props.availableProducts.availableProducts
      const searchProduct = products.filter(prod=>prod.product_key==this.state.barcode)
      this.props.fetchContent(searchProduct[0].id)
      this.setState({prodId:searchProduct[0].id})
      this.setState({diseaseCat:searchProduct[0].disease_category})
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
  if(this.props.product ===null){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#3F51B5" />
    </View>
    );
  }
  if(this.props.product != null){
    
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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.userInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      const isFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id==this.state.prodId)
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
        <Modal
            onBackdropPress={() => this.setState({ periodsModalVisible: false })}
            isVisible={this.state.periodsModalVisible} style={styles.bottomModal}>
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
        <Card>
        <CardItem>
              <Left>{this.props.product.image==null ? <UserAvatar name={this.props.product.product_name}  size={50} /> :<UserAvatar name={this.props.product.product_name} src={BASE_URL+this.props.product.image} size={50} />}
                <Body><Text style={{fontWeight:"bold"}}>{this.props.product.product_name}</Text></Body>
                </Left>
                <Right>
                {isFav ? <Icon name={"favorite"} type='MaterialIcons' style={{color:"#3F51B5"}} onPress={()=>this.removeFav(user_id=this.props.userInfo.userDetails.user_id,product_id=this.state.prodId)}/>:<Icon name={"favorite-border"} type='MaterialIcons' style={{color:"#3F51B5"}} onPress={()=>this.setPeriodsModalVisible(visible=true,product_id=this.state.prodId)}/>}
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
          <Tab heading={this.props.language.productStatus} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
              <FlatList
                 data={this.props.userDetails.userDetails.user_diseases}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={diseaseStatusRender}
                  style={{ width: '100%' }}
                />
              </Tab>
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
            </Tabs>
            <Tabs>
                    <Tab heading={this.props.language.alternateProducts} activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#4eb9cb"}:{color:"#4eb9cb"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#4eb9cb"}}>
                        <AlternateProductsScreen {...this.props}/>
                      </Tab>
                    </Tabs>
      </Container>
  );
  }
}
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
    availableProducts:state.product,
    disease: state.selectDiseases,
    userDetails:state.userDetails,
    product:state.product_details.productDetails,
    favouritProducts:state.favourites,
    periodsList:state.periods,
    choiceList:state.choices,
    language:state.selectdLanguage.selectdLanguage,
  })
  const mapDispatchToProps = (dispatch) => ({
    fetchProducts:(user_id)=>dispatch(productAction.fetchProducts(user_id)),
    addFavourites:(user_id,product_id,period_id,choice_id)=>dispatch(addFavouritAction.addFavouritList(user_id,product_id,period_id,choice_id)),
    fetchContent:(prodId)=>dispatch(productAction.fetchContentList({id:prodId})),
    fetchChoices:()=>dispatch(choicesAction.fetchChoices()),
  });
export default connect(mapStateToProps,mapDispatchToProps)(BarcodeSearchDetailScreen);