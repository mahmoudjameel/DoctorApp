import React from 'react';
import {View,Dimensions,FlatList,Alert,Modal,ScrollView,ActivityIndicator,TouchableOpacity,TextInput} from 'react-native';
import { Container, Header, Title,Body, Button,
        Icon, Left, Right,Form,Item,ListItem, Label,CheckBox,Text,Picker,Input} from "native-base";
import styles from '../../styles/auth/SignUp';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import * as signUpAction from '../../../store/actions/auth'
import * as specialistListAction from '../../../store/actions/listSpecialist';
import * as hospitalsAction from '../../../store/actions/hospital';
import * as clinicsAction from '../../../store/actions/clinics';
import * as jobTypesAction from '../../../store/actions/jobTypes';
import * as countriesAction from '../../../store/actions/countries'

class DrSignUpScreen extends ValidationComponent {
  state = {
    device : Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    name: '',
    userName:'',
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
    drAddress:'',
    workAddress:'',
    specialityId:'',
    hospitalId:0,
    clinicId:0,
    residentCountryId:'',
    jobType:'',
    employeeId:'',
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
    
    this.props.fetchSpecialistList()
    this.props.fetchClinics();
    this.props.fecthHospitals()
    this.props.fetchJobTypes()
    this.props.fetchCountries()
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
  onSpecialistChange(value){
    this.setState({
      specialityId:value
    });
  }
  onHospitalChange(value){
    this.setState({
      hospitalId:value
    });
  }
  onClinicChange(value){
    this.setState({
      clinicId:value
    });
  }
  onJobTypeChange(value){
    this.setState({
      jobType:value
    })
  }
  onCountryChange(value){
    this.setState({
      residentCountryId:value
    })
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
  
  onSubmit=()=>{
    
    this.validate({
      name: {required: true},
      email: {email: true,required:true},
      gender:{required:true},
      date: {date: 'YYYY-MM-DD'},
      mobile:{required:true},
      password:{required:true},
      bloodGroup:{required:true},
      language:{required:true},
      userName:{required:true},
      drAddress:{required:true},
      workAddress:{required:true},
      hospitalId:{required:true},
      clinicId:{required:true},
      specialists:{required:true},
      residentCountryId:{required:true},
      jobType:{required:true},
      employeeId:{required:true}


      
    });
    if(this.isFormValid()){


       this.props.postDoctorSignUp(
        this.state.name,
        this.state.email,
        this.state.gender,
        this.state.bloodGroup,
        this.state.dob,
        this.state.mobile,
        this.state.password,
        this.state.residentCountryId,
        this.state.workAddress,
        this.state.userName,
        this.state.drAddress,
        this.state.specialityId,
        this.state.employeeId,
        this.state.jobType,
        this.state.hospitalId,
        this.state.clinicId,
        this.state.language
        )
          
    }
  }
  render() {
    if(this.props.specialists === null || this.props.hospitals === null || this.props.clinics ===null || this.props.countries === null || this.props.jobTypes === null){
      return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
      )
    }
    
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
      Alert.alert('Thank You!',"we will contact you!",[{text:'Ok' ,onPress:()=> this.props.navigation.navigate('Auth')}]);
    }
    const { show, date, mode } = this.state;
    
    return (
        <ScrollView style={styles.wrapper} >
        <Header style={{backgroundColor:"#004fac"}}>
        <Left>
          <Button transparent  onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" type="MaterialIcons"/>
          </Button>
        </Left>
        <Body>
            <Title>{this.props.language.createAccount}</Title>
        </Body>
      </Header>
      <View style={styles.phoneSignUpForm}>
        <Item error={this.isFieldInError('language')?true:false} rounded picker style={styles.phoneInput}>
          <Icon name='language' type="Entypo"/>
              <Picker
                ref='language'
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Language/اللغات"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.language}
                onValueChange={this.onlanguageChange.bind(this)}
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
          <Item error={this.isFieldInError('userName')?true:false} rounded style={styles.phoneInput}>
            <Icon name='person'/>
            <Input ref='name' placeholder="User Name" onChangeText={userName=>this.setState({userName})} value={this.state.userName}/>
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
          <Item error={this.isFieldInError('date')?true:false} rounded style={styles.phoneInput}>
            <Button rounded transparent style={{width:"100%"}} onPress={this.datepicker}>
            <Icon name='cake'type='MaterialCommunityIcons' style={{color:"black"}} />
              <Text ref='date'  style={{color:"black"}}>{ mode === 'date' && moment.utc(date).format('YYYY/MM/DD') }</Text>
            </Button>
            
              { show && <DateTimePicker value={date}
                          mode={mode}
                          is24Hour={true}
                          display="default"
                          onChange={this.setDate} />
              }
          </Item>
          <Item error={this.isFieldInError('mobile')?true:false} rounded style={styles.phoneInput}>
          <Icon name='ios-phone-portrait'/>
            <Input ref='mobile' placeholder={this.props.language.mobile} keyboardType="phone-pad" onChangeText={mobile=>this.setState({mobile})} value={this.state.mobile}/>
          </Item>
          <Item error={this.isFieldInError('bloodGroup')?true:false} rounded picker style={styles.phoneInput}>
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
          <Item error={this.isFieldInError('password')?true:false} rounded style={styles.phoneInput}>
          <Icon name='form-textbox-password' type='MaterialCommunityIcons'/>
            <Input ref='password' placeholder={this.props.language.password} secureTextEntry={true} onChangeText={password=>this.setState({password})}/>
          </Item>
          <Item error={this.isFieldInError('drAdderss')?true:false} rounded style={styles.phoneInput}>
          <Icon name='address' type='Entypo'/>
            <Input ref='resAddress' placeholder="Residential Address" onChangeText={drAddress=>this.setState({drAddress})}/>
          </Item>
          <Item error={this.isFieldInError('spicality')?true:false} rounded picker style={styles.phoneInput}>
            <Icon name = 'doctor' type='MaterialCommunityIcons'/>
          <Picker
                ref='spicality'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.specialityId}
                onValueChange={this.onSpecialistChange.bind(this)}
              > 
              <Picker.Item label ="Select Specialist" value={0}/>
               {this.props.specialists.specialistList.map(spe=>(
                        <Picker.Item label={spe.name} value={spe.id}/>
                      ))}
          </Picker>
          </Item>
          <Item error={this.isFieldInError('hospitalId')?true:false} rounded picker style={styles.phoneInput}>
            <Icon name="hospital-building" type="MaterialCommunityIcons"/>
          <Picker
                ref='hospitalName'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Hospital Name"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.hospitalId}
                onValueChange={this.onHospitalChange.bind(this)}
              > 
               <Picker.Item label ="Select Hospital"/>
               {this.props.hospitals.map(data=>(
                        <Picker.Item label={data.name} value={data.id}/>
                      ))}
          </Picker>
          </Item>
          <Item error={this.isFieldInError('clinicId')?true:false} rounded picker style={styles.phoneInput}>
            <Icon name="hospital-symbol" type="FontAwesome5"/>
          <Picker
                ref='clinicName'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Hospital Name"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.clinicId}
                onValueChange={this.onClinicChange.bind(this)}
              > 
                <Picker.Item label ="Select Clinic" value={0}/>
               {this.props.clinics.map(data=>(
                        <Picker.Item label={data.name} value={data.id}/>
                      ))}
          </Picker>
          </Item>
          <Item error={this.isFieldInError('workAdderss')?true:false} rounded style={styles.phoneInput}>
          <Icon name='address' type='Entypo'/>
            <Input ref='WorkAddress' placeholder="Work Address" onChangeText={workAddress=>this.setState({workAddress})}/>
          </Item>
          <Item error={this.isFieldInError('residentCountryId')?true:false} rounded picker style={styles.phoneInput}>
            <Icon name="earth" type="MaterialCommunityIcons"/>
          <Picker
                ref='residentCountry'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Resident Country"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.residentCountryId}
                onValueChange={this.onCountryChange.bind(this)}
              > 
                <Picker.Item label ="select country"/>
               {this.props.countries.map(data=>(
                        <Picker.Item label={data.name} value={data.id}/>
                      ))}
          </Picker>
          </Item>
          <Item error={this.isFieldInError('jobType')?true:false} rounded picker style={styles.phoneInput}>
            <Icon name="earth" type="MaterialCommunityIcons"/>
          <Picker
                ref='job'
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Job Role"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.jobType}
                onValueChange={this.onJobTypeChange.bind(this)}
              > 
                <Picker.Item label ="Job Role" value={0}/>
               {this.props.jobTypes.map(data=>(
                        <Picker.Item label={data.name} value={data.id}/>
                      ))}
          </Picker>
          </Item>
          <Item error={this.isFieldInError('emloyeeId')?true:false} rounded style={styles.phoneInput}>
            <Icon name='user-md' type='FontAwesome'/>
            <Input ref='employeeId' placeholder="Employee ID" onChangeText={employeeId=>this.setState({employeeId})}/>
          </Item>
      </View>
      <View style={{marginTop:"5%",marginBottom:"5%"}}>
        <Button rounded style={{flex:1,alignItems:"center",marginLeft:"15%",width:"70%",height:50}} onPress={this.onSubmit}>
            <Text style={{fontSize:22}} >{this.props.language.submit}</Text>
        </Button>
      </View>
    </ScrollView>
    );
  }
}

