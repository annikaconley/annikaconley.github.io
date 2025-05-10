//span elements
let couponBox=document.getElementById('coupon');
const prices=[15.00,30.00,50.00,120.00];
const spanElements=document.getElementsByTagName('span');
for(let i=0; i<4; i++){
    spanElements[i].innerHTML= `$${prices[i].toFixed(2)}`;
}
let credit=20.00;
let htmlCredit=document.getElementById("credit");
htmlCredit.innerHTML=`Your credit: $${credit.toFixed(2)}`;

//disable
function disable(element){
    element.disabled=true;
}

//images
let checkbox=[];
for(let i=0; i<4; i++){
    checkbox[i]=document.getElementsByTagName('input')[i];
}
//let Images=document.getElementsByTagName('img');
for(let i=0; i<4; i++){
    document.getElementsByTagName('img')[i].addEventListener('click', function(){
        if(!checkbox[i].disabled)
        checkbox[i].checked= !checkbox[i].checked;
    });
}


//checkout button
let bottomP=document.getElementById("last");

let checkoutButton=document.getElementById("button");
function purchase(){
    let checkedBoxes = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
           checkedBoxes.push(prices[i]); // Push the corresponding price based on index
        }
    }
    if(checkedBoxes.length===0 && couponBox.value!==''){  //if nothing checked and coupon box has a value
        Coupon();
        return;
    }
    let arr=checkedBoxes;
    let sum=0;
    let tax=0;
    for(let el of arr){
      sum+= el;
    }
    tax= sum * 0.0725;  
    let taxString= tax.toFixed(4);  //tax string has 4 decimal places
    if(taxString[taxString.length-2]==='5' && (taxString[taxString.length-3] ==='0'|| taxString[taxString.length-3] ==='2' || taxString[taxString.length-3] ==='4' || taxString[taxString.length-3] === '6' || taxString[taxString.length-3] === '8')){  //if third digit is 5 and prior digit even
      //round down   3.0651 -> 3.06   3.0601
      tax= tax - 0.005; 
      tax= Math.round(tax*100)/100;
    }
    else{ //round normally    
      tax= Math.round(tax*100)/100; //rounds to two decimal points    
    }
    
    let total= sum + tax;
    totalString= total.toFixed(2);
    let receiptString= `&nbsp;&nbsp;&nbsp;&nbsp;$${sum}<br>+ sales tax (7.25%)\<br> = $${totalString}`;
    if(checkedBoxes.length!==0 &&couponBox.value!==''){
        validCoupon();
    }

    if(total>credit){
        alert("You have insufficient credit for this purchase");

    }
    else{
        bottomP.innerHTML=receiptString;
        credit=credit-total;
        htmlCredit.innerHTML=`Your credit: $${credit.toFixed(2)}`;
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked){
               checkbox[i].checked=false; 
               disable(checkbox[i]);
            }
        }

    }
  
}
checkoutButton.addEventListener('click', purchase);




// function sales_total(arr) {
//     let arr=checkedBoxes;
//     let sum=0;
//     let tax=0;
//     for(let el of arr){
//       sum+= el;
//     }
//     tax= sum * 0.0725;  
//     let taxString= tax.toFixed(4);  //tax string has 4 decimal places
//     if(taxString[taxString.length-2]==='5' && (taxString[taxString.length-3] ==='0'|| taxString[taxString.length-3] ==='2' || taxString[taxString.length-3] ==='4' || taxString[taxString.length-3] === '6' || taxString[taxString.length-3] === '8')){  //if third digit is 5 and prior digit even
//       //round down   3.0651 -> 3.06   3.0601
//       tax= tax - 0.005; 
//       tax= Math.round(tax*100)/100;
//     }
//     else{ //round normally    
//       tax= Math.round(tax*100)/100; //rounds to two decimal points    
//     }
    
//     let total= sum + tax;
//     totalString= total.toFixed(2);
//     let receiptString= `$${sum}\n+ sales tax (7.25%)\n = $${totalString}`;
//     //return(receiptString);
//     if(total>credit){
//         alert("You have insufficient credit for this purchase");
//     }
//     else{
//         bottomP.innerHTML=receiptString;
//         credit=credit-total;
//         htmlCredit.innerHTML=`$${credit}`;

//     }
  
//   }


//coupon code
function validCoupon(){

    if(couponBox.value === "COUPON5"){
        credit+=5;
        htmlCredit.innerHTML=`Your credit: $${credit.toFixed(2)}`;
    }
    else if(couponBox.value === "COUPON10"){
        credit+=10;
        htmlCredit.innerHTML=`Your credit: $${credit.toFixed(2)}`;
    }
    else if(couponBox.value === "COUPON20"){
        credit+=20;
        htmlCredit.innerHTML=`Your credit: $${credit.toFixed(2)}`;
    }
    bottomP.innerHTML="";
    couponBox.value='';
}

function Coupon(){
    let isChecked=false;
    let checkedBoxes = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked) {
           isChecked=true;
           break;
        }
    }
    if(isChecked){
        validCoupon();
        purchase();
    }
    else{
        validCoupon();
        //bottomP.innerHTML="";
    }
}
couponBox.addEventListener('keydown',function(e){
    if(e.key==='Enter'){
        Coupon();
    }
});
