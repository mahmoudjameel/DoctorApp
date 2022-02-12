import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';

const styles =  StyleSheet.create({
    wrapper:{
        flex:1,
        display:"flex",
        alignContent:"space-between",
        
    },
    
    phoneHederTitleText:{
        marginTop:3,
        fontSize:18,
        color:colors.white,
    },
    phoneSignUpForm:{
        marginTop:"5%",
        marginLeft:"5%",
        width:"90%",
    },
    phoneInput:{
        marginBottom:"3%",
    },
    // phone Landscape view
    phoneHeaderLview:{
        paddingBottom:"10%",
    },
    phoneHeaderTitleLview:{
        fontSize:24,
        marginLeft:"20%",
        marginTop:"10%",
        color:colors.white
    },
    phoneHederTitleTextLview:{
        fontSize:28,
        color:colors.white
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
    tabSignUpForm:{
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
    tabSignUpButton:{
        paddingLeft:"20%",
        paddingBottom:"20%"
    },
    tabSignUpButtonText:{
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
    tabSignUpFormLview:{
        marginTop:"5%",
        marginLeft:"20%",
        width:"60%"
    },
    tabSignUpButtonLview:{
        paddingLeft:"20%",
        paddingBottom:"10%"
    },
    tabSignUpButtonTextLview:{
        marginRight:"20%",
        marginTop:"29%",
        fontSize:24
    },
    
});

export default styles;