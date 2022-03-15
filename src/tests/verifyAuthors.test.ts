import isAuthorValid from '@utils/verifyAuthors';
const authorsInfo = require('@helpers/authorsInfo.json');


describe('Testing every Author ', () => {
    for(let author in authorsInfo){
        test(`verifying author [${author}]`, () => {
            expect(isAuthorValid(author.toString())).toBe(true);
        });
    }
})