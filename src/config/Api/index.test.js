import Api from './index'
import {authorize, verify} from './authorize'
import {gym} from './gym'
import {problem} from './problem/index.ignore'
import { storeItem, clearItem } from './storage/index.ignore'
import asyncTest from './asyncTest'
import fetchApi from './fetchApi'

describe('Api', () => {
    it('+++ import each component', () => {
        expect(Api.authorize).toEqual(authorize);
        expect(Api.verify).toEqual(verify);
        expect(Api.gym).toEqual(gym);
        expect(Api.storeItem).toEqual(storeItem);
        expect(Api.clearItem).toEqual(clearItem);
        expect(Api.asyncTest).toEqual(asyncTest);
        expect(Api.fetchApi).toEqual(fetchApi);
        expect(Api.problem).toEqual(problem);
    });
})