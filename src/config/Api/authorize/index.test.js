import {authorize, verify} from './index'
import axios from 'axios';
import apiConfig from "../config"
import MockAdapter from 'axios-mock-adapter'

describe('Api authorize', () => {
    it('returns data when authorize is called', done => {
        let mock = new MockAdapter(axios);
        const data = { token: 123 };
        mock.onPost(`${apiConfig.url}/api-token-auth/`).reply(200, data);

        authorize('username','password').then(response => {
            expect(response).toEqual(data.token);
            done();
        });
    });
    it('returns data when verify is called', done => {
        let mock = new MockAdapter(axios);
        const data = { token: 123 };
        mock.onPost(`${apiConfig.url}/api-token-verify/`).reply(200, data);

        verify('123').then(response => {
            expect(response).toEqual(data.token);
            done();
        });
    });
})