mapStateToProps = (state) => ({
  specialists:state.specialistList,
  authInfo:state.drauth,
  language:state.selectdLanguage.selectdLanguage,
  hospitals:state.hospitals.hospitals,
  clinics:state.clinics.clinics,
  jobTypes:state.jobTypes.jobTypes,
  countries:state.countries.countries,
})

const mapDispatchToProps = (dispatch) => ({
  fetchSpecialistList:()=>dispatch(specialistListAction.fetchDoctorSpicalists()),
  fecthHospitals:()=>dispatch(hospitalsAction.fecthHospitals()),
  fetchClinics:()=>dispatch(clinicsAction.fethClinics()),
  fetchJobTypes:()=>dispatch(jobTypesAction.fetchJobTypes()),
  fetchCountries:()=>dispatch(countriesAction.fetchCountries()),
  postDoctorSignUp:(name,email,gender,date,mobile,blood_group, password,residentCountryId,workAddress,userName,drAddress,specialityId,employeeId,jobType,hospitalId,clinicId,language)=>dispatch(signUpAction.doctorSignup(name=name,email=email,gender=gender,date=date,mobile=mobile,blood_group=blood_group, password=password,residentCountryId=residentCountryId,workAddress=workAddress,userName=userName,drAddress=drAddress,specialityId=specialityId,employeeId=employeeId,jobType=jobType,hospitalId=hospitalId,clinicId=clinicId,language=language))
});
export default connect(mapStateToProps,mapDispatchToProps)(DrSignUpScreen);