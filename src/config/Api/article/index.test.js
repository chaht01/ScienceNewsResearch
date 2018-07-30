import { gym } from './index'
import axios from 'axios';
import apiConfig from "../config"
import MockAdapter from 'axios-mock-adapter'

describe('Api gym', () => {
    it('returns data when gym list is called', done => {
        let mock = new MockAdapter(axios);
        const data = [];
        mock.onGet(`${apiConfig.url}/gyms/`).reply(200, data);

        gym.list().then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
    it('returns data when gym detail is called', done => {
        let mock = new MockAdapter(axios);
        const gym_id = 5;
        const data = [];
        mock.onGet(`${apiConfig.url}/gyms/${gym_id}/`).reply(200, data);

        gym.detail(gym_id).then(response => {
            expect(response).toEqual(data);
            done();
        });
    });
})