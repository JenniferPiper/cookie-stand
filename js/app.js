'use strict';

var allLocations = [];
var locationsTable = document.getElementById('store-locations');
var tableHeadings = ['Location Name','6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

/*
  for each store location: 
    -make an object literal
    -store min hourly customers
    -store max hourly customers
    -store average cookies per sale
    -generate number of customers per hour, a random number between min and max
    -for each hour:
      -calculate and store projected number of cookies purchased
    -store results in an array that is a property of the store location object
    -display results as <ul>s on the page
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
  }
  tdEl = document.createElement('td');
  tdEl.textContent = totalCookies;
  trEl.appendChild(tdEl);

  locationsTable.appendChild(trEl);
};

new StoreLocation('First & Pike', 23, 65, 6.3);
new StoreLocation('SeaTac Airport', 3, 24, 1.2);
new StoreLocation('Seattle Center', 11, 38, 3.7);
new StoreLocation('Capitol Hill', 20, 38, 2.3);
new StoreLocation('Alki', 2, 16, 4.6);

function renderAllLocations() {
  for(var i in allLocations) {
    allLocations[i].render();
  }
}
makeHeaderRow();
renderAllLocations();
