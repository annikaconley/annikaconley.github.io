let loginButton= document.getElementById('button');
let passwordBox=document.getElementById('password');
let htmlsection=document.getElementById('Section');
let heading=document.getElementsByTagName('h1')[0];
let clickcounter=0;

function mocking(){
    let p=document.createElement('p');
    //let string= `Somebody knows the password you like to use is ${passwordBox.value}`;
    //let text=document.createTextNode(string);
    //p.appendChild(text);
    p.innerHTML=`Somebody knows the password you like to use is <b>${passwordBox.value}</b>`;
    htmlsection.appendChild(p); 
    ++clickcounter;
    header();
}
function header(){
    heading.innerHTML='';
    heading.innerHTML="HA".repeat(clickcounter);
}
loginButton.addEventListener('click', mocking);
passwordBox.addEventListener('keydown', function(e){
    if(e.key==='Enter')
        mocking();
});
