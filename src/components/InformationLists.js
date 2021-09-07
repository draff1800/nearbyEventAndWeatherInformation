import React, { Component } from 'react';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import { styles } from '../Styles'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'
import EventResult from './EventResult'
import WeatherResult from "./WeatherResult";
import { Accelerometer } from 'expo-sensors';
import {Constants} from "expo/build/globals.web";


let links = Constants.manifest.extra;
let lastShakeTime = 0;

export default class InformationLists extends Component {
  static navigationOptions = {
    title: 'Lists',
  };

  constructor(props) {
    super(props);
    this.state = {
      listTitle: "Events",
      latitude: null,
      longitude: null,
      eventList: [],
      townList: [],
      weatherForecastList: [],
      weatherList: [],
    }
  }

  componentWillMount = async() => {
    await this.getLatitudeAndLongitude();
    await this.getEventList();
    await this.getTownList();
    await this.getWeatherForecastList();
    await this.getWeatherList();
    await this.activateAccelerometer();
  };

  componentWillUnmount() {
    if(this.accelerometer) {
      this.accelerometer.remove();
    }
  }

  //Gets location data and assigns it to state. Returns user to Login otherwise.
  getLatitudeAndLongitude = async () => {
    await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({})
      .catch(() => {
        Alert.alert('Oops!', 'Could not access location data.');
        this.props.navigation.navigate('Login')
      });
    this.setState({
      latitude: JSON.parse(JSON.stringify(location)).coords.latitude,
      longitude: JSON.parse(JSON.stringify(location)).coords.longitude
    });
  };

  //Gets event list from API and assigns it to state
  getEventList = async() => {
    console.log(links.skiddleAPILink_Part1
      + '&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude
      + '&radius=500&order=date&description=1');
    return fetch(links.skiddleAPILink_Part1
      + '&latitude=' + this.state.latitude + '&longitude=' + this.state.longitude
      + '&radius=500&order=date&description=1')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({eventList: responseJson.results});
    })
    .catch((error) => {
      console.error(error);
    });
  };

  //Returns appropriate web image based on event details (API URIs not publicly accessible)
  getEventImageURI(eventCode) {
    switch (eventCode) {
      case "FEST":
        return links.festEventImage;
      case "LIVE":
        return links.liveEventImage;
      case "CLUB":
        return links.clubEventImage;
      case "DATE":
        return links.dateEventImage;
      case "THEATRE":
        return links.theatreEventImage;
      case "COMEDY":
        return links.comedyEventImage;
      case "EXHIB":
        return links.exhibitEventImage;
      case "KIDS":
        return links.kidsEventImage;
      case "BARPUB":
        return links.barPubEventImage;
      case "LGB":
        return links.lgbEventImage;
      case "SPORT":
        return links.sportEventImage;
      case "ARTS":
        return links.artsEventImage;
      case "FUND":
        return links.fundEventImage;
      default:
        return links.defaultEventImage;
    }
  }

  getTownList() {
    let townList = [];
    this.state.eventList.forEach(event => {
      townList.push(event.venue.town)
    });
    this.setState({townList: [...new Set(townList)]});
  }

  //Makes a weather API call for each event saved previously
  //Saves weather records, inserting placeholders if errors occur
  getWeatherForecastList = async() => {
    let weatherForecastList = [];
    const promises = this.state.townList.map(async (town) => {
      return fetch('http://api.openweathermap.org/data/2.5/forecast?q=' +
        town + '&APPID=' + Constants.manifest.extra.owmAPIKey)
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.cod === '200') {
            weatherForecastList.push(responseJson);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });

    await Promise.all(promises);
    this.setState({weatherForecastList: weatherForecastList});
  };

  determineEventWeather(eventDate, eventTime, town) {
    let weatherForecastListIndex = 0;
    let threeHourRecordIndex = 0;
    let eventDateTime = Date.parse((eventDate + ' ' + eventTime));
    let closestTimeDifference = 100000000000000000000;
    let permanentWeatherDateTime = 0;
    this.state.weatherForecastList.forEach(function(forecast, i) {
      if((forecast.city.name.toUpperCase() === town.toUpperCase())) {
        weatherForecastListIndex = i;
        forecast.list.forEach(function (threeHourRecord, j) {
          let weatherDate = threeHourRecord.dt_txt.substring(0, 10);
          weatherDate = weatherDate.replace(/-/g, "/");
          let weatherTime = threeHourRecord.dt_txt.substring(11, 19);
          let weatherDateTime = Date.parse(weatherDate + ' ' + weatherTime);
          let timeDifference = Math.abs(eventDateTime - weatherDateTime);

          if (timeDifference < closestTimeDifference) {
            closestTimeDifference = timeDifference;
            permanentWeatherDateTime = weatherDateTime;
            threeHourRecordIndex = j;
          }
        })
      }
    });
    let determinedEventWeather = this.state.weatherForecastList[weatherForecastListIndex].list[threeHourRecordIndex];
    //If event date exceeds forecast range, return empty weather data
    if(Math.abs(new Date().getTime() - Date.parse((eventDate + ' ' + eventTime))) < 432000000) {
      return determinedEventWeather;
    } else {
      return require('../apiDataSamples/emptyWeatherData')
    }
  }

  getWeatherList() {
    let weatherList = [];
    this.state.eventList.forEach(event => {
      let eventDate = event.startdate.substring(0,10);
      eventDate = eventDate.replace(/-/g, "/");
      let eventTime = event.startdate.substring(11,19);
      weatherList.push(this.determineEventWeather(eventDate, eventTime, event.venue.town));
    });
    this.setState({weatherList: weatherList});
  }

  displayResults() {
    let results = [];
    let that = this;
    if(this.state.listTitle === "Events") {
      this.state.eventList.map(function(event, i) {
        results.push(<EventResult key={i}
                                  index={i}
                                  imageURI={that.getEventImageURI(event.EventCode)}
                                  title={event.eventname}
                                  description={event.description}
                                  date={event.date} venue={event.venue.name}/>);
      });
    } else {
      this.state.weatherList.map(function(weather, i) {
        results.push(
          <WeatherResult key={i}
                         index={i}
                         imageURI={links.owmImagesLink_Part1 + weather.weather[0].icon + ".png"}
                         overallWeather={weather.weather[0].main}
                         overallWeatherDescription={weather.weather.description}
                         averageTemperature={weather.main.temp}
                         minTemperature={weather.main.temp_min}
                         maxTemperature={weather.main.temp_max}
                         humidity={weather.main.humidity}
                         cloudCoverage={weather.clouds.all}/>
        );
      });
    }
    return results;
  }

  swapLists() {
    if(this.state.listTitle === "Events") {
      this.setState({listTitle: "Weather"})
    } else {
      this.setState({listTitle: "Events"})
    }
  }

  activateAccelerometer() {
    this.accelerometer = Accelerometer.addListener(accelerometerData => {
      let {x, y, z} = accelerometerData;
      if ((x * x + y * y + z * z > 5.0) && ((new Date().getTime() - lastShakeTime) > 1000)) {
        lastShakeTime = new Date().getTime();
        this.swapLists();
      }
    });
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={styles.textRow}>
          <Text style={styles.listTitle}>{this.state.listTitle}</Text>
          <View style={styles.rightContainer}>
            <Image source={{uri: links.settingsIconImage}} style={styles.settingsIcon}/>
          </View>
       </View>
        <ScrollView style={styles.resultList}>
          {this.displayResults()}
        </ScrollView>
      </View>
    );
  }
}
