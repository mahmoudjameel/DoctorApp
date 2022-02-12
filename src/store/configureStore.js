import { createStore, combineReducers, applyMiddleware } from 'redux';
import productReducer from './reducers/products';
import productCategoryReducer from './reducers/productsCategory';
import periodReducer from './reducers/periods';
import choiceReducer from './reducers/choices';
import diseasesReducer from './reducers/diseases';
import userDetailsReducer from './reducers/userDetails';
import productDetailsReducer from './reducers/productDetails';
import favouritesReducer from './reducers/favourits';
import productDiseasesReducer from './reducers/productDiseases'
import authReducer from './reducers/auth';
import authDRReducer from './reducers/drauth';
import selectLanguageReducer from './reducers/selectLanguage';
import specialistListReducer from './reducers/listSpecialist';
import hospitalsReducer from './reducers/hospitals';
import clinicsReducer from './reducers/clinics';
import jobTypesReducer from './reducers/jobTypes';
import countriesReducer from './reducers/countries';
import doctorsReducer from './reducers/doctors';
import doctorAvailablityReducer from './reducers/doctorAvailablity';
import AvailablityDaysTimeReducer from './reducers/DaysTimes';
import doctorAppointmentsReducer from './reducers/appointments';
import upcomingAppointmentsReducer from'./reducers/upcomingappointments';
import doctorDetailsReducer from'./reducers/doctorDetails';
import patientDetailsReducer from './reducers/patientDetails';
import medicationsReducer from './reducers/medications';
import consultationReducer from './reducers/consultations';
import prescriptionsReducer from './reducers/prescriptions';
import diagnosisReportsReducer from './reducers/diagnosisReports';
import medicationCategoriesReducer from './reducers/medicationCategories';
import medicationDetailsReducer from './reducers/medicationDetails';
import pesticidesReducer from './reducers/pesticides';
import pesticidesCategoriesReducer from './reducers/pesticidesCategories';
import pesticideDetailsReducer from './reducers/pesticideDetails';
import cosmeticsReducer from './reducers/cosmetics';
import cosmeticCategoriesReducer from './reducers/cosmeticsCategories';
import cosmeticDetailsReducer from './reducers/cosmeticsDetails';
import userTypeReducer from './reducers/userType';
import appointmentResponseReducer from './reducers/appointResponse';
import doctorPricingReducer from './reducers/doctorPricing';
import insuranceCompaniesReducer from './reducers/InsuranceComapnies';
import employerReducer from './reducers/employersCompanies';
import myEmplyeerInsuranceReducer from './reducers/myEmployeerInsurance';
import myPersonalInsuranceReducer from './reducers/myPersonalInsurance';
import champProductReducer from './reducers/champProducts';
import patientAppointmentReducer from './reducers/patientAppointments'
// chat reducers
import chatCurrentUserReducer from './reducers/chatCurrentUser'
import ReduxThunk from 'redux-thunk';
import dialogs from './reducers/chat/dialogs'
import messages from './reducers/chat/messages'
import connection from './reducers/chat/connection'
import users from './reducers/chat/users'
import selectedDialog from './reducers/chat/selectedDialog'
import myEmployeerInsurance from './reducers/myEmployeerInsurance';
import myPersonalInsurance from './reducers/myPersonalInsurance';
import videoSessionReducer from './reducers/chat/videoSession'
import alertReducer from './reducers/chat/alert';
import doctorAppointmentsHistoryReducer from './reducers/docappointmentHistory';

const rootReducer = combineReducers(
{  
    specialistList:specialistListReducer,
    doctors:doctorsReducer,
    doctorAvailablity:doctorAvailablityReducer,
    hospitals:hospitalsReducer,
    clinics:clinicsReducer,
    countries:countriesReducer,
    jobTypes:jobTypesReducer,
    product: productReducer,
    champProducts: champProductReducer,
    selectdLanguage:selectLanguageReducer,
    product_diseases:productDiseasesReducer,
    product_details:productDetailsReducer,
    product_categories : productCategoryReducer,
    periods:periodReducer,
    choices:choiceReducer,
    selectDiseases : diseasesReducer,
    userDetails:userDetailsReducer,
    userType:userTypeReducer,
    favourites:favouritesReducer,
    auth:authReducer,
    drauth:authDRReducer,
    daysTimings:AvailablityDaysTimeReducer,
    doctorAppointments:doctorAppointmentsReducer,
    doctorAppointmentResponse:appointmentResponseReducer,
    doctorPricing:doctorPricingReducer,
    upcomingAppointments:upcomingAppointmentsReducer,
    doctorDetails:doctorDetailsReducer,
    patientDetails:patientDetailsReducer,
    medications:medicationsReducer,
    medicationCategories:medicationCategoriesReducer,
    pesticides:pesticidesReducer,
    pesticideCategories:pesticidesCategoriesReducer,
    pesticideDetails:pesticideDetailsReducer,
    cosmetics:cosmeticsReducer,
    cosmeticsCategories:cosmeticCategoriesReducer,
    cosmeticDetails:cosmeticDetailsReducer,
    consultations:consultationReducer,
    prescriptions:prescriptionsReducer,
    dignosisReports:diagnosisReportsReducer,
    medicationDetails:medicationDetailsReducer,
    employers:employerReducer,
    insuranceCompanies:insuranceCompaniesReducer,
    myPersonallInsurance:myPersonalInsuranceReducer,
    myEmployeerInsurance:myEmplyeerInsuranceReducer,
    //chat reducers
    chatCurrentUser:chatCurrentUserReducer,
    chatDialogs:dialogs,
    chatMessages:messages,
    chatConnections:connection,
    chatUsers:users,
    chatSelectedDialog:selectedDialog,
    videosession:videoSessionReducer,
    alert:alertReducer,
    patientAppointments:patientAppointmentReducer,
    doctorAppointmentsHistory:doctorAppointmentsHistoryReducer
 }
);



const Store = createStore(rootReducer,applyMiddleware(ReduxThunk));

export default Store;