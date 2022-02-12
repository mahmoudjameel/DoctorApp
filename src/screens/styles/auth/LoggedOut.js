import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

let termsTextSize = 13;
let headingTextSize = 22;
const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      display: 'flex',
    },
    
    welcomeWrapper: {
      flex: 3,
      display: 'flex',
      flexDirection:'column',
      padding: "2%",
      marginBottom:"2%",
    },
    logo: {
      width: "70%",
      alignItems:"center",
      alignSelf:"center",
      
    },
    phoneWelcomeText: {
      fontSize: headingTextSize,
      color: "#7c7a7a",
      fontWeight: '200',
      textAlign:"center",
      fontWeight:"bold"
    },
    phoneButtonContainer:{
        flex:2,
        flexDirection:"column",
        marginTop:"20%",
        
    },
    phoneButton:{
        
        width:"95%",
        alignItems:"center",
        alignSelf:"center",
        marginBottom:"6%",
        borderRadius:8,
        paddingBottom:"15%",
        
    },
    phoneButtonText:{
        fontSize:18,
        textAlign:'center',
        width:"100%",
        
    },
    phoneWelcomeTextLview: {
        fontSize: 33,
        color: colors.black,
        fontWeight: '300',
        marginTop: "1%",
        textAlign:"center"
    },
    phoneButtonContainerLview:{
        flex:1,
        flexDirection:"column",
        marginTop:"4%",
        width:"100%",          
        marginLeft:"25%",
    },
    phoneButtonLview:{
        width:"50%",
        alignItems:"center",
        marginBottom:"2%",
        borderRadius:11,
        paddingBottom:"8%"
    },
    phoneButtonTextLview:{
        fontSize:24,
        textAlign:'center',
        width:"100%",
      
        
    },
    tabWelcomeTextLview: {
        fontSize: 44,
        color: colors.black,
        fontWeight: '300',
        marginTop: "5%",
        textAlign:"center"
    },
    tabButtonContainerLview:{
          flex:1,
          marginTop:"10%",
          width:"40%",
          alignItems:"center",
          marginLeft:"30%",
    },
    tabButtonLview:{
        marginBottom:"2%",
        borderRadius:11,
        paddingBottom:"15%"
    },
    tabButtonTextLview:{
        fontSize:30,
        paddingTop :"8%",
        textAlign:'center',
        width:"100%",
        
    },
    tabWelcomeText: {
        fontSize: 44,
        color: colors.black,
        fontWeight: '300',
        marginTop: "30%",
        textAlign:"center"
    },
    tabButtonContainer:{
          flex:1,
          marginTop:"10%",
          width:"60%",
          alignItems:"center",
          marginLeft:"20%",
    },
    tabButton:{
        marginBottom:"6%",
        borderRadius:11,
        paddingBottom:"15%",
    },
    tabButtonText:{
        fontSize:30,
        paddingTop :"5%",
        textAlign:'center',
        width:"100%",
        
    },
    termsAndConditions: {
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: 30,
    },
    termsText: {
      color: colors.white,
      fontSize: termsTextSize,
      fontWeight: '600',
    }    
  });
  
  export default styles;
  