let usernameBox=document.getElementById("username");
let boxClick=document.getElementById("button");

function validate_username(username) {
  // fill in
  let validateString="";
  let Valid=true;
  if(username.length<5){
    Valid=false;
    validateString+= "Username must be 5 characters or longer. \n";
  }
  if(username.length>40){
    Valid=false;
    validateString+= "Username must be 40 or less characters. \n";
  }
  if(username.includes(' ')){
    Valid=false;
    validateString+= "Username cannot contain spaces. \n";
  }
  if(username.includes(',')){
    Valid=false;
    validateString+= "Username cannot contain commas. \n";
  }
  if(username.includes(';')){
    Valid=false;
    validateString+= "Username cannot contain semicolons. \n";
  }
  if(username.includes('=')){
    Valid=false;
    validateString+= "Username cannot contain equal signs. \n";
  }
  if(username.includes('&')){
    Valid=false;
    validateString+= "Username cannot contain the ampersands. \n";
  }
  //regular expression
  let checkRegex=true;
  let regex= /^[a-zA-Z0-9!@#$%^*()\-_+\[\]{}:'|`~<.>\/?]*$/; 
  if(!regex.test(username)){
    checkRegex=false;   //has illegal char
    Valid=false;
  }
  if(validateString==="" && checkRegex===false)
    validateString= "Username can only use characters from the following string:\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789\n!@#$%^*()-_+[]{}:'|`~<.>/?";
  if(Valid){
    document.cookie=`username=${usernameBox.value}; expires= ${expire()}`;
    window.location.assign('index.html');
  } 
else
alert(validateString);
}
function expire(){
  let hour_in_future= new Date();
  return hour_in_future.setHours(hour_in_future.getHours()+1).UTCString;
}

boxClick.addEventListener("click", function(){
  validate_username(usernameBox.value);
})
usernameBox.addEventListener("keydown", function(keyData){
  if(keyData.key==='Enter'){
    validate_username(usernameBox.value);
  }
})

let usernameCookie=get_username();
if(usernameCookie!==''){
  usernameBox.value=usernameCookie;
}

