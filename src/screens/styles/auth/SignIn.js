import { StyleSheet,Platform } from 'react-native';
import colors from '../../../styles/colors';


const styles =  StyleSheet.create({
    wrapper:{
        flex:1,
        display:"flex",
        
    },
    phoneHeader:{
        paddingBottom:"70%",
        backgroundColor:"#009479"
    },
    phoneHeaderTitle:{
        marginLeft:Platform.OS == "ios" ? "10%":"25%",
        marginTop:Platform.OS == "ios" ? "40%":"50%",
    },
    phoneHederTitleText:{
        fontSize:28,
        color:colors.white
    },
    phoneSignInForm:{
        marginTop:"3%",
        marginLeft:"3%",
        width:"90%"
    },
    phoneInput:{
        marginBottom:"2%",
    },
    // phone Landscape view
    phoneHeaderLview:{
        paddingBottom:"10%",
    },
    phoneHeaderTitleLview:{
        fontSize:28,
        marginTop:"10%",
        
    },
    phoneHederTitleTextLview:{
        fontSize:28,
        
    },
    // Tab styles
    tabHeader:{
        paddingBottom:"50%",
    },
    tabHeaderTitle:{
        marginLeft:"20%",
        marginTop:"40%",
    },
    tabHederTitleText:{
        fontSize:33,
        color:colors.white,
    },
    tabSignInForm:{
        marginTop:"5%",
        marginLeft:"10%",
        width:"80%"
    },
    tabFormItem:{
        marginBottom:"5%",
        
    },
    tabInput:{
        marginTop:"3%",
        
    },
    tabSignInButton:{
        paddingLeft:"20%",
        paddingBottom:"20%"
    },
    tabSignInButtonText:{
        marginRight:"20%",
        marginTop:"29%",
        fontSize:24
    },
    // Tab LandscapeView
    tabHeaderLview:{
        paddingBottom:"20%",
    },
    tabHeaderTitleLview:{
        marginLeft:"15%",
        marginTop:"15%",
    },
    tabHederTitleTextLview:{
        fontSize:33,
        color:colors.white,
    },
    tabSignInFormLview:{
        marginTop:"5%",
        marginLeft:"20%",
        width:"60%"
    },
    tabSignInButtonLview:{
        paddingLeft:"20%",
        paddingBottom:"10%"
    },
    tabSignInButtonTextLview:{
        marginRight:"20%",
        marginTop:"29%",
        fontSize:24
    },

});

export default styles;