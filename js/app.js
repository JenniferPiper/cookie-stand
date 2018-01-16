'use strict';
var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm' ];

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

var firstAndPike = {
  minCust: 23,
  maxCust: 65,
  avgCookies: 6.3,
  render: function() {
    var ulEl = document.getElementById('first-and-pike');
    for( var i = 0; i < hours.length; i++ ){
      var cookiesPerHour = Math.round( this.avgCookies * custPerHour( this.minCust , this.maxCust ) );
      var liEl =  document.createElement( 'li' );
      liEl.textContent = hours[i] + ': ' + cookiesPerHour + ' cookies';
      ulEl.appendChild( liEl );
    }
  }
};
var seatacAirport = {
  minCust: 3,
  maxCust: 24,
  avgCookies: 1.2,
  render: function() {
    var ulEl = document.getElementById('seatac');
    for( var i = 0; i < hours.length; i++ ) {
      var cookiesPerHour = Math.round( this.avgCookies * custPerHour( this.minCust , this.maxCust ) );
      var liEl = document.createElement( 'li' );
      liEl.textContent = hours[i] + ': ' + cookiesPerHour + ' cookies';
      ulEl.appendChild( liEl );
    }
  }
};

var seattleCenter = {
  minCust: 11,
  maxCust: 38,
  avgCookies: 3.7,
  render: function() {
    var ulEl = document.getElementById('seattle-center');
    for( var i = 0; i < hours.length; i++ ) {
      var cookiesPerHour = Math.round( this.avgCookies * custPerHour( this.minCust , this.maxCust ) );
      var liEl = document.createElement( 'li' );
      liEl.textContent = hours[i] + ': ' + cookiesPerHour + ' cookies';
      ulEl.appendChild( liEl );
    }
  }
};

var capitolHill = {
  minCust: 20,
  maxCust: 38,
  avgCookies: 2.3,
  render: function() {
    var ulEl = document.getElementById('capitol-hill');
    for( var i = 0; i < hours.length; i++ ) {
      var cookiesPerHour = Math.round( this.avgCookies * custPerHour( this.minCust , this.maxCust ) );
      var liEl = document.createElement( 'li' );
      liEl.textContent = hours[i] + ': ' + cookiesPerHour + ' cookies';
      ulEl.appendChild( liEl );
    }
  }
};


firstAndPike.render();
seatacAirport.render();
seattleCenter.render();
capitolHill.render();