import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../Styles'


export default class EventResult extends Component {

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
          <Text style={styles.textFieldIdentifier}>Name: </Text>
          <Text>{this.props.title}</Text>
          <Text style={styles.textFieldIdentifier}>Description: </Text>
          <Text>{this.props.description}</Text>
          <View style={styles.textRow}>
            <Text style={styles.textFieldIdentifier}>Date: </Text>
            <Text>{this.props.date}    </Text>
            <Text style={styles.textFieldIdentifier}>Venue: </Text>
            <Text>{this.props.venue}</Text>
          </View>
        </View>
      </View>
    )
  }
}
