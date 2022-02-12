import { INSURANCE_COMPANIES,INSURANCE_EMPLOYEER_COMANIES,BASE_URL,SET_PERSONAL_INSURANCE,SET_EMPLOYEER_INSURANCE} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEmployeer = ()=>{
    return async dispatch => {
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/employeer/companies'
            );
            if (!response.ok){
                throw new Error('Something went wrong!')
            }
            const resData = await response.json(); 
            dispatch({type:INSURANCE_EMPLOYEER_COMANIES,employers:resData})
        }
        catch(err){
            throw err
        }

    }

}


export const fetchInsuranceCompanies = ()=>{
    return async dispatch=>{
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/personal/companies'
            );
            if(!response.ok){
                throw new Error("something went wrong");
            }
            const resData = await response.json();
            dispatch({type:INSURANCE_COMPANIES,insuranceCompanies:resData})
        }
        catch(err){
            throw err
        }
    }
}

export const AddPersonallInsurance = (data)=>{
    return async dispatch=>{
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/personal/request',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      user_id:data.user_id,
                      insure_company_id:data.selectedInsuranceCompany,
                      insurance_id:data.insuranceNumber,
                })
                }
                
              );
                if (!response.ok) {
                throw new Error('Something went wrong!');
              }
              if(response.ok){
                const resData = await response.json(); 
                dispatch(fetchUserPersonalInsurance(data.user_id))
              }
        }
        catch(err){
            throw err
        }
    }
}

export const AddEmployeerInsurance = (data)=>{
    return async dispatch=>{
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/employee/request',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      user_id:data.user_id,
                      employeer_id:data.selectedEmployeer,
                      emplyee_id:data.employeeId,
                      employee_email:data.employeeEmail,
                })
                }
                
              );
              
                if (!response.ok) {
                    const resData = await response.json(); 
                throw new Error('Something went wrong!');
              }
              if(response.ok){
                dispatch(fetchUserEmployeerInsurance(data.user_id));
              }
        }
        catch(err){
            
            throw err
        }
    }
}


export const fetchUserEmployeerInsurance = (user_id)=>{
    return async dispatch=>{
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/employeer/insurance/'+user_id,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                      }
                  }
                
              );
              if(response.ok){
                const resData = await response.json(); 
                await dispatch({ type: SET_EMPLOYEER_INSURANCE, myEmployeerInsurance:resData,});
              }
        }
        catch(err){
            throw err
        }
    }
}

export const fetchUserPersonalInsurance = (user_id)=>{
    return async dispatch=>{
        try{
            const response = await fetch(
                BASE_URL+'/insurance/api/personal/insurance/'+user_id,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                      } 
                  }
                
              );
              console.log(response);
              if(response.ok){
                const resData = await response.json(); 
                await dispatch({ type: SET_PERSONAL_INSURANCE, myPersonallInsurance:resData,});
              }
        }
        catch(err){
            throw err
        }
    }
}