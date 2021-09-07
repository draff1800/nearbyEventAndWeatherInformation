import React, { Component } from 'react';
import { Alert, Button, Image, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { styles } from '../Styles'
import FirebaseConfig from "../../config/Firebase";


export default class Login extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleLogin = () => {
    FirebaseConfig.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('InformationLists'))
      .catch(error => Alert.alert("Oops!", error.message))
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

          <View style={styles.buttonContainer}>
            <Button
              title={'Login'}
              onPress={this.handleLogin}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={'Register'}
              onPress={() => navigate('Register')}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
