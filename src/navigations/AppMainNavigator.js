import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppAuthNavigator from './AppAuthNavigator';
import DoctorAppNavagitor from './DoctorAppNavagitor';
import MenuScreen from '../screens/Home/MenuScreen';
import  MyAppointments from "../screens/MyAppointments";
import DrTreatment from '../screens/Home/DrTreatment';
import Medicaition from '../screens/Home/MedicationScreen';
import PesticidesScreen from '../screens/Home/PesticidesScreen';
import CosmeticsScreen from '../screens/Home/CosmeticsScreen';
import AppLoadingScreen  from '../screens/AppLoadingScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoryProductScreen from '../screens/products/CategoryProductsScreen';
import DiseaseProductsScreen from '../screens/products/DiseaseProductsScreen';
import PeriodChoiceProductsScreen from '../screens/products/PeriodChoiceProductsScreen';
import PeriodChoicesScreen from '../screens/products/PeriodChoicesScreenNa';
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from "../screens/EditProfileScreen";
import FavScreen from '../screens/Favorit/FavScreen';
import FavChoiceScreen from "../screens/Favorit/FavChoiceScreen";
import FavProductsScreen from "../screens/Favorit/FavProductsScreen";
import BarcodeSearchScreen from '../screens/BarcodeSearchScreen';
import SearchResultScreen from '../screens/SearchResultScreen';
import UpdatePassword from "../screens/auth/UpdatePassword";
import BarcodeSearchDetailScreen from '../screens/BarcodeSearchDetailScreen';
import ProductNotFoundScreen from '../screens/ProductNotFoundScreen';
import HomeScreen from '../screens/Home/HomeScreen';
import HealthyFood from '../screens/Home/HealthyFood';
import MealScreen from '../screens/products/MealScreen';
import CategoryScreen from '../screens/products/CategoryScreen';
import DiseaseScreen from '../screens/products/DiseaseScreen';
import AlternateProductDetailsScreen from '../screens/products/AlternateProductDetailsScreen';
import SelectLanguageScreen from '../screens/auth/SelectLanguageScreen';
import DoctorsList from '../screens/DrTreatment/DoctorsList';
import DoctorInfoScreen from '../screens/DrTreatment/DoctorInfoScreen';
import DrPersonalInfoScreen from '../screens/DrTreatment/DrPersonalInfoScreen';
import DrWorkingDetailsScreen from '../screens/DrTreatment/DrWorkingDetailsScreen';
import TreatmentsScreen from '../screens/DrTreatment/TreatmentsScreen';
import TretmentDetalisScreen from '../screens/DrTreatment/TreatmentDetalisScreen';
import PatientMedicationsScreen from '../screens/DrTreatment/PatientMedicationsScreen';
import TreatmentsReportScreen from '../screens/DrTreatment/TreatmentReportScreen';
import TreatmentReportDetailsScreen from '../screens/DrTreatment/TreatmentReportDetailsScreen'
import BookingScreen from '../screens/DrTreatment/BookingScreen';
import SummaryScreen from '../screens/DrTreatment/SummaryScreen';
import * as MedicationSearchResultScreen from '../screens/Medicaition/SearchResultScreen';
import * as PesticideSearchResultScreen from '../screens/Pesticides/SearchResultScreen';
import * as CosmeticSearchResultScreen from '../screens/Cosmetics/SearchResultScreen';
import MedicationDetailsScreen from '../screens/Medicaition/MedicationDetailsScreen';
import CosmeticDetailsScreen from '../screens/Cosmetics/CosmeticDetailsScreen';
import PesticideDetailsScreen from '../screens/Pesticides/PesticideDetailsScreen';
import * as MedicationBarcodeSearcScreen from '../screens/Medicaition/BarcodeSearchScreen';
import * as PesticideBarcodeSearchScreen from '../screens/Pesticides/BarcodeSearchScreen';
import * as CosmeticBarcodeSearchScreen from '../screens/Cosmetics/BarcodeSearchScreen';
import * as AddInsuranceScreen from "../screens/AddInsuranceScreen";
import PaymentMethodsScreen from '../screens/payment/PaymentMethodsScreen';
// import Dialog from '../screens/chat/dialogs';
// import Chat from '../screens/chat/chats'
// import VideoScreen from '../screens/chat/video';

import ChampBarcodeScreen from '../screens/ChampBarcodeScreen';
import ChampProducNameScreen from '../screens/ChampProducNameScreen';
import ChampProductCategoriesScreen from '../screens/ChampProductCategoriesScreen';
import ChampTopBrandScreen from '../screens/ChampTopBrandScreen';


