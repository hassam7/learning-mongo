const assert = require("assert");
const User = require('../src/user');

describe("Validating Records", () => {
    it("requires a user name", () => {
        const user = new User({
            name: undefined
        });
        const validationResult = user.validateSync(); //sync version of validate function 
        const {
            message
        } = validationResult.errors.name;
        // const message = validationResult.errors.name.message;
        assert(message === 'Name is required.');
    });

    it("require a user name longer than 2 characters ", () => {
        const user = new User({
            name: "Al"
        });
        const validationResult = user.validateSync();
        const {
            message
        } = validationResult.errors.name;
        assert(message === "Name must be longer than 2 characters");
    })
    it("should not save invalid records", (done) => {
        const user = new User({
            name: "Al"
        });
        user.save().catch((validationResult) => {
            const {
                message
            } = validationResult.errors.name;
            assert(message === "Name must be longer than 2 characters");
            done();
        })

    });
});