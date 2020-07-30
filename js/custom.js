(function(){

  const inputContainer = document.getElementById('userInput')
  // const cityInput = document.getElementById('cityInput')
  // const countryInput = document.getElementById('countryInput')
  const inputBtn = document.getElementById('inputBtn')
  const appContainer = document.getElementById('app')

  let lat
  let long

  let app = new Vue({
    el: '#app',
    data: {
      location: false,
      icons: false,
      weather: false,
      dates: false,
      days: false
    },
    created: function () {
      this.createDates()
    },
    methods: {
      createDates: function () {
        var daysCreated = [];
        var datesCreated = [];
        var daysRequired = 7
        for (var i = 0; i <= daysRequired; i++) {
          datesCreated.push( moment().add(i, 'days').format('MMM Do') )
          daysCreated.push( moment().add(i, 'days').format('dddd') )
        }
        this.dates = datesCreated
        this.days = daysCreated
      }
    }
  });

   function makeAjaxRequest () {

     let dataObj = {
       lat: '',
       long: ''
     }

     inputBtn.onclick = function () {
       const city = document.getElementById('cityInput').value
       const country = document.getElementById('countryInput').value
       inputContainer.classList.remove('showMe')
       inputContainer.classList.add('hideMe')
       appContainer.classList.remove('hideMe')
       appContainer.classList.add('showMe')

       setTimeout(function() {
           inputContainer.css('display', 'none !important');
       }, 1500);

       axios({
         method: 'get',
         url: 'http://open.mapquestapi.com/geocoding/v1/address?key=AeBQ5pBycCJk58NtTLBHf9J3n4vfcUZ1&location=' + city + ',' + country
       }).then(function (response) {
         // console.log()
         dataObj.lat = response.data.results[0].locations[0].latLng.lat
         dataObj.long = response.data.results[0].locations[0].latLng.lng
         updateData()
         console.log(dataObj)
       });
     }
      // GET request for remote image in node.js
      function getLocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(updateData)
          console.log(navigator.geolocation)
        } else {
          console.log('not working')
        }
      }

      function updateData (position) {
        if (position != undefined) {
          dataObj.lat = position.coords.latitude
          dataObj.long = position.coords.longitude
          inputContainer.classList.remove('showMe')
          inputContainer.classList.add('hideMe')
          appContainer.classList.remove('hideMe')
          appContainer.classList.add('showMe')
          showPosition()
        } else {
          showPosition()
        }
      }

      getLocation()

      function showPosition () {
        let finalLat
        let finalLong

        if ((lat != null) && (long != null)) {
          finalLat = lat
          finalLat = long
        } else {
          finalLat = dataObj.lat
          finalLong = dataObj.long
        }

        axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + finalLat + '&lon=' + finalLong + '&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
        }).then(function (response) {
          app.weather = response
          function getIcons () {
            let icons = []

            for (var i = 0; i < 8; i++) {
              let iconCode = response.data.daily[i].weather[0].icon
              const iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'
              icons.push(iconUrl)
            }
            app.icons = icons
          }
          getIcons()
        });
        axios({
          method: 'get',
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + dataObj.long + ',' + dataObj.lat + '.json?access_token=pk.eyJ1IjoiYmVuZWx3b29kcyIsImEiOiJja2I1b3J3NWwxNzJzMnRzN2J4cXV0cDZyIn0.NfLf39V4gp_PPtreLXVffQ'
        }).then(function (response) {
          app.location = response
        });
      }
    } // makeAjaxRequest ENDS

    makeAjaxRequest();

}()); // iffe function ENDS
