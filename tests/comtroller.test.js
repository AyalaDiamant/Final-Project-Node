const loginController = require('../controllers/login.controller');

test('logout good', async () => {
    const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    await loginController.logout(null, res);
    expect(res.send).toHaveBeenCalledWith('Logout successful');
});

//  אבל אם כן אז הוא משתבש בפרוייקט error הבדיקה הזו עובדת רק אם משנים את לוג אאוט שמקבל גם 
// test('logout error', async () => {
//     const res = {
//         setHeader: jest.fn(),
//         status: jest.fn().mockReturnThis(),
//         send: jest.fn()
//     };

//     const error = new Error('Logout failed');
//     loginController.logout(null, res, error);

//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.send).toHaveBeenCalledWith('Logout failed');
// });

