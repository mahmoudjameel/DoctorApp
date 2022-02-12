import React from 'react';
import {View,Dimensions,FlatList,Alert,Modal,ScrollView,ActivityIndicator,TouchableOpacity,TextInput} from 'react-native';
import { Container, Header, Title,Body, Button,
        Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Text,Picker,Input} from "native-base";
import styles from '../styles/auth/SignUp';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import * as signUpAction from '../../store/actions/auth'
import * as diseaseAction from '../../store/actions/diseases'
import MultiSelect from 'react-native-multiple-select';

class SignUp extends ValidationComponent {
  state = {
    device : Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    name: '',
    email:'',
    password:'',
    bloodGroup:'A+',
    mobile:'',
    gender: 'M',
    language:'en',
    date: new Date('2020-06-12'),
    mode: 'date',
    dob:moment(new Date('2020-06-12')).format("YYYY-MM-DD"),
    show: false,
    diseasesSelect:'select disease',
    diseasesIdSelect:[],
    modalVisible: false,
  }

  constructor (props){
    
    super(props);
    Dimensions.addEventListener("change",dims =>{
      this.setState({
        tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
        phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
      })
    })
  }
  componentDidMount() {
    
    this.props.fetchDisease()
    
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
      bloodGroup:{required:true},
      diseasesIdSelect:{required:true},
      language:{required:true}
      
    });
    if(this.isFormValid()){
       this.props.postSignUp(
        this.state.name,
        this.state.email,
        this.state.gender,
        this.state.bloodGroup,
        this.state.dob,
        this.state.mobile,
        this.state.password,
        this.state.diseasesIdSelect,
        this.state.language
        )
          
    }
  }
  render() {
    const diseasesIdSelect=this.state.diseasesIdSelect;
    
    if(this.props.authInfo.isLoading===true){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
      )
    }
    if(this.props.authInfo.isError===true){
      Alert.alert('Alert!',this.props.authInfo.errors,[{text:'Ok'}]);
    }
    if (this.props.authInfo.isSuccess===true) {
      this.props.navigation.navigate('Home');
    }
    const { show, date, mode } = this.state;
    
    return (
        <ScrollView style={styles.wrapper} >
  <Header style={{backgroundColor:"#009479",height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60}} >
        
          <Button transparent  onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="MaterialIcons"/>
          </Button>
        
        
        <Body style={{alignItems:"center",marginRight:"12%"}}>
            <Title style={{alignSelf:"center"}}>{this.props.language.createAccount}</Title>
        </Body>
        
      </Header>
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
            <View>
            </View>
            <View style={{marginTop:"5%"}}>
              <Button rounded style={{flex:1,alignItems:"center",marginLeft:"15%",width:"70%",height:50,backgroundColor:"#17AFB0"}} onPress={this.onDisiesesSubmit}>
                <Text style={{fontSize:22}} >Submit</Text>
              </Button>
            </View>
          </View>
      </Modal>
      <View style={styles.phoneSignUpForm}>
      <Item error={this.isFieldInError('language')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='earth' type="AntDesign"/>
              <Picker
                ref='language'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Language/اللغات"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                onValueChange={this.onlanguageChange.bind(this)}
                selectedValue={this.state.language}
              > 
                <Picker.Item label = {this.props.language.language} value={this.props.language.value}/>
                <Picker.Item label="عربى" value="ar" />
                <Picker.Item label="English" value="en" />
                <Picker.Item label="हिंदी" value="hi" />
                <Picker.Item label="اردو" value="ur" />
                <Picker.Item label="français" value="fr" />
              </Picker>
          </Item>
          <Item error={this.isFieldInError('name')?true:false} rounded style={styles.phoneInput}>
            <Icon name='person'/>
            <Input ref='name' placeholder={this.props.language.name} onChangeText={name=>this.setState({name})} value={this.state.name}/>
          </Item>
          <Item error={this.isFieldInError('email')?true:false} rounded style={styles.phoneInput}>
          <Icon name='ios-mail'/>
            <Input ref='email' placeholder={this.props.language.email} onChangeText={email=>this.setState({email})} value={this.state.email} />
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
                <Picker.Item label={this.props.language.male} value="M" />
                <Picker.Item label={this.props.language.female} value="F" />
              </Picker>
          </Item>
          <Item error={this.isFieldInError('gender')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='ios-water'/>
              <Picker
                ref='blood_group'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
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
            <Input ref='mobile' placeholder={this.props.language.mobile} keyboardType="phone-pad" onChangeText={mobile=>this.setState({mobile})} value={this.state.mobile}/>
          </Item>
          <Item error={this.isFieldInError('password')?true:false} rounded style={styles.phoneInput}>
          <Icon name='form-textbox-password' type='MaterialCommunityIcons'/>
            <Input ref='password' placeholder={this.props.language.password} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
          </Item>
          <View error={this.isFieldInError('diseasesIdSelect')?true:false}  style={styles.phoneInput}>
          <MultiSelect
          items={this.props.disease.diseasesCategories}
          uniqueKey="id"
          ref={(component) => { this.multiselect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={diseasesIdSelect}
          selectText={this.props.language.selectDiseases}
          searchInputPlaceholderText={this.props.language.selectDiseases+"..."}
         // altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#3F51B5"
          tagBorderColor="#4eb9cb"
          tagTextColor="#3F51B5"
          selectedItemTextColor="#3F51B5"
          selectedItemIconColor="#4eb9cb"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#000' }}
          submitButtonColor="#009479"
        />
        </View>
      
      </View>
      
      <View style={{marginTop:"5%",marginBottom:"5%"}}>
      <Button rounded style={{flex:1,alignItems:"center",alignSelf:"center",width:"60%",height:50,backgroundColor:"#009479"}} onPress={this.onSubmit}>
            <Text style={{fontSize:22,textAlign:"center",width:"100%"}} >{this.props.language.submit}</Text>
        </Button>
      </View>
    </ScrollView>
    
    );
  }
}

mapStateToProps = (state) => ({
  disease: state.selectDiseases,
  authInfo:state.auth,
  language:state.selectdLanguage.selectdLanguage,
})

const mapDispatchToProps = (dispatch) => ({
  fetchDisease:()=>dispatch(diseaseAction.fetchDiseaseCategories()),
  postSignUp:(name,email,gender,date,mobile,blood_group, password,disease,language)=>dispatch(signUpAction.signup(name,email,gender,date,mobile,blood_group, password,disease,language))
});
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);