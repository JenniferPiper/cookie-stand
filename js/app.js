'use strict';

var allLocations = [];
var locationsTable = document.getElementById('store-locations');
var tableHeadings = ['Location Name','6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];
var addLocationForm = document.getElementById('form-add-location');

var columnTotals = ['Total Cookies for All Locations'];

/*
  for each store location:
    -store min hourly customers
    -store max hourly customers
    -store average cookies per sale
    -generate number of customers per hour, a random number between min and max
    -for each hour:
      -calculate and store projected number of cookies purchased
    -store results in an array that is a property of the store location object
  */
/*
calculate customers per hour. This is almost identical to getRandomIntInclusive() at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random , except that here the input arguments are assumed to be integers.
*/

function custPerHour( min, max ) {
  return Math.floor(Math.random() * ( max - min + 1 )) + min;
}
function makeHeaderRow() {
  var trEl = document.createElement('tr');
  var thEl;
  for (var i = 0; i < tableHeadings.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = tableHeadings[i];
    trEl.appendChild(thEl);
  }
  locationsTable.appendChild(trEl);
}

function StoreLocation(locationName, minCust, maxCust, avgCookies) {
  this.locationName = locationName;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookies = avgCookies;
  allLocations.push(this);
}
StoreLocation.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  var totalCookies = 0;
  
  tdEl.textContent = this.locationName;
  trEl.appendChild(tdEl);


  //start at tableHeadings[1] to skip the Location Name and iterate for each hour heading. End at tableHeadings.length - 1 to leave space for total.
  for( var i = 1; i < tableHeadings.length - 1; i++ ){
    var cookiesPerHour = Math.round( this.avgCookies * custPerHour( this.minCust , this.maxCust ) );
    tdEl = document.createElement('td');
    tdEl.textContent = cookiesPerHour;
    trEl.appendChild( tdEl );
    totalCookies += cookiesPerHour;
    if(columnTotals[i] === undefined){
      columnTotals[i] = cookiesPerHour;
    }
    else {
      columnTotals[i] += cookiesPerHour;
    }

  }
  tdEl = document.createElement('td');
  tdEl.textContent = totalCookies;
  trEl.appendChild(tdEl);

  locationsTable.appendChild(trEl);

};

function addNewLocation(event) {
  event.preventDefault();
  var newLocation = event.target.locationName.value;
  var newMinCust = parseInt(event.target.minCust.value);
  var newMaxCust = parseInt(event.target.maxCust.value);
  var newAvgCookies = parseFloat(event.target.avgCookies.value);

  new StoreLocation(newLocation, newMinCust, newMaxCust, newAvgCookies);
  locationsTable.innerHTML = '';
  makeHeaderRow();
  renderAllLocations();
  makeFooterRow();
}

new StoreLocation('First & Pike', 23, 65, 6.3);
new StoreLocation('SeaTac Airport', 3, 24, 1.2);
new StoreLocation('Seattle Center', 11, 38, 3.7);
new StoreLocation('Capitol Hill', 20, 38, 2.3);
new StoreLocation('Alki', 2, 16, 4.6);

addLocationForm.addEventListener('submit', addNewLocation);

function renderAllLocations() {
  for(var i in allLocations) {
    allLocations[i].render();
  }
}
function makeFooterRow() {
  var trEl = document.createElement('tr');
  var tdEl;
  var totalOfTotals = 0;
  for(var i in columnTotals) {
    tdEl = document.createElement('td');
    tdEl.textContent = columnTotals[i];
    trEl.appendChild(tdEl);
    //skip the row title when calculating total of totals
    if(i > 0) {
      totalOfTotals += parseInt(columnTotals[i]);
    }
  }
  tdEl = document.createElement('td');
  tdEl.textContent = totalOfTotals;
  trEl.appendChild(tdEl);

  locationsTable.appendChild(trEl);
}
makeHeaderRow();
renderAllLocations();
makeFooterRow();
