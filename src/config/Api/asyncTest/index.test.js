import asyncTest from './'
describe('Api asyncTest', () => {
    it('+++ triggered', () => {
        expect(asyncTest()).toEqual({
            status: 200,
            data: {
                msg: 'hello async!'
            }
        })
    })
})