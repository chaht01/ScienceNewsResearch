import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignForm, {SignPlane, SignView} from './index'
import configureStore from "redux-mock-store";
import renderer from 'react-test-renderer';
import {Redirect} from "react-router-dom";
import {types, loginRequested} from "../../../actions/auth";


Enzyme.configure({ adapter: new Adapter() });

describe('Sign Shallow render', () => {
    const mockStore = configureStore();
    let store, container, dumb;
    store = mockStore({});
    describe('with auth True', () => {
        beforeEach(() => {
            container = shallow(<SignForm store={store}/>);
            dumb = shallow(<SignView/>)
        });
        it('+++ render the connected(SMART) component', () => {
            expect(container.length).toEqual(1)

        });
        it('+++ render the DUMB component', () => {
            expect(dumb.length).toEqual(1)
        });
    });

    describe('with auth False', () => {
        const mockSignfn = jest.fn()
        beforeEach(() => {
            container = shallow(<SignForm store={store}/>);
            dumb = shallow(<SignView handleSubmit={mockSignfn}/>)
        });
        it('+++ render the DUMB component', () => {
            expect(dumb.length).toEqual(1);
            dumb.instance().handleChange({
                persist: jest.fn(),
                target: {
                    value: 'username',
                    name: 'username'
                }
            });

            expect(dumb.state('username')).toEqual('username');
            dumb.find(SignPlane).last().simulate(
                'submit',
                {preventDefault() {}}
            )
            expect(mockSignfn.mock.calls.length).toBe(1)
            expect(container.prop('handleSubmit')({username:'username', password:'password'})).toEqual(store.dispatch(loginRequested({username:'username', password:'password'})))
        });
    });


})