export * from './constants';

export const setItemInLocalStorage = (key,value)=> {
    if(!value || !key){
        return console.error('Cannot Store in LS');
    }

    const valueToStore = typeof value !== "string" ? JSON.stringify(value) : value;
    localStorage.setItem(key , valueToStore); 
}

export const getItemFromLocalStorage = (key)=> {
    if(!key){
        return console.error('Cannot get the value from LS getItemFromLocalStorage');
    }

    
    return localStorage.getItem(key); 
}

export const removeItemFromLocalStorage = (key)=> {
    if(!key){
        return console.error('Cannot get the value from LS removeItemFromLocalStorage');
    }

    
    localStorage.removeItem(key); 
}

export const getFormBody = (params)=> {
    let formBody = [];
     for(let property in params) {
         let encodedKey = encodeURIComponent(property); //'user name => user%20name'
         let encodedValue = encodeURIComponent(params[property]); //swaraj 123 => swaraj%2020123

         formBody.push(encodedKey + '=' + encodedValue);
     }
     return formBody.join('&'); //username=swaraj&password=123
     
}