const assert = require("assert");
const User = require('../src/user');

describe("Validating Records", () => {
    it("requires a user name", () => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync(); //sync version of validate function 
        const {message} = validationResult.errors.name;
        // const message = validationResult.errors.name.message;
        assert(message === 'Name is required.');
    });
});