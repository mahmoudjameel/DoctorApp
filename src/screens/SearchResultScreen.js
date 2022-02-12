import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet,ActivityIndicator,Alert ,ScrollView} from 'react-native';
import { Container,Content, Header, Title,Body, Button,
  Icon, Left, Right,Form,Item,ListItem,Textarea,Label,CheckBox,Picker,Input} from "native-base";
import colors from '../styles/colors';
import MealItem from '../components/MealItem';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import * as addFavouritAction from '../store/actions/favourites';
import * as choicesAction from '../store/actions/choices';
import * as mailAction from '../store/actions/sendMail';

class SearchResultScreen extends Component{
  state={
    productCatId :this.props.navigation.getParam('productCatId'),
    diseaseCatId:this.props.navigation.getParam('diseaseCatId'),
    periodId:this.props.navigation.getParam('periodId'),
    searchText:this.props.navigation.getParam('searchData'),
    periodsModalVisible : false,
    addFavProductId:null,
    choiceModalVisible:false,
    addFavPeriodId:null,
    addFavChoiceId:null,
    newProductName:'',
    newProductBarcode:'',
    newProductDiscription:'',
    userName:this.props.authInfo.userDetails.name,
    userEmail:this.props.authInfo.userDetails.email,
    periodProducts:[],
    diseaseProduct:[],
    periodDiseaseProducts:[]

  }
    constructor (props){
        super(props);
        const categoryProducts = this.props.availableProducts.availableProducts
      for(key in categoryProducts){
        // console.log(categoryProducts[key].productperiods_set);
        const isprod=categoryProducts[key].productperiods_set.filter(prod=>prod.period.id==this.props.navigation.getParam('periodId'))
        if(isprod.length>0){
          this.state.periodProducts.push(categoryProducts[key])
        }
        
        
      }
      for(key in categoryProducts){
        // console.log(categoryProducts[key].productperiods_set);
        const isprod=categoryProducts[key].productdiseases_set.some(prod=>prod.disease_category.id===this.props.navigation.getParam('diseaseCatId'))
        if(!isprod){
          this.state.diseaseProduct.push(categoryProducts[key])
        }
        
        
      }
      for(key in this.state.periodProducts){
        const isProd = this.state.periodProducts[key].productdiseases_set.some(prod=>prod.disease_category.id===this.props.navigation.getParam('diseaseCatId'))
      if(!isProd){
        this.state.periodDiseaseProducts.push(categoryProducts[key])
      }
      }
      }

