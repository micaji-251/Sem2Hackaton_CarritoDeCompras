// VARIABLES

const menuSection = document.querySelector('.menuSection');
let itemShoppingListAccumulted = [];
let itemShoppingList = '';
let a = false;
let b = '';
let quantityIcon = 0;
let priceAcumulation =0;
const basketListContainer = document.querySelector('.basketListContainer');
const basketTotal = document.querySelector('.basketTotal');
const shoppingBasketIcon = document.querySelector('.shoppingBasketIcon');
const counterIcon = document.querySelector('.counterIcon');
const basketListContainerItems = document.querySelector('.basketListContainerItems');

loadListeners();
// LISTENERS

function loadListeners(){
    document.addEventListener('DOMContentLoaded',getLocalStorage);
    menuSection.addEventListener('click', saveMenuIItem);
    shoppingBasketIcon.addEventListener('click',showBasketList);
    basketListContainerItems.addEventListener('click',eraseIndividualItem);

}



// FUNCIONES

function saveMenuIItem(e){
    if (e.target.classList.contains('btnAddBasket')){
         let menuItem = e.target.parentElement;

         itemShoppingList = {
            quantity: 1,
            name : menuItem.querySelector('.menuTitle').textContent,
            price : Number(menuItem.querySelector('.precio').textContent.replace(/\D/g,'')),
        }

        filterItemList();

    }
}


function filterItemList(){

    a = itemShoppingListAccumulted.some((item)=>{
        return item.name === itemShoppingList.name;   
    });

    if (a){

        b = itemShoppingListAccumulted.find((item)=>{
        if(item.name === itemShoppingList.name){
            item.quantity+=1      
            }
        })
        saveLocalStorage(itemShoppingListAccumulted);
        printShoppingListAccumulated();

    } else{

        itemShoppingListAccumulted = [...itemShoppingListAccumulted, itemShoppingList];
        saveLocalStorage(itemShoppingListAccumulted);
        printShoppingListAccumulated();
        return;

    }
}

function saveLocalStorage(listToSave){
    localStorage.setItem('shoppingList', JSON.stringify(listToSave));

}

function getLocalStorage(){
    itemShoppingListAccumulted = JSON.parse(localStorage.getItem('shoppingList'));
    if(!itemShoppingListAccumulted){
        itemShoppingListAccumulted=[];
        basketTotal.innerHTML='<p class="basketTotalText">CARRITO VACIO</p>';
    }else{
    printShoppingListAccumulated();
    }
}

function printShoppingListAccumulated(){
    basketListContainerItems.textContent=''
    // priceAcumulation=0;
    
    itemShoppingListAccumulted.forEach((item)=>{
        itemToPrint = document.createElement('div');

        itemToPrint.classList='basketItem grid4';

        // quantityIcon = quantityIcon + item.quantity;
        // priceAcumulation = priceAcumulation + (item.price*item.quantity);

        itemToPrint.innerHTML=`
            <p class="quantity">${item.quantity}</p>
            <p class="basketTitle">${item.name}</p>
            <p class="basketPrecio">${item.price*item.quantity}</p>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        
        `
        basketListContainerItems.appendChild(itemToPrint);
    })

    // basketTotal.innerHTML=`<p class="basketTotalText">Total:  $ ${priceAcumulation}</p>`;

    calculateTotal(itemShoppingListAccumulted);
    calculateIconCount(itemShoppingListAccumulted);

    // counterIcon.textContent=quantityIcon;
}

function showBasketList(){
    if(basketListContainer.classList.contains('noneBasketList')){
        basketListContainer.classList.remove('noneBasketList');
        basketTotal.classList.remove('noneBasketList');
    }else{
        basketListContainer.classList.add('noneBasketList');
        basketTotal.classList.add('noneBasketList');
    }
}

function eraseIndividualItem(e){

    nameItemToErase = '';

    if(e.target.classList.contains('icon-close')){
        itemToErase = e.target.parentElement.parentElement;
        nameItemToErase = itemToErase.querySelector('.basketTitle').textContent;
        itemToErase.remove();
        itemShoppingListAccumulted = itemShoppingListAccumulted.filter((item)=>item.name != nameItemToErase);
        saveLocalStorage(itemShoppingListAccumulted);
        calculateIconCount(itemShoppingListAccumulted);
        calculateTotal(itemShoppingListAccumulted);
    }
}

function calculateIconCount(ShoppingList){

    quantityIcon = 0;
    console.log(ShoppingList);

    if (ShoppingList == []){
        quantityIcon = 0;
    } else{
        ShoppingList.forEach((item)=>{
            quantityIcon = quantityIcon + item.quantity;
        })
    }

    counterIcon.textContent=quantityIcon;
}

function calculateTotal(ShoppingList){
    priceAcumulation = 0;
    console.log(ShoppingList);

    if (ShoppingList == []){
        priceAcumulation = 0;
    } else{
        ShoppingList.forEach((item)=>{
            priceAcumulation = priceAcumulation + (item.quantity*item.price);
        })
    }

    basketTotal.innerHTML=`<p class="basketTotalText">Total:  $ ${priceAcumulation}</p>`;

}