const AppStackNavigator = createStackNavigator({
    Home:{
      screen:MenuScreen,
      navigationOptions:{

        header:null
      }
    },
    HealthyFood:{
      screen:HealthyFood,
      navigationOptions:{

        header:null
      }
    },
    DrTreatment:{
      screen:DrTreatment,
      navigationOptions:{

        header:null
      }
    },
    Medications:{
      screen:Medicaition,
      navigationOptions:{

        header:null
      }
    },
    Pesticides:{
      screen:PesticidesScreen,
      navigationOptions:{

        header:null
      }
    },
    Cosmetics:{
      screen:CosmeticsScreen,
      navigationOptions:{

        header:null
      }
    },
    Meal:{
      screen:MealScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',
          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,
        },
        headerTintColor: '#fff',
      }
    },
    ProductCategory:{
      screen:CategoryScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    DiseaseCategory:{
      screen:DiseaseScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,


        },
        headerTintColor: '#fff',
      }
    },
    PeriodChoices:{
      screen:PeriodChoicesScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    Search:{
      screen:SearchScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    CategoryProduct:{
      screen:CategoryProductScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    DiseaseProducts:{
      screen:DiseaseProductsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    PeriodChoiceProducts:{
      screen:PeriodChoiceProductsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    ProductDetails:{
      screen:ProductDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle: "Product Details"
      }
      
    },
    AlternateProductDetails:{
      screen:AlternateProductDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    BarcodeSearch:{
      screen:BarcodeSearchScreen
    },
    BarcodeSearchDetails:{
      screen:BarcodeSearchDetailScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    SearchResult:{
      screen:SearchResultScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    Favourite:{
      screen:FavScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    FavChoice:{
      screen:FavChoiceScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    FavProducts:{
      screen:FavProductsScreen,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    Profile:{
      screen:ProfileScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',

      }
    },
    EditProfile:{
      screen:EditProfileScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',

      }
    },
    ChangePassword:{
      screen:UpdatePassword,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    ProductNotFound:{
      screen:ProductNotFoundScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    ListDoctors:{
      screen:DoctorsList,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Doctos list"
      }
    },
    DoctorInfo:{
      screen:DoctorInfoScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Doctor Info"
      }
    },
    DrBooking:{
      screen:BookingScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',height:110,

        },
        headerTintColor: '#fff',
        headerTitle:"Appointment",
      }

    },
    DrPersonalInfo:{
      screen:DrPersonalInfoScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',
          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Dr Personal Info"
      }
    },
    DrWorkDetails:{
      screen:DrWorkingDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Dr Working Info"
      }
    },
    Treatments:{
      screen:TreatmentsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTitle:'Treatment History',
        headerTintColor: '#fff',
      }
    },
    TreatmentDetails:{
      screen:TretmentDetalisScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      }
    },
    PatientMedications:{
      screen:PatientMedicationsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTitle:'Medications',
        headerTintColor: '#fff',
      }
    },
    TreatmentReport:{
      screen:TreatmentsReportScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTitle:'Treatment Reports',
        headerTintColor: '#fff',
      },
    },
    TreatmentReportDetail:{
      screen:TreatmentReportDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      },
    },
    PaymentSummary:{
      screen:SummaryScreen,
      navigationOptions:{

        header:null
      }
    },
    MedicationSearchResult:{
      screen:MedicationSearchResultScreen.default,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Medications"
      },
    },
    MedicationBarcodeSearch:{
      screen:MedicationBarcodeSearcScreen.default
    },
    MedicationDetails:{
      screen:MedicationDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Medication Details"
      },
    },
    PesticideSearchResult:{
      screen:PesticideSearchResultScreen.default,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Pesticides"
      },
    },
    PesticideDetails:{
      screen:PesticideDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Pesticides Details"
      },
    },
    PesticideBarcodeSearch:{
      screen:PesticideBarcodeSearchScreen.default,
    },
    CosmeticSearchResult:{
      screen:CosmeticSearchResultScreen.default,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Cosmetics"
      },
    },
    CosmeticDetails:{
      screen:CosmeticDetailsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
      },
    },
    CosmeticBarcodeSearch:{
      screen:CosmeticBarcodeSearchScreen.default
    },
    AddInsurance:{
      screen:AddInsuranceScreen.default
    },
    PaymentMethods:{
      screen:PaymentMethodsScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Payment Method"
      },
    },
    // ChatDialogs:{
    //   screen:Dialog
    // },
    // Chat:{
    //   screen:Chat,
    // },
    // VideoCall:{
    //   screen:VideoScreen
    // },
    ChampBarcode:{
      screen:ChampBarcodeScreen
    },
    champProductName:{
      screen:ChampProducNameScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Product List"
        
      },
    },

    champProductCategories:{
      screen:ChampProductCategoriesScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Product List"
      },
    },

    champTopBrand:{
      screen:ChampTopBrandScreen,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Product List"
      },
    },
    patientAppointments:{
      screen:MyAppointments,
      navigationOptions:{
        headerStyle: {
          backgroundColor: '#009479',          height:110,borderBottomLeftRadius:60,borderBottomRightRadius:60,

        },
        headerTintColor: '#fff',
        headerTitle:"Appointment History"
      },

    }

    
    

});
  

const AppSwitchNavigator = createSwitchNavigator(
  {
    Authloading:AppLoadingScreen,
    SelectLanguage:SelectLanguageScreen,
    App: AppStackNavigator,
    Auth: AppAuthNavigator,
    Doctor:DoctorAppNavagitor,
  },
  {
    initialRouteName: 'Authloading',
  }
);

export default createAppContainer(AppSwitchNavigator)