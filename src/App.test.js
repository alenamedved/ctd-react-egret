import { updateCount } from './App.js'

const todoCounts = {
    Personal: 1,
    Bussines: 0, 
    FurryFriend: 2,
}
describe('Test update count', ()=> {
    test('0 count should be 1 count when task added', () => {
        expect(updateCount(Bussines,+1).toBe(1))
    })
})
describe('something truthy and falsy', () => {
    test('true to be true', () => {
      expect(true).toBeTruthy();
    });
  
    test('false to be false', () => {
      expect(false).toBeFalsy();
    });
  });
  