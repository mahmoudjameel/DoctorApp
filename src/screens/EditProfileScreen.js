import React from 'react';
import {View,Dimensions,FlatList,Alert,Modal,ActivityIndicator,ScrollView,TouchableOpacity,TextInput} from 'react-native';
import { Container, Header, Title,Body, Button,
        Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Text,Picker,Input} from "native-base";
import styles from './styles/auth/SignUp';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import * as profileUpdateAction from '../store/actions/editProfile'
import * as diseaseAction from '../store/actions/diseases';
import MultiSelect from 'react-native-multiple-select';

class EditProfileScreen extends ValidationComponent {
  state = {
    device : Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    id:this.props.userInfo.userDetails.id,
    name: this.props.userInfo.userDetails.name,
    email:this.props.userInfo.userDetails.email,
    mobile:this.props.userInfo.userDetails.phone,
    language:this.props.userInfo.userDetails.user_language,
    gender: '',
    date: new Date(this.props.userInfo.userDetails.dob),
    mode: 'date',
    dob:moment(new Date(this.props.userInfo.userDetails.dob)).format("YYYY-MM-DD"),
    show: false,
    diseasesIdSelect:[],
    modalVisible: false,
    bloodGroup:this.props.userInfo.userDetails.blood_group
  }

  constructor (props){
    
    super(props);
    Dimensions.addEventListener("change",dims =>{
      this.setState({
        tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
        phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
      })
    })
    const diseases = this.props.userInfo.userDetails.user_diseases
    for (const key in diseases){
      this.state.diseasesIdSelect.push(diseases[key].disease_category.id)
      
    }
  }
  componentDidMount() {
    this.props.fetchDisease()
    if(this.props.userInfo.userDetails.gender=="Male"){
      this.setState({gender:'M'});
    }
    else if(this.props.userInfo.userDetails.gender=="Female"){
      this.setState({gender:'F'})
    }
    this.props.navigation.setParams({
      Title: this.props.language.editprofile
    });
  }
  onGenderChange(value) {
    this.setState({
      gender: value
    });
  }
  onlanguageChange(value) {
    this.setState({
      language: value
    });
  }
  onBloodGroupChange(value){
    this.setState({
      bloodGroup:value
    });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  setDate = (event, date) => {
    date = date || this.state.date;
    
    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      dob:moment(date).format("YYYY-MM-DD"),
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }
  onSelectedItemsChange = diseasesIdSelect => {
    this.setState({ diseasesIdSelect });
  };
  onDisiesesSubmit = ()=>{
    this.setState({diseasesSelect:"selected diseases("+this.state.diseasesIdSelect.length+")"})
    this.setState({modalVisible:!this.state.modalVisible});
    
  }
  onSubmit=()=>{
    this.validate({
      name: {required: true},
      email: {email: true,required:true},
      gender:{required:true},
      date: {date: 'YYYY-MM-DD'},
      mobile:{required:true},
      password:{required:true},
      diseasesIdSelect:{required:true},
      bloodGroup:{required:true},
      language:{required:true}
      
    });
    if(this.isFormValid()){
       this.props.postUpdateDetails(
        this.state.id,
        this.state.name,
        this.state.email,
        this.state.gender,
        this.state.bloodGroup,
        this.state.dob,
        this.state.mobile,
        this.state.diseasesIdSelect,
        this.state.language
      )
    }
  }
  render() {
    const diseasesIdSelect=this.state.diseasesIdSelect;
    if(this.props.updateInfo.isLoading===true){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
      )
    }
    if(this.props.updateInfo.isError===true){
      Alert.alert('Alert!',this.props.updateInfo.errors,[{text:'Ok'}]);
    }
    const { show, date, mode } = this.state;
    return (
        <ScrollView style={styles.wrapper}>
        {/* <Header>
        <Left>
          <Button transparent  onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="MaterialIcons"/>
          </Button>
        </Left>
        <Body>
            <Title>Create Account</Title>
        </Body>
      </Header> */}
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={{marginTop: 22}}>
            <Header>
                <Left>
                <Button transparent onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);}}>
                    <Icon name='md-close'/>
                </Button>
                </Left>
                <Body>
                <Title>{this.props.language.selectDiseases}</Title>
                </Body>
            </Header>
            <ScrollView>
                  <FlatList
                    data={this.props.disease.diseasesCategories}
                    renderItem={({ item }) => (<ListItem onPress={()=>this.setState({diseasesSelect:item.name,
                    diseasesIdSelect:item.id,modalVisible:!this.state.modalVisible})}>
                      <Body>
                      <Text>{item.name}</Text>
                      </Body>
                    </ListItem>)}
                    keyExtractor={item => item.id.toString()}
                  />
            </ScrollView>
          </View>
      </Modal>
      <View style={styles.phoneSignUpForm}>
      <Item error={this.isFieldInError('language')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='earth' type="AntDesign" />
              <Picker
                ref='language'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Language/اللغات"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.language}
                onValueChange={this.onlanguageChange.bind(this)}
              > 
                <Picker.Item label="عربى" value="ar"/>
                <Picker.Item label="English" value="en" />
                <Picker.Item label="हिंदी" value="hi" />
                <Picker.Item label="اردو" value="ur" />
                <Picker.Item label="français" value="fr"/>
              </Picker>
          </Item>
          <Item error={this.isFieldInError('name')?true:false} rounded style={styles.phoneInput}>
            <Icon name='person'/>
            <Input ref='name' placeholder='Name' onChangeText={name=>this.setState({name})} value={this.state.name}/>
          </Item>
          <Item error={this.isFieldInError('email')?true:false} rounded style={styles.phoneInput}>
          <Icon name='ios-mail'/>
            <Input ref='email' placeholder='Email' onChangeText={email=>this.setState({email})} value={this.state.email} />
          </Item>
          <Item error={this.isFieldInError('gender')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='gender-male-female' type='MaterialCommunityIcons'/>
              <Picker
                ref='gender'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.gender}
                onValueChange={this.onGenderChange.bind(this)}
              >
                <Picker.Item label="Male" value="M" />
                <Picker.Item label="Female" value="F" />
              </Picker>
          </Item>
          <Item error={this.isFieldInError('gender')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='ios-water'/>
              <Picker
                ref='blood_group'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down"/>}
                placeholder="Bloog Group"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.bloodGroup}
                onValueChange={this.onBloodGroupChange.bind(this)}
              >
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
              </Picker>
          </Item>
          <Item error={this.isFieldInError('date')?true:false} rounded style={styles.phoneInput}>
            <Button rounded transparent style={{width:"100%"}} onPress={this.datepicker}>
            <Icon name='cake'type='MaterialCommunityIcons' style={{color:"black"}} />
              <Text ref='date'  style={{color:"black"}}>{ mode === 'date' && moment.utc(date).format('YYYY/MM/DD') }</Text>
            </Button>
            
              
          </Item>
          { show && <DateTimePicker value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.setDate} />
              }
          <Item error={this.isFieldInError('mobile')?true:false} rounded style={styles.phoneInput}>
          <Icon name='ios-phone-portrait'/>
            <Input ref='mobile' placeholder='Mobile' keyboardType="phone-pad" onChangeText={mobile=>this.setState({mobile})} value={this.state.mobile}/>
          </Item>
          <View error={this.isFieldInError('diseasesIdSelect')?true:false} style={styles.phoneInput}>
          <MultiSelect
          items={this.props.disease.diseasesCategories}
          uniqueKey="id"
          ref={(component) => { this.multiselect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={diseasesIdSelect}
          selectText={this.props.language.selectDiseases}
          searchInputPlaceholderText={this.props.language.selectDiseases+"..."}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#009479"
          tagBorderColor="#4eb9cb"
          tagTextColor="#009479"
          selectedItemTextColor="#009479"
          selectedItemIconColor="#009479"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#000' }}
          submitButtonColor="#009479"
        />
        </View>
      </View>
      <View style={{marginTop:"5%"}}>
        <Button rounded style={{width:"70%",
        alignItems:"center",
        alignSelf:"center",
        height:50,
        backgroundColor:"#009479",
        }} onPress={this.onSubmit}>
            <Text style={{fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
        </Button>
      </View>
    </ScrollView>
    );
  }
}
EditProfileScreen.navigationOptions = ({navigation })=>{
  return {
    headerTitle: navigation.getParam('Title'),
  };
}

mapStateToProps = (state) => ({
  disease: state.selectDiseases,
  userInfo:state.userDetails,
  updateInfo:state.auth,
  language:state.selectdLanguage.selectdLanguage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDisease:()=>dispatch(diseaseAction.fetchDiseaseCategories()),
  postUpdateDetails:(id,name,email,gender,blood_group,date,mobile,disease,language)=>dispatch(profileUpdateAction.updateProfile(id,name,email,gender,blood_group,date,mobile,disease,language))
});
export default connect(mapStateToProps,mapDispatchToProps)(EditProfileScreen);