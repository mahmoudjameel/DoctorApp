import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator,Alert ,ScrollView} from 'react-native';
import { Container,Content, Header, Title,Body, Button,
  Icon, Left,List, Right,Form,Footer,FooterTab,Item,Thumbnail,ListItem,Textarea,Label,CheckBox,Picker,Input} from "native-base";
import {connect} from 'react-redux';
import * as mailAction from '../../store/actions/sendMail';
import { BASE_URL } from '../../store/constants';

class SearchResultScreen extends Component{
  state={
    categoryId :this.props.navigation.getParam('categoryId'),
    searchText:this.props.navigation.getParam('searchData'),
    newPesticideName:'',
    newPesticideBarcode:'',
    newPesticideDiscription:'',
    newPesticideType:'Pesticide',
    userName:this.props.authInfo.userDetails.name,
    userEmail:this.props.authInfo.userDetails.email,
  }
    constructor (props){
        super(props);
    }

      componentDidMount() {
        this.props.navigation.setParams({
          Title: this.props.language.searchResult
        });
      }


      _onSubmitNewPesticide=()=>{
        this.props.sendProductDetails(this.state.newPesticideName,this.state.newPesticideBarcode,
        this.state.newPesticideDiscription,this.state.userEmail,this.state.userName,this.state.newPesticideType)
      }
      render(){
        const renderPesticide = itemData =>{
          
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
                         routeName:'PesticideDetails',
                         params:{
                            pesticideId:itemData.item.id,
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
        if(this.state.categoryId !=null){
            let pesticides=[]
            try{
              pesticides = this.props.pesticides.filter(med=>med.category.id === this.state.categoryId)
            }
            catch(err){
              pesticides = this.props.pesticides
            }
            
        let search_result=[]
        if(this.state.searchText !=null){
          const search_product = this.state.searchText.toLowerCase()
          search_result = pesticides.filter(medic=>medic.name.toLowerCase().match(search_product)||medic.code.match(search_product));
        }
        else{
          search_result = pesticides
        }
        if(search_result.length >0){
        return(
            <Container>
                <Content padder>
                    <List>
                        <FlatList
                            data={search_result}
                            keyExtractor={(item ) => item.id.toString()}
                            renderItem={renderPesticide}
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
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newPesticideName=>this.setState({newPesticideName})} value={this.state.newPesticideName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newPesticideBarcode=>this.setState({newPesticideBarcode})} value={this.state.newPesticideBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newPesticideDiscription=>this.setState({newPesticideDiscription})} value={this.state.newPesticideDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewPesticide}> 
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
        const pesticides = this.props.pesticides
        let search_result=[]
        if(this.state.searchText !=null){
          const search_product = this.state.searchText.toLowerCase()
          search_result = pesticides.filter(medic=>medic.name.toLowerCase().match(search_product)||medic.code.match(search_product));
        }
        else{
          search_result = pesticides
        }
        if(search_result.length >0){
        
        return(
            <Container>
                <Content padder>
                    <List>
                        <FlatList
                            data={search_result}
                            keyExtractor={(item ) => item.id.toString()}
                            renderItem={renderPesticide}
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
                <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newMedicationName=>this.setState({newMedicationName})} value={this.state.newPesticideName}/>
                <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newMedicationBarcode=>this.setState({newMedicationBarcode})} value={this.state.newPesticideBarcode}/>
                <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newMedicationDiscription=>this.setState({newMedicationDiscription})} value={this.state.newPesticideDiscription}/>
                </Form>
                <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"60%",height:50,marginTop:"5%",backgroundColor:"#009479"}} onPress={this._onSubmitNewPesticide}> 
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
  pesticides:state.pesticides.pesticides,
  categories:state.pesticideCategories.pesticideCategories,
})
const mapDispatchToProps = (dispatch) => ({
  sendProductDetails:(product_name,product_barcode,description,email,username,type)=>dispatch(mailAction.sendMail(product_name,product_barcode,description,email,username,type)),
});
export default connect(mapStateToProps,mapDispatchToProps)(SearchResultScreen);