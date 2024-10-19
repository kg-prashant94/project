const CONVENIENCE_FEE = 99;
let bagItemsObjects = [];
onLoad();



function onLoad() {
  
// for(let i = 0; i < bagItems.length; i++) {
//   console.log(items[i].id);
// }
  loadBagItemsObjects();
  displayBagItems();
  displayBagSummary();
}

function displayBagSummary() {
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemsObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemsObjects.forEach(bagItem => {
    totalMRP += bagItem.original_price;
    totalDiscount += bagItem.original_price - bagItem.current_price;
    console.log(bagItem.current_price);
  })

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;
  
  bagSummaryElement.innerHTML = `
        <div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value">₹ ${totalMRP}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">₹ ${CONVENIENCE_FEE}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">₹ ${finalPayment}</span>
            </div>
        </div> <!--bag-details-container  ends-->
        <button class="btn-place-order">
          <div class="css-xjhrni">PLACE ORDER</div>
        </button>`;
}


function loadBagItemsObjects() {
  //console.log(items[3].id);
  //console.log('Bag items:'+bagItems);
  bagItemsObjects = bagItems.map(itemId => {
    for(let i = 0; i < items.length; i++) {
      
      if(itemId === items[i].id) {
        //console.log(items[i]);
        return items[i];
      }
    }
  });
  //console.log('Bag items object '+(bagItemsObjects));
  //console.log(bagItemsObjects[1]);
}


function displayBagItems() {
  let containerElement = document.querySelector('.bag-items-container');

  let innerHtml = ``;
  bagItemsObjects.forEach(bagItem => {
    innerHtml += generatItemHTML(bagItem);
  });
  
  containerElement.innerHTML = innerHtml;
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItem => {
    if(bagItem != itemId) {
      return true;
    } else {
      return false;
    }
 })
 localStorage.setItem('bagItems', JSON.stringify(bagItems));
 loadBagItemsObjects();
 displayBagIcon();
 displayBagItems();
 displayBagSummary();
}

function generatItemHTML(item) {
  return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="../${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original-price">Rs ${item.original_price}</span>
                <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>`;
}