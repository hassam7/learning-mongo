const assert = require('assert');
const User = require('../src/user');
// Test to make sure that we can create a new user and save it to database
describe('Creating_records', () => {
    it("save a user", (done) => {
        const Tom = new User({
            name: 'Tom'
        }); //isNew = true because model is not saved to database yet
            //Tom still has _id even though it is not saved to database
        Tom.save() //Saves to database
            //isNew = false
            .then(() => {
                assert(!Tom.isNew)
                done();
            });
    });
}); //first parameter is string and second is function