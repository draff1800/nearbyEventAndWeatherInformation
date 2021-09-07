import React from 'react';
import renderer from 'react-test-renderer';
import { mount, configure } from 'enzyme';
import InformationLists from '../../Components/InformationLists';
import EventResult from '../../Components/EventResult';
import WeatherResult from '../../Components/WeatherResult';
import Adapter from 'enzyme-adapter-react-16';
import 'jsdom-global/register';

configure({adapter: new Adapter()});

const navigation = {navigate: jest.fn()};
const tree = renderer.create(<InformationLists navigation={navigation}/>).toJSON();
const eventData = require('../../apiDataSamples/exampleEventData');
const weatherData = require('../../apiDataSamples/exampleWeatherData');
const wrapper = mount(<InformationLists navigation={navigation}/>);
wrapper.setState({eventList: eventData.results, weatherList: [ weatherData ]});
wrapper.update();


describe('<InformationLists />', () => {
  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should open with the default Events screen and have Event results', () => {
    expect(wrapper.state('listTitle')).toEqual('Events');
    expect(wrapper.find('EventResult')).toHaveLength(20);
    expect(wrapper.find('WeatherResult')).toHaveLength(0);
  });
  it('should show weather results when the Weather tab is triggered', () => {
    wrapper.setState({listTitle: 'Weather'});
    expect(wrapper.state('listTitle')).toEqual('Weather');
    expect(wrapper.find('EventResult')).toHaveLength(0);
    expect(wrapper.find('WeatherResult')).toHaveLength(1);
  })
});
