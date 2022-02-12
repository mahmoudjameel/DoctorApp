import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator,Alert ,ScrollView} from 'react-native';
import { Container,Content, Header, Title,Body, Button,
  Icon, Left,List, Right,Form,Item,Footer,FooterTab,Thumbnail,ListItem,Textarea,Label,CheckBox,Picker,Input} from "native-base";
import {connect} from 'react-redux';
import * as mailAction from '../../store/actions/sendMail';
import { BASE_URL } from '../../store/constants';

class SearchResultScreen extends Component{
  state={
    categoryId :this.props.navigation.getParam('categoryId'),
    searchText:this.props.navigation.getParam('searchData'),
    newMedicationName:'',
    newMedicationBarcode:'',
    newMedicationDiscription:'',
    type:"medication",
    userName:this.props.authInfo.userDetails.name,
    userEmail:this.props.authInfo.userDetails.email,
  }
    constructor (props){
        super(props);
    }

      componentDidMount() {
        console.log(this.props.navigation.getParam('categoryId'));
        this.props.navigation.setParams({
          Title: this.props.language.searchResult
        });
      }


      _onSubmitNewMedication=()=>{
        this.props.sendProductDetails(this.state.newMedicationName,this.state.newMedicationBarcode,
        this.state.newMedicationDiscription,this.state.userEmail,this.state.userName,this.state.type)
      }
      render(){
        const renderMedication = itemData =>{
          
            return(                      
            <ListItem thumbnail>
                 <Left>
                     <Thumbnail square source={{uri:BASE_URL+itemData.item.image}} />
                 </Left>
                 <Body>
                     <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
                     <Text note numberOfLines={1}>{itemData.item.medicen_type}</Text>
                 </Body>
                 <Right>
                     <Button transparent onPress={()=>this.props.navigation.navigate({
                         routeName:'MedicationDetails',
                         params:{
                            medicationId:itemData.item.id,
                          }
                     })}>
                     <Text>View</Text>
                     </Button>
                 </Right>
             </ListItem>
            );
        };
        if(this.props.sendInfo.isSuccess===true){
          Alert.alert('Thank you!'," For your contribution!",[{text:'Ok'}]);
          this.props.navigation.navigate('Home')
        }
        if(this.props.navigation.getParam('categoryId') !=null){
            let medications=[]
            try{
              console.log(this.state.categoryId);
              console.log(this.props.medications);
              medication_not_null = this.props.medications.filter(med=>med.category !=null)
                medications = medication_not_null.filter(med=>med.category.id === this.props.navigation.getParam('categoryId'))
                
            }
            catch(err){
                medications = this.props.medications
            }
            
        let search_result=[]
        if(this.state.searchText !=null){
          const search_product = this.state.searchText.toLowerCase()
          search_result = medications.filter(medic=>medic.name.toLowerCase().match(search_product)||medic.code.match(search_product));
        }
        else{
          search_result = medications
        }
        if(search_result.length >0){
        return(
            <Container>
                <Content padder>
                    <List>
                        <FlatList
                            data={search_result}
                            keyExtractor={(item ) => item.id.toString()}
                            renderItem={renderMedication}
                        />
                    </List>
                </Content>
                <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'HealthyFood',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
            </Container>
        )
      }
      //endif for search_result
      return(
        <Container>
        <Content padder style={{marginTop:"20%"}}>
        <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
        <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newMedicationName=>this.setState({newMedicationName})} value={this.state.newMedicationName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newMedicationBarcode=>this.setState({newMedicationBarcode})} value={this.state.newMedicationBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newMedicationDiscription=>this.setState({newMedicationDiscription})} value={this.state.newMedicationDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"60%",height:50,marginTop:"5%"}} onPress={this._onSubmitNewMedication}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
        </Content>
        <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'HealthyFood',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
          </Container>
      )
    }
    //endif for category!null
    if(this.state.categoryId ==null){
        const medications = this.props.medications
        let search_result=[]
        if(this.state.searchText !=null){
          const search_product = this.state.searchText.toLowerCase()
          search_result = medications.filter(medic=>medic.name.toLowerCase().match(search_product)||medic.code.match(search_product));
        }
        else{
          search_result = medications
        }
        if(search_result.length >0){
        
        return(
            <Container>
                <Content padder>
                    <List>
                        <FlatList
                            data={search_result}
                            keyExtractor={(item ) => item.id.toString()}
                            renderItem={renderMedication}
                        />
                    </List>
                </Content>
                <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'HealthyFood',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
          </Container>
        )
      }
      //endif for search_result
      return(
        <Container>
            <Content padder style={{marginTop:"20%"}}>
                <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
                <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
                <Form style={{marginTop:"10%"}}>
                <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newMedicationName=>this.setState({newMedicationName})} value={this.state.newMedicationName}/>
                <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newMedicationBarcode=>this.setState({newMedicationBarcode})} value={this.state.newMedicationBarcode}/>
                <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newMedicationDiscription=>this.setState({newMedicationDiscription})} value={this.state.newMedicationDiscription}/>
                </Form>
                <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"60%",height:50,marginTop:"5%"}} onPress={this._onSubmitNewMedication}> 
                <Text style={{fontSize:22,color:"white"}} >Submit</Text>
                </Button>
            </Content>
            <Footer style={{backgroundColor: '#fff'}}>
           <FooterTab style={{backgroundColor: '#dddddd'}}>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate('Home')}>
              <Icon active name="home" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>{this.props.language.home}</Text>
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'HealthyFood',
                  params: {headerTitle: this.props.language.search},
                })
              }>
              <Icon name="search" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.search}
              </Text>
            </Button>
            <Button
              rounded
              onPress={() => this.props.navigation.navigate('BarcodeSearch')}
              style={{backgroundColor: '#009479',height:80}}>
              <Icon active name="barcode" style={{color: '#fff',fontSize:45}} />
            </Button>
            <Button
              transparent
              onPress={() =>
                this.props.navigation.navigate({
                  routeName: 'Favourite',
                  params: {headerTitle: this.props.language.favoriete},
                })
              }>
              <Icon
                name="favorite"
                type="MaterialIcons"
                style={{color: '#000'}}
              />
              <Text style={{color: '#000'}}>
                {this.props.language.favoriete}
              </Text>
            </Button>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Profile')}>
              <Icon name="person" style={{color: '#000'}} />
              <Text style={{color: '#000'}}>
                {this.props.language.profile}
              </Text>
            </Button>

          
          </FooterTab>
        </Footer>
          </Container>
      )
    }
    //endif for category null
    }
}

SearchResultScreen.navigationOptions = ({navigation })=>{
  
  return {
    headerTitle: navigation.getParam('Title'),
  };
}
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
    
    authInfo:state.userDetails,
    sendInfo:state.auth,
    language:state.selectdLanguage.selectdLanguage,
    medications:state.medications.medications,
    categories:state.medicationCategories.medicationCategories,
  })
const mapDispatchToProps = (dispatch) => ({
  sendProductDetails:(product_name,product_barcode,description,email,username,type)=>dispatch(mailAction.sendMail(product_name,product_barcode,description,email,username,type)),
});
export default connect(mapStateToProps,mapDispatchToProps)(SearchResultScreen);