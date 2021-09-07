import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./src/components/Login";
import Register from "./src/components/Register"
import InformationLists from "./src/components/InformationLists"

const MainNavigator = createStackNavigator({
  Login: {screen: Login},
  Register: {screen: Register},
  InformationLists: {screen: InformationLists}
});

const App = createAppContainer(MainNavigator);

export default App;

