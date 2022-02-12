import { createStackNavigator } from 'react-navigation-stack';
import LoggedOut from '../screens/auth/LoggedOut';
import DrHomeScreen from '../screens/DrScreens/DrHomeScreen'
import PatientConsultScreen from '../screens/DrScreens/PatientConsultScreen';
import PatientsScreen from '../screens/DrScreens/PatientsScreen';
import AppoinmentsScreen from '../screens/DrScreens/AppoinmentsScreen';
import PatientInfoScreen from '../screens/DrScreens/PatientInfoScreen';
import AvailabilityScreen from '../screens/DrScreens/AvailabilityScreen';
import AddDrugScreen from '../screens/DrScreens/AddDrugScreen'
import AddReportScreen from '../screens/DrScreens/AddReportScreen';
import FinishConsultationScreen from '../screens/DrScreens/FinishConsultationScreen';
import ProfileScreen from '../screens/DrScreens/ProfileScreen';
import AppointmentsHistory from '../screens/DrScreens/AppointmentsHistory';
// import Dialog from '../screens/chat/dialogs';
// import Chat from '../screens/chat/chats'
// import VideoScreen from '../screens/chat/video'

const DoctorAppNavagitor = createStackNavigator({
    DrHome:{
      screen:DrHomeScreen,      
      navigationOptions: { header: null, }
    },
    Consult:{
        screen:PatientConsultScreen,
        navigationOptions:{
            header:null
          }
    },
    Patients:{
        screen:PatientsScreen,
        navigationOptions:{
            headerStyle: {
              backgroundColor: '#009479',   height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
            },
            headerTintColor: '#fff',
            
          }

    },
    DrAppoinments:{
        screen:AppoinmentsScreen,
        
    },
    PatientInfo:{
        screen:PatientInfoScreen,
        navigationOptions:{
            headerStyle: {
              backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
            },
            headerTintColor: '#fff',
            headerTitle:"Patient Info"
          }
    },
    Availability:{
      screen:AvailabilityScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
        },
        headerTintColor: '#fff',
        headerTitle:"Selact Availabality"
      }
    },
    AddDrug:{
      screen:AddDrugScreen,
      navigationOptions:{
      header:null
      }
    },
    AddReport:{
      screen:AddReportScreen,
      navigationOptions:{
        header:null
      }
    },
    FinishConsultation:{
      screen:FinishConsultationScreen,
      navigationOptions:{
        title:"Finish",
        headerStyle: {
          backgroundColor: '#009479' ,        height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
        },
        headerTintColor: '#fff',
      }
    },
    DrProfile:{
      screen:ProfileScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
        },
        headerTintColor: '#fff',

      }
    },
    // DrChatDialogs:{
    //   screen:Dialog
    // },
    // DrChat:{
    //   screen:Chat,
    // },
    // VideoCall:{
    //   screen:VideoScreen
    // },
    doctorAppointmentsHistory:{
      screen:AppointmentsHistory,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Appointment History"
      },

    }



  });
  
  

export default DoctorAppNavagitor;
  