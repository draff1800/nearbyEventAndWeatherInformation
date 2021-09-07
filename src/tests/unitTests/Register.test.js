import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Register from '../../Components/Register';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

const navigation = {navigate: jest.fn()};
const tree = renderer.create(<Register navigation={navigation}/>).toJSON();
const wrapper = shallow(<Register navigation={navigation}/>);

describe('<Register />', () => {
  it('has 1 child - KeyboardAvoidingView', () => {
    expect(tree.children.length).toBe(1);
  });
  it('renders correctly', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should have a logo, title, three input fields and login / register buttons', () => {
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(wrapper.find('TextInput')).toHaveLength(3);
    expect(wrapper.find('Button')).toHaveLength(2);
  });
});
