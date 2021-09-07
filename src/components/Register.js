import React, { Component } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Text, TextInput, ToastAndroid, View } from 'react-native';
import { styles } from '../Styles';
import FirebaseConfig from "../../config/Firebase";


export default class Login extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleRegister = () => {
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert('Oops!', 'Passwords do not match.')
    } else {
      FirebaseConfig.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => ToastAndroid.show('Successfully registered!', ToastAndroid.SHORT))
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => Alert.alert('Oops!', error.message))
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
          <Image source={{uri: 'https://i.imgur.com/D03aDTg.png'}} style={styles.logoImage}/>
          <Text style={styles.logoText}>Nearby Event and Weather Information</Text>
          <TextInput
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder={'Email'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
            placeholder={'Confirm password'}
            secureTextEntry={true}
            style={styles.input}
          />

          <View styles={styles.buttonContainer}>
            <Button
              title={'Register'}
              onPress={this.handleRegister}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Login'}
              onPress={() => navigate('Login')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
