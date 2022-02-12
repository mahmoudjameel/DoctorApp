import SpecialistGridTile from '../../components/SpecialistGridTile';
import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  TouchableOpacity,ActivityIndicator,Image,ImageBackground
} from 'react-native';
import {Container,List, Header,Row,Col,Footer, FooterTab, Content,Picker, Icon,Button,Item,Input,Form, ListItem, Right, Left, Body} from 'native-base';
import * as medicationAction from '../../store/actions/medications'
import {connect} from 'react-redux';

class MedicationScreen extends Component{
  state={
    loading:false,
    searchData:null,
    categoryId:null
  }
  constructor (props){
    super(props);
  }
  async componentDidMount() {
      this.setState({
          loading:true
      })
    await this.props.fetchMedications();
    await this.props.fetchCategories();
    this.setState({
        loading:false
      })
  }
  
    _onSearch=()=>{
          
      this.props.navigation.navigate({
        routeName: 'MedicationSearchResult',
        params:{
          searchData:this.state.searchData,
          categoryId:this.state.categoryId
        }
      })
    
    }
    render(){
          if(this.state.loading==true){
              return(
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3F51B5" />
              </View> 
              )
          }
        return(
          <Container style={{ flex: 1 }}>
 <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
          <Row>
              <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="arrow-back" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.goBack()}></Icon>
              </Col>
              <Col style={{width:"70%",justifyContent:"center",alignContent:"center"}}>
              <Text style={{fontWeight:"bold",fontSize:23,color:"white",textAlign:"center",}}>
              {this.props.language.medications}
           </Text>
              </Col>
              <Col style={{width:"15%",justifyContent:"center",alignContent:"center"}}>
              <Icon name="person" type="MaterialIcons" style={{fontSize:45,color:"white",textAlign:"right"}} onPress={()=>this.props.navigation.navigate('Profile')}></Icon>
              </Col>
          </Row>

        </Header>
          
              <Content>
              {/* <ImageBackground source={require('../../assets/top-1.png')} style={{width:"100%", height:95,position:"absolute"}} resizeMode={'stretch'}> */}
           
          {/* </ImageBackground> */}
              <View style={{flex: 1,alignItems: 'center',marginTop:"15%"}}>
                  <Text style={{fontSize:18,alignSelf:"center",fontWeight:"bold"}}>{this.props.language.searchByBarcode}</Text>
                  <View style={{backgroundColor:"#fff",borderColor:"#009479",borderWidth:1,borderRadius:8,marginTop:"3%"}}>
                  <Icon name="qrcode-scan" type="MaterialCommunityIcons" style={{fontSize:40, color:"#009479",padding:15}} onPress={()=>this.props.navigation.navigate('MedicationBarcodeSearch')}></Icon>
                  </View>
                </View>
              
              <Row style={{justifyContent: 'center', alignItems: 'center',width:"95%",marginTop:"10%"}}>
                  <Col style={{width:"30%"}}>
                      <Text style={{alignSelf:"center",fontWeight:"bold"}}>{this.props.language.name}</Text>
                  </Col>                
                  <Col style={{width:"70%",height:50,borderRadius:10,backgroundColor:"#ddd"}}>
                    <ListItem style={{height:50}}>
                      <Item style={{width:"100%",borderColor:"#fff"}}>
                          <Input ref='searchData'  placeholder={this.props.language.name} onChangeText={searchData=>this.setState({searchData})} value={this.state.searchData} />
                          <Icon name="ios-search" />
                      </Item>
                    </ListItem>
                  </Col>
              </Row>
              
              <Row style={{justifyContent: 'center', alignItems: 'center',width:"95%",marginTop:"10%"}}> 
                <Col style={{width:"30%"}}>
                  <Text style={{alignSelf:"center",fontWeight:"bold"}}>{this.props.language.categories}</Text>
                </Col>
              <Col style={{width:"70%",height:40,borderRadius:10,backgroundColor:"#ddd"}}>
                  
                  <Picker selectedValue={this.state.categoryId} style={{height: 50, width: "100%"}}
                      onValueChange={(itemValue, itemIndex) =>
                        this.setState({categoryId: itemValue})}>
                        <Picker.Item label={this.props.language.categories} value={null} />
                        {this.props.categories.map(cat=>(
                          <Picker.Item label={cat.name} value={cat.id} />
                        ))}
                          
                </Picker>
                  
              </Col>
            </Row>
  
            
            <View style={{width:"60%",alignSelf:"center",marginTop:"10%",height:"80%"}}>
              <Button rounded style={{alignSelf:"center",alignItems:"center",height:50,width:"70%",backgroundColor:"#009479"}} onPress={()=>this._onSearch()} disabled={this.state.searchData==null && this.state.categoryId==null? true:false}> 
              <Text style={{fontSize:22,textAlign:"center",color:"white",width:"100%"}} >{this.props.language.search}</Text>
            </Button>
          </View>
          </Content>
         
         
          </Container>
        );
    }
}
mapStateToProps = (state) => ({
    language:state.selectdLanguage.selectdLanguage,
    doctorDetails:state.doctorDetails.doctorDetails,
    medications:state.medications.medications,
    categories:state.medicationCategories.medicationCategories,
  })
const mapDispatchToProps = (dispatch) => ({
    fetchMedications:()=>dispatch(medicationAction.fetchMedications()), 
    fetchCategories:()=>dispatch(medicationAction.fetchMedicationCategories())
  });
export default connect(mapStateToProps,mapDispatchToProps)(MedicationScreen);