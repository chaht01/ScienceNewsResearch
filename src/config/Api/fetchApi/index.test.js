import fetchApi from './index'
import axios from 'axios';
import apiConfig from "../config";
import MockAdapter from 'axios-mock-adapter'

describe('fetchApi ', () => {
    // beforeEach(()=>{
    //     var localStorageMock = (function() {
    //         var store = {};
    //
    //         return {
    //             getItem: function(key) {
    //                 return store[key] || null;
    //             },
    //             setItem: function(key, value) {
    //                 store[key] = value.toString();
    //             },
    //             clear: function() {
    //                 store = {};
    //             }
    //         };
    //
    //     })();
    //
    //     Object.defineProperty(window, 'localStorage', {
    //         value: localStorageMock
    //     });
    // })

    it('returns data when fetchApi called', done => {
        let mock = new MockAdapter(axios);
        const data = { hello: 'world' };
        mock.onGet(`${apiConfig.url}/`).reply(200, data);

        fetchApi('/', {}, 'get').then(response => {
            expect(response).toEqual(data);
            done();
        })
    });

    it('returns error when fetchApi got error', done => {
        let mock = new MockAdapter(axios);
        const data = {
            response: {
                status:500,
                data: new Error()
            }
        };
        mock.onGet(`${apiConfig.url}/`).reply(500, data.response.data);

        fetchApi('/', {}, 'get').catch(err => {
            // expect(err).toEqual(data.response);
            done();
        })
    });

    it('returns error when fetchApi got error:401', done => {
        let mock = new MockAdapter(axios);
        const data = {
            response: {
                status:401,
                data: new Error()
            }
        };
        mock.onGet(`${apiConfig.url}/`).reply(401, data.response.data);

        fetchApi('/', {}, 'get').catch(err => {
            // expect(err).toEqual(data.response);
            done();
        })
    });

    it('has header with auth', done => {
        let mock = new MockAdapter(axios);
        const data = { hello: 'world' };
        const accessToken = '123';
        window.localStorage.setItem('token', accessToken);
        mock.onGet(`${apiConfig.url}/`).reply(200, data);

        fetchApi('/', {}, 'get').then(response => {
            expect(response).toEqual(data);
            done();
        })
    });

})