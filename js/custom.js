(function(){

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
      // GET request for remote image in node.js
      function getLocation () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition)
        } else {
          console.log('not working')
        }
      }

      getLocation()

      function showPosition (position) {
        axios({
          method: 'get',
          url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&units=metric&exclude=hourly,minute&appid=66ce6f7e945db003aaa343f0bc010dc8'
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
          url: 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + position.coords.longitude + ',' + position.coords.latitude + '.json?access_token=pk.eyJ1IjoiYmVuZWx3b29kcyIsImEiOiJja2I1b3J3NWwxNzJzMnRzN2J4cXV0cDZyIn0.NfLf39V4gp_PPtreLXVffQ'
        }).then(function (response) {
          app.location = response
        });
      }
    } // makeAjaxRequest ENDS

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
