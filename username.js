
function get_username(){
    const nvs=document.cookie.split(';');
    let value='';
    for(const nv of nvs){
        if(nv.startsWith('username=')){
           value=nv.substring('username'.length+1);
      }
    }
    return value;
}
//if(window.location.pathname==='/~annikaconley/HW5/index.html'|| window.location.pathname==='/~annikaconley/HW5/'){
    let greeting= document.getElementById('greeting'); 
    let isCookieVal=get_username();
    if(isCookieVal!==''){
        greeting.innerHTML= `Hello, ${isCookieVal}!`;
    }
    if(isCookieVal===''){
        window.location.assign('login.html');
    }
//}

  