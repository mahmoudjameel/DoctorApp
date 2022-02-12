import React from 'react'
const mgToGram = 1000;

function getResult(disease, prodDetailsVal) {
    var result;
    for(i=0;i<disease.length;i++){
        var prodVal = prodDetailsVal.filter(pD=>pD.name.includes(disease[i].field));
        console.log(prodDetailsVal);
        console.log(disease);
        console.log(prodVal);
        if(prodVal.length) {
            var per_100g = 0;
            var measurement_unit = 0;
            prodVal = prodVal && prodVal[0];
          	per_100g = prodVal.per_100g.toFixed(2);
            measurement_unit = prodVal.measurement_unit; 
            per_100g = (measurement_unit ==="MG") ? per_100g/mgToGram : per_100g;   
            if(disease[i].flag === "less than") {
                result = Boolean(per_100g <= disease[i].value);   
            }   
            else if(disease[i].flag === "greater than") {
                result = Boolean(per_100g >= disease[i].value);   
            }  
            else {
                result = Boolean(per_100g >= disease[i].greaterValue && per_100g <= disease[i].lessValue);
            }  
            if(disease[i].primary && !result) {
                return "red";
            }
            else if(!disease[i].primary && !result) {
                return "yellow";
            }
            else if(disease.length - 1 == i && result) {
                return "green";
            }
        }
        else {
            var result = (disease[i].primary) ? "red" : "yellow";
            return result;
        }
    }
}
function checkDiseaseSeverity (disease,prodDetails){
var kidney = [{"field":"Sodium","value":0.48,"flag":"less than","primary":true},{"field":"Protein","value":25.7,"flag":"less than","primary":false},{"field":"Vitamin C","value":0.01,"flag":"less than","primary":false}];
var pregnancy = [{"field":"Sodium","value":0.7,"flag":"less than","primary":true},{"field":"Protein","flag":"inbetween","greaterValue":24.11,"lessValue":32.15,"primary":false},{"field":"Total lipid (fat)","flag":"inbetween","greaterValue":24.9,"lessValue":34.9,"primary":false},{"field":"Calcium","value":0.3,"flag":"greater than","primary":false},{"field":"Vitamin C","flag":"inbetween","greaterValue":0.027,"lessValue":0.028,"primary":false},{"field":"Sugars","flag":"less than","value":9.6,"primary":false},{"field":"Fiber","flag":"inbetween","greaterValue":6.4,"lessValue":11.25,"primary":false}];
var diabetes = [{"field":"Carbohydrate","value":50,"flag":"less than","primary":true},{"field":"Calcium","value":0.35,"flag":"greater than","primary":false},{"field":"Sodium","value":0.73,"flag":"less than","primary":true},{"field":"Protein","value":30,"flag":"less than","primary":false},{"field":"Vitamin C","value":0.01,"flag":"less than","primary":false},{"field":"Fatty acids, total saturated","value":7,"flag":"less than","primary":false},{"field":"Total lipid (fat)","flag":"inbetween","greaterValue":20,"lessValue":35,"primary":false}];
var obesity = [{"field":"Carbohydrate","value":16,"flag":"less than","primary":true},{"field":"Fiber","value":0.01,"flag":"inbetween","greaterValue":8,"lessValue":12.2,"primary":true},{"field":"Total lipid (fat)","flag":"inbetween","greaterValue":24.9,"lessValue":34.9,"primary":false},{"field":"Fatty acids, total saturated","value":7,"flag":"less than","primary":false},{"field":"Salt","value":1.9,"flag":"less than","primary":false}];
var hypertension = [{"field":"Sodium","value":0.7,"flag":"less than","primary":true},{"field":"Carbohydrate","value":35,"flag":"less than","primary":false},{"field":"Protein","value":30,"flag":"less than","primary":false},{"field":"Total lipid (fat)","value":30,"flag":"less than","primary":false},{"field":"Calcium","value":0.35,"flag":"greater than","primary":false},{"field":"Vitamin C","flag":"inbetween","greaterValue":0.08,"lessValue":0.16,"primary":false}];
    switch(disease){   
        case "Kidney Stones":
            var result = getResult(kidney,prodDetails)
            return result
        	
        case "Hypertension":  
        var result = getResult(hypertension,prodDetails)
        return result;
        case "Obesity": 
        var result = getResult(obesity,prodDetails)
        return result;
        case "Pregnancy": 
        var result = getResult(pregnancy,prodDetails)
        return result;
        case "Diabetes": 
        var result = getResult(diabetes,prodDetails)
        return result;
        default: return "NA";      
    }
}
export default (checkDiseaseSeverity)