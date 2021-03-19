import configureStore from 'redux-mock-store';
import { Groups } from './Groups';

const initialState = {};

const mockStore = configureStore();
let wrapper;
let store;

beforeEach(() => {
  //creates the store with any initial state or middleware needed
  store = mockStore(initialState);
  wrapper = shallow(<Groups store={store} />);
});


describe('Groups Component', () => {
    let wrapper;
    // our mock login function to replace the one provided by mapDispatchToProps
    const mockLoginfn = jest.fn();
   
     beforeEach(() => {
       // pass the mock function as the login prop 
       wrapper = shallow(<Login login={mockLoginfn}/>)
     })