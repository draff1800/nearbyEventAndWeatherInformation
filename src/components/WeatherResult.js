import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../Styles'


export default class WeatherResult extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.result}>
        <View>
          <Text style={styles.resultIndex}>{this.props.index}</Text>
        </View>
        <View style={styles.resultImage}>
          <Image source={{uri: this.props.imageURI}} style={styles.resultImage}/>
        </View>
        <View>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Weather: </Text>
            <Text>{this.props.overallWeather}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Description: </Text>
            <Text>{this.props.overallWeatherDescription}</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Temp - Avg: </Text>
            <Text>{this.props.averageTemperature}ºF, </Text>
            <Text style={styles.textFieldIdentifier}>Min: </Text>
            <Text>{this.props.minTemperature}ºF, </Text>
            <Text style={styles.textFieldIdentifier}>Max: </Text>
            <Text>{this.props.maxTemperature}ºF</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Humidity: </Text>
            <Text>{this.props.humidity}%</Text>
          </View>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Cloud Coverage: </Text>
            <Text>{this.props.cloudCoverage}%</Text>
          </View>
        </View>
      </View>
    )
  }
}
