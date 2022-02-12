import React, { Component } from 'react';
import {View,Dimensions,Alert,ScrollView,TouchableOpacity,TextInput,Text} from 'react-native';
import { Container,List, Header,Footer, FooterTab, Content, Button, Picker,Row,Col,Form,ListItem, Icon, Left, Body, Right, Switch,Title,Item,Input} from 'native-base';
import colors from '../styles/colors';
import * as productsActions from '../store/actions/products';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';




class SearchScreen extends Component {
  state = {
    device: Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    searchData:null,
    productCatId:null,
    diseaseCatId:null,
    periodId:null,
  }
  componentDidMount() {
    this.props.fetchProducts(user_id=this.props.userInfo.userDetails.user_id)
    
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
    if(this.props.language.languageName=="arabic" || this.props.language.languageName=="urdu"){
      return (
        <Container>
          <Content>
            <View style={{flexDirection:"row" ,width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10,marginBottom:"5%",marginTop:"10%"}}>
            <Item style={{width:"100%"}}>
                <Icon name="ios-search" />
                  <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode} onChangeText={searchData=>this.setState({searchData})} value={this.state.searchData}/>
                </Item>
            </View>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.searchByProductCategories}</Text>
            <View style={{flexDirection:"row" ,width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10 ,marginBottom:"5%"}}>
                <Picker selectedValue={this.state.productCatId} style={{height: 50, width: "50%"}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({productCatId: itemValue})}>
                        <Picker.Item label={this.props.language.productCategories} value={null} />
                        {this.props.productCategories.map(cat=>(
                          <Picker.Item label={cat.name} value={cat.id} />
                        ))}
                          
                </Picker>
                <Picker selectedValue={this.state.diseaseCatId} style={{height: 50, width: "50%"}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({diseaseCatId: itemValue})}>
                        <Picker.Item label={this.props.language.diseaseCategories} value={null} />
                        {this.props.diseasesCategories.map(cat=>(
                          <Picker.Item label={cat.name} value={cat.id} />
                        ))}
                </Picker>
            </View>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.searchByMeal}</Text>
            <View style={{flexDirection:"row" ,width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10,marginBottom:"5%"}}>
                <Picker selectedValue={this.state.periodId} style={{height: 50, width: "100%"}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({periodId: itemValue})}>
                  <Picker.Item label={this.props.language.searchByMeal} value={null} />
                  {this.props.periods.map(cat=>(
                          <Picker.Item label={cat.name} value={cat.id} />
                        ))}
                </Picker>
            </View>
            <View style={{width:"90%",alignSelf:"center",marginTop:"5%"}}>
            <Button rounded style={{flex:1,alignContent:"center",marginLeft:"7.5%",width:"85%",height:50,backgroundColor:"#009479"}} onPress={()=>this._onSearch()} disabled={this.state.searchData==null && this.state.periodId==null && this.state.productCatId==null && this.state.diseaseCatId==null? true:false}> 
              <Text style={{fontSize:22,color:"white"}} >{this.props.language.search}</Text>
            </Button>
          </View>
          </Content>
          <Footer style={{backgroundColor:"#fff"}}>
          <FooterTab style={{backgroundColor:"#dddddd"}}>
            <Button transparent vertical onPress={()=>this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#fff"}} />
              <Text style={{color:"#fff"}}>{this.props.language.home}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Search',params:{headerTitle:this.props.language.search}})}>
              <Icon name="search" style={{color:"#fff"}}/>
              <Text style={{color:"#fff"}}>{this.props.language.search}</Text>
            </Button>
            <Button rounded onPress={()=>this.props.navigation.navigate('BarcodeSearch')} style={{backgroundColor:"#fff"}}>
              <Icon active name="barcode" style={{color:"#225B59"}}/>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Favourite',params:{headerTitle:this.props.language.favoriete}})}>
              <Icon name="favorite"  type='MaterialIcons' style={{color:"#fff"}}/>
              <Text style={{color:"#fff"}}>{this.props.language.favoriete}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:"#fff"}} />
              <Text style={{color:"#fff"}}>{this.props.language.profile}</Text>
            </Button>
          </FooterTab>
        </Footer>
        </Container>
      );  
    }
    return (
      <Container>
        <Content>
          <View style={{flexDirection:"row" ,width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10,marginBottom:"5%",marginTop:"10%"}}>
          <Item style={{width:"100%"}}>
              <Input ref='searchData' placeholder={this.props.language.productNameOrbarcode} onChangeText={searchData=>this.setState({searchData})} value={this.state.searchData}/>
                  <Icon name="ios-search" />
              </Item>
          </View>
          <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.categories}</Text>
          <Row style={{width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10 ,marginBottom:"5%"}}>
            <Col style={{height: 50, width: "50%"}}>
              <Picker selectedValue={this.state.productCatId} 
              iosIcon={<Icon name="arrow-down" />}
              style={{height: 50, width: "80%"}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({productCatId: itemValue})}>
                      <Picker.Item label={ this.props.language.productCategories} value={null} />
                      {this.props.productCategories.map(cat=>(
                        <Picker.Item label={cat.name} value={cat.id} />
                      ))}
                        
              </Picker>
              </Col>
              <Col style={{height: 50, width: "50%"}}>
              <Picker selectedValue={this.state.diseaseCatId} style={{height: 50, width:"80%"}}
                    iosIcon={<Icon name="arrow-down" />}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({diseaseCatId: itemValue})}>
                      <Picker.Item label={this.props.language.diseaseCategories} value={null} />
                      {this.props.diseasesCategories.map(cat=>(
                        <Picker.Item label={cat.name} value={cat.id} />
                      ))}
              </Picker>
              </Col>
          </Row>
          <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.SearchByMeal}</Text>
          <View style={{flexDirection:"row" ,width:"95%",alignSelf:"center",borderWidth:1,borderColor:colors.blue,borderRadius:10,marginBottom:"5%"}}>
              <Picker selectedValue={this.state.periodId} style={{height: 50, width: "90%"}}
                  iosIcon={<Icon name="arrow-down" />}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({periodId: itemValue})}>
                <Picker.Item label={this.props.language.SearchByMeal} value={null} />
                {this.props.periods.map(cat=>(
                        <Picker.Item label={cat.name} value={cat.id}/>
                      ))}
              </Picker>
          </View>
          <View style={{width:"90%",alignSelf:"center",marginTop:"5%"}}>
          <Button rounded style={{width:"60%",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        backgroundColor:"#009479"
        }} onPress={()=>this._onSearch()} disabled={this.state.searchData==null && this.state.periodId==null && this.state.productCatId==null && this.state.diseaseCatId==null? true:false}> 
            <Text style={{fontSize:22,color:"white",textAlign:"center",width:"100%"}} >{this.props.language.search}</Text>
          </Button>
        </View>
        </Content>
        <Footer style={{backgroundColor:"#fff"}}>
          <FooterTab style={{backgroundColor:"#dddddd"}}>
            <Button transparent vertical onPress={()=>this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{this.props.language.home}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Search',params:{headerTitle:this.props.language.search}})}>
              <Icon name="search" style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{this.props.language.search}</Text>
            </Button>
            <Button rounded onPress={()=>this.props.navigation.navigate('BarcodeSearch')} style={{backgroundColor:"#009479",height:80}}>
              <Icon active name="barcode" style={{color:"#fff",fontSize:45}}/>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate({routeName:'Favourite',params:{headerTitle:this.props.language.favoriete}})}>
              <Icon name="favorite"  type='MaterialIcons' style={{color:"#000"}}/>
              <Text style={{color:"#000"}}>{this.props.language.favoriete}</Text>
            </Button>
            <Button transparent onPress={()=>this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color:"#000"}} />
              <Text style={{color:"#000"}}>{this.props.language.profile}</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
SearchScreen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('headerTitle')
  };
}
mapStateToProps = (state) => ({
  availableProducts: state.product,
  userInfo:state.userDetails,
  periods:state.periods.periods,
  diseasesCategories:state.selectDiseases.diseasesCategories,
  productCategories:state.product_categories.availableProductCategories,
  language:state.selectdLanguage.selectdLanguage,
})
const mapDispatchToProps = (dispatch) => ({
fetchProducts:(user_id)=>dispatch(productsActions.fetchProducts(user_id))
});
export default connect(mapStateToProps,mapDispatchToProps)(SearchScreen);