      componentDidMount() {
        this.props.fetchChoices()
        this.props.navigation.setParams({
          Title: this.props.language.searchResult
        });
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

      _onSubmitNewProduct=()=>{
        
        
        this.props.sendProductDetails(this.state.newProductName,this.state.newProductBarcode,
          this.state.newProductDiscription,this.state.userEmail,this.state.userName)
        
      }
      render(){
        if(this.props.sendInfo.isSuccess===true){
          Alert.alert('Thank you!'," For your contribution!",[{text:'Ok'}]);
          this.props.navigation.navigate('Search')
        }
        if(this.props.availableProducts.availableProducts == null){
          return(
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View> 
          )
        }
        if(this.state.productCatId !=null && this.state.periodId==null && this.state.diseaseCatId ==null){
        const categoryProducts = this.props.availableProducts.availableProducts.filter(prod=>prod.product_category.id === this.state.productCatId)
        let search_result=[]
        if(this.state.searchText !=null){
          const search_product = this.state.searchText.toLowerCase()
          search_result = categoryProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
        }
        else{
          search_result = categoryProducts
        }
        if(search_result.length >0){

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
            <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
                <Body>
                <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
                </Body>
              </ListItem>
          )
        }
        
        const renderProductItem = itemData =>{
          if(this.props.favouritProducts.favourites != null){
            if(this.props.favouritProducts.favourites.length > 0){
              
           const productId = itemData.item.id
           const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
           
           return(  <MealItem
                 title={itemData.item.product_name}
                 complexity={itemData.item.description}
                 favIcon = {prodIsFav ?"favorite":"favorite-border"}
                 onSelectMeal={() => {
                   this.props.navigation.navigate({
                     routeName: 'ProductDetails',   
                     params: {
                       productId: itemData.item.id,
                       diseaseCategory:itemData.item.disease_category,
                       isFav:prodIsFav
                     }
                   });
                 }}
                 onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
               />
           );
         }
        }
         if(this.props.favouritProducts.favourites != null){
         if(this.props.favouritProducts.favourites.length == 0){
          const productId = itemData.item.id
         return(  <MealItem
           title={itemData.item.product_name}
           complexity={itemData.item.description}
           favIcon = {"favorite-border"}
           onSelectMeal={() => {
             this.props.navigation.navigate({
               routeName: 'ProductDetails',   
               params: {
                 productId: itemData.item.id,
                 diseaseCategory:itemData.item.disease_category,
                 isFav:false
                    }
              });
            }}
            onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
            />);
          }
        }
       };
        return(
          <View style={styles.screen}>
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
                <Title>Add to Meal</Title>
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
                <Title>Add to Choice</Title>
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
          <FlatList
            data={search_result}
            keyExtractor={(item ) => item.id.toString()}
            renderItem={renderProductItem}
            style={{ width: '100%' }}
          />
        </View>
        )
      }
      //endif for search_result
      return(
        <Container>
        <Content padder style={{marginTop:"20%"}}>
        <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
        <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
        </Content>
          </Container>
      )
    }
    //endif for product!null
    if(this.state.productCatId ==null && this.state.periodId!=null && this.state.diseaseCatId ==null){
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = this.state.periodProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result = this.state.periodProducts
      }
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //endif for period!null
    if(this.state.productCatId ==null && this.state.periodId==null && this.state.diseaseCatId !=null){
      
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = this.state.diseaseProduct.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result =this.state.diseaseProduct
      }
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
      <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //endif for disease_category!null
    if(this.state.productCatId !=null && this.state.periodId===null && this.state.diseaseCatId !=null){
      const categoryProducts = this.state.diseaseProduct.filter(prod=>prod.product_category.id === this.state.productCatId)
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = categoryProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result =categoryProducts
      }
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //endif for product and disease !null
    if(this.state.productCatId ==null && this.state.periodId!=null && this.state.diseaseCatId !=null){
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = this.state.periodDiseaseProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result =this.state.periodDiseaseProducts
      }
      
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //end for disease and meal !null
    if(this.state.productCatId !=null && this.state.periodId!=null && this.state.diseaseCatId ==null){
      const categoryProducts = this.state.periodProducts.filter(prod=>prod.product_category.id ===this.state.diseaseCatId)
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = categoryProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result =categoryProducts
      }
      
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
       <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //endif for product and meal not null
    if(this.state.productCatId !=null && this.state.periodId!=null && this.state.diseaseCatId !=null){
      const categoryProducts = this.state.periodDiseaseProducts.filter(prod=>prod.product_category.id==this.state.productCatId && prod.disease_category==this.state.diseaseCatId)
      let search_result=[]
      if(this.state.searchText !=null){
        const search_product = this.state.searchText.toLowerCase()
        search_result = categoryProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      }
      else{
        search_result =categoryProducts
      }
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
      <Content padder style={{marginTop:"20%"}}>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Hope you did not find the Product that you are looking</Text>
      <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>Please help us by sending the product details! </Text>
        <Form style={{marginTop:"10%"}}>
          <Textarea rowSpan={2} bordered placeholder="Product Name" onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
          <Textarea rowSpan={2} bordered placeholder="Barcode" onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
          <Textarea rowSpan={5} bordered placeholder="Discription" onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
        </Form>
        <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"70%",height:50,marginTop:"5%",backgroundColor:"#17AFB0"}} onPress={this._onSubmitNewProduct}> 
          <Text style={{fontSize:22,color:"white"}} >Submit</Text>
        </Button>
      </Content>
        </Container>
    )
    }
    //endif for product category diseasecat and period !null
    if(this.state.searchText !=null && this.state.productCatId ==null && this.state.periodId==null && this.state.diseaseCatId ==null){
      const availableProducts = this.props.availableProducts.availableProducts
      const search_product = this.state.searchText.toLowerCase()
      const search_result = availableProducts.filter(prod=>prod.product_name.toLowerCase().match(search_product)||prod.product_key.match(search_product));
      if(search_result.length >0){

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
          <ListItem onPress={()=>this.addToFav(user_id=this.props.authInfo.userDetails.user_id,product_id=this.state.addFavProductId,period_id=this.state.addFavPeriodId,choice_id=itemData.item.id)}>
              <Body>
              <Text style={{fontWeight:"bold"}}>{itemData.item.name}</Text>
              </Body>
            </ListItem>
        )
      }
      
      const renderProductItem = itemData =>{
        if(this.props.favouritProducts.favourites != null){
          if(this.props.favouritProducts.favourites.length > 0){
            
         const productId = itemData.item.id
         const prodIsFav = this.props.favouritProducts.favourites.some(fav=>fav.product.id === productId)
         
         return(  <MealItem
               title={itemData.item.product_name}
               complexity={itemData.item.description}
               favIcon = {prodIsFav ?"favorite":"favorite-border"}
               onSelectMeal={() => {
                 this.props.navigation.navigate({
                   routeName: 'ProductDetails',   
                   params: {
                     productId: itemData.item.id,
                     diseaseCategory:itemData.item.disease_category,
                     isFav:prodIsFav
                   }
                 });
               }}
               onFavSelect={prodIsFav ? ()=>this.removeFav(user_id=this.props.authInfo.userDetails.user_id,product_id=productId) :()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
             />
         );
       }
      }
       if(this.props.favouritProducts.favourites != null){
       if(this.props.favouritProducts.favourites.length == 0){
        const productId = itemData.item.id
       return(  <MealItem
         title={itemData.item.product_name}
         complexity={itemData.item.description}
         favIcon = {"favorite-border"}
         onSelectMeal={() => {
           this.props.navigation.navigate({
             routeName: 'ProductDetails',   
             params: {
               productId: itemData.item.id,
               diseaseCategory:itemData.item.disease_category,
               isFav:false
                  }
            });
          }}
          onFavSelect={()=>this.setPeriodsModalVisible(visible=true,product_id=productId)}
          />);
        }
      }
     };
      return(
        <View style={styles.screen}>
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
              <Title>Add to Meal</Title>
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
              <Title>Add to Choice</Title>
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
        <FlatList
          data={search_result}
          keyExtractor={(item ) => item.id.toString()}
          renderItem={renderProductItem}
          style={{ width: '100%' }}
        />
      </View>
      )
    }
    //endif for search_result
    return(
      <Container>
            <Content padder style={{marginTop:"20%"}}>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.productNotFound}</Text>
            <Text style={{flexDirection:"row" ,width:"95%",alignSelf:"center",fontWeight:"bold"}}>{this.props.language.helpAddingProduct}</Text>
              <Form style={{marginTop:"10%"}}>
                <Textarea rowSpan={2} bordered placeholder={this.props.language.productName} onChangeText={newProductName=>this.setState({newProductName})} value={this.state.newProductName}/>
                <Textarea rowSpan={2} bordered placeholder={this.props.language.barcode} onChangeText={newProductBarcode=>this.setState({newProductBarcode})} value={this.state.newProductBarcode}/>
                <Textarea rowSpan={5} bordered placeholder={this.props.language.description} onChangeText={newProductDiscription=>this.setState({newProductDiscription})} value={this.state.newProductDiscription}/>
              </Form>
              <Button rounded style={{flex:1,alignContent:"center",marginLeft:"13%",width:"60%",height:50,marginTop:"5%",backgroundColor:"#009479"}} onPress={this._onSubmitNewProduct}> 
                <Text style={{fontSize:22,color:"white"}} >{this.props.language.submit}</Text>
              </Button>
            </Content>
              </Container>
    )
    }
    //end if for only search data !null

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
    availableProducts: state.product,
    authInfo:state.userDetails,
    favouritProducts:state.favourites,
    periodsList:state.periods,
    choiceList:state.choices,
    sendInfo:state.auth,
    language:state.selectdLanguage.selectdLanguage,
  })
const mapDispatchToProps = (dispatch) => ({
  addFavourites:(user_id,product_id,period_id,choice_id)=>dispatch(addFavouritAction.addFavouritList(user_id,product_id,period_id,choice_id)),
  sendProductDetails:(product_name,product_barcode,description,email,username)=>dispatch(mailAction.sendMail(product_name,product_barcode,description,email,username)),
  fetchChoices:()=>dispatch(choicesAction.fetchChoices())
});
export default connect(mapStateToProps,mapDispatchToProps)(SearchResultScreen);