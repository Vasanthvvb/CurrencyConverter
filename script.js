var dropdown1 = document.getElementById('dropdown1');
var dropdown2 = document.getElementById('dropdown2');
var leftRate = document.querySelector('#leftValue');
const obj = {};
var fetchedRate1;
var fetchedRate2;

//To prevent arrow value change
leftRate.addEventListener('keydown', function(e){
  if (e.which === 38 || e.which === 40) {
    e.preventDefault();}
});
var rightRate = document.querySelector('#rightValue');
rightRate.addEventListener('keydown', function(e){
  if (e.which === 38 || e.which === 40) {
    e.preventDefault();}
});

//Fetching data using api
async function ExchangeRates(){
  const url = "https://api.currencyapi.com/v3/latest?apikey=3ce59010-556c-11ec-a347-d5c775ca0e42";
  const request = new Request(url);
  const response = await fetch(request);
  const result = await response.json()
  .then(result =>{
    Object.entries(result.data).forEach(([key, value]) => {
      obj[key] = value;
      getCurrencyType(key);
    })
  })
}
//Showing currency names in Dropdown List
function getCurrencyType(key){
  let html1 = `<option id="exchangeField1" value = ${key}>${key}</option>`;
  dropdown1.insertAdjacentHTML("beforeend", html1);
  let html2 = `<option id="exchangeField2" value = ${key}>${key}</option>`;
  dropdown2.insertAdjacentHTML("beforeend", html2)
}

ExchangeRates();


//Dropdown onChange action
dropdown1.addEventListener('change', function(){
  var type = dropdown1.options[dropdown1.selectedIndex].text;
  var i=0;
  for(var types of Object.keys(obj)){
    if(types === type){
      fetchedRate1 = Object.values(obj)[i].value;
    }
    i++;
  }
});

dropdown2.addEventListener('change', function(){
  var type = dropdown2.options[dropdown2.selectedIndex].text;
  var i=0;
  for(var types of Object.keys(obj)){
    if(types === type){
      fetchedRate2 = Object.values(obj)[i].value;
    }
    i++;
  }
});

//Converting currency values
leftRate.addEventListener('input', function(e){
  if((fetchedRate1 != "") && (fetchedRate2 != "")){
    if(fetchedRate1 < fetchedRate2){
      var resultRate = (leftRate.value*fetchedRate2) / fetchedRate1;
      rightRate.value = resultRate.toFixed(2);
    }
    if(fetchedRate1 > fetchedRate2){
      var resultRate = (leftRate.value*fetchedRate2) / fetchedRate1;
      rightRate.value = resultRate.toFixed(2); 
    }
  }
});

rightRate.addEventListener('input', function(e){
  if((fetchedRate1 != "") && (fetchedRate2 != "")){
    if(fetchedRate1 < fetchedRate2){
      var resultRate = (rightRate.value*fetchedRate1) / fetchedRate2;
      leftRate.value = resultRate.toFixed(2);
    }
    if(fetchedRate1 > fetchedRate2){
      var resultRate = (rightRate.value*fetchedRate1) / fetchedRate2;
      leftRate.value = resultRate.toFixed(2);
    }
  }
});
