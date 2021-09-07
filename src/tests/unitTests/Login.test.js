import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Login from '../../Components/Login';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const navigation = {navigate: jest.fn()};
const tree = renderer.create(<Login navigation={navigation}/>).toJSON();


describe('<Login />', () => {
  it('has 1 child - KeyboardAvoiding View', () => {
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should have a logo, title, two input fields and login / register buttons', () => {
    const wrapper = shallow(<Login navigation={navigation}/>);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('TextInput')).toHaveLength(2);
    expect(wrapper.find('Button')).toHaveLength(2);
  })
});

