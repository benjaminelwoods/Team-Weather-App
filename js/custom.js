(function(){

  // Defining input variables
  const inputContainer = document.getElementById('userInput')
  const inputBtn = document.getElementById('inputBtn')
  const appContainer = document.getElementById('app')

  // Defining variables to be changed later
  let lat
  let long

  // Initializing Vue
  let app = new Vue({
    el: '#app',
    data: {
      // Defining Vue data
      location: false,
      icons: false,
      weather: false,
      dates: false,
      days: false
    },
    created: function () {
      // Calling the create dates function
      this.createDates()
    },
    methods: {
      createDates: function () {
        // Defining empty arrays
        var daysCreated = [];
        var datesCreated = [];
        // Defining the amount of days required
        var daysRequired = 7
        // Beginning a for loop
        for (var i = 0; i <= daysRequired; i++) {
          // Creating dates and pushing them to the respective arrays
          datesCreated.push( moment().add(i, 'days').format('MMM Do') )
          daysCreated.push( moment().add(i, 'days').format('dddd') )
        }
        // Re-defining Vue object data with the arrays
        this.dates = datesCreated
        this.days = daysCreated
      }
    }
  });

  // Start of Ajax request
   function makeAjaxRequest () {

     // Defining an object for latitude and longitude
     let dataObj = {
       lat: '',
       long: ''
     }

     // Input button onclick start
     inputBtn.onclick = function () {
       // Getting the value of the user input
       const city = document.getElementById('cityInput').value
       const country = document.getElementById('countryInput').value
       // Hiding the input container
       inputContainer.classList.remove('showMe')
       inputContainer.classList.add('hideMe')
       // Showing the application
       appContainer.classList.remove('hideMe')
       appContainer.classList.add('showMe')

       // After animation input container is set to display none
       setTimeout(function() {
           inputContainer.css('display', 'none !important');
       }, 1500);

       // Beginning of Geocoding axios call (converting location input to latitude and longitude)
       axios({
         method: 'get',
         url: 'http://open.mapquestapi.com/geocoding/v1/address?key=AeBQ5pBycCJk58NtTLBHf9J3n4vfcUZ1&location=' + city + ',' + country
       }).then(function (response) {
         // console.log()
         // Re-defining longitude and latitude object with geocoding response
         dataObj.lat = response.data.results[0].locations[0].latLng.lat
         dataObj.long = response.data.results[0].locations[0].latLng.lng
         // Calling update data function
         updateData()
         console.log(dataObj)
       });
     }
      // GET request for remote image in node.js
      function getLocation () {
        if (navigator.geolocation) {
          // Getting the geolocation of the user and calling the updateData function
          navigator.geolocation.getCurrentPosition(updateData)
          console.log(navigator.geolocation)
        } else {
          console.log('not working')
        }
      }

      // Update data function start
      function updateData (position) {
        // If position is defined
        if (position != undefined) {
          // The longitude and latitude object is re-defined with the coordinates
          dataObj.lat = position.coords.latitude
          dataObj.long = position.coords.longitude
          // Hides the input container
          inputContainer.classList.remove('showMe')
          inputContainer.classList.add('hideMe')
          // Shows the application
          appContainer.classList.remove('hideMe')
          appContainer.classList.add('showMe')
          // Calls show position
          showPosition()
        } else {
          // Calls show position
          showPosition()
        }
      }

      // Calls get location
      getLocation()

      // Show position function start
      function showPosition () {
        // Defining the final lat and long
        let finalLat = dataObj.lat
        let finalLong = dataObj.long

        // Axois call to get weather data
        axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + finalLat + '&lon=' + finalLong + '&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
        }).then(function (response) {
          // Storing the response in the Vue instance
          app.weather = response
          // Get icons function start
          function getIcons () {
            // Defining empty icons array
            let icons = []

            // For loop start
            for (var i = 0; i < 8; i++) {
              // Getting icon code for each day
              let iconCode = response.data.daily[i].weather[0].icon
              // Getting icon url with icon code
              const iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
              // Pushing icon url to the array
              icons.push(iconUrl)
            }
            // Storing array in the Vue Instance
            app.icons = icons
          }
          // Get Icons function call
          getIcons()
        });
        // Axios location call with MapBox Geocoding
        axios({
          method: 'get',
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + dataObj.long + ',' + dataObj.lat + '.json?access_token=pk.eyJ1IjoiYmVuZWx3b29kcyIsImEiOiJja2I1b3J3NWwxNzJzMnRzN2J4cXV0cDZyIn0.NfLf39V4gp_PPtreLXVffQ'
        }).then(function (response) {
          // Storing the response in the Vue instance
          app.location = response
        });
      }
    } // makeAjaxRequest ENDS

    // Make ajax request is called
    makeAjaxRequest();

}()); // iffe function ENDS


var masterObj = {
  days: ['day0','day1','day2','day3','day4','day5','day6','day7'],
  temp: ['temp0','temp1','temp2','temp3','temp4','temp5','temp6'],
  icon: ['icon0','icon1','icon2','icon3','icon4','icon5','icon6'],
  cond: ['cond0','cond1','cond2','cond3','cond4','cond5','cond6']
}


temp0 = masterObj.day

forecastItem1.onclick = function () {
  day = day1.value
   newFUnction ()
}
