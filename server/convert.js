export const kelvinToCelsius = function(temp){
    
    if(typeof temp != 'number' || isNaN(temp) || temp < 0)
        return 0;

    return ( temp - 273.15 ).toFixed(2);
}

export const kelvinToFahrenheit = function(temp){
    
    if(typeof temp != 'number' || isNaN(temp) || temp < 0)
        return 0;

    return ( (temp * 9/5) - 459.67 ).toFixed(2);
}
