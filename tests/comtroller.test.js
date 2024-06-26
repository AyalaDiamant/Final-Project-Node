const loginController = require('../controllers/login.controller');
const meetController = require('../controllers/meeting.controller');

// positive test on logout
test('logout good', async () => {
    const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    await loginController.logout(null, res);
    expect(res.send).toHaveBeenCalledWith('Logout successful');
});

// negative test on log out
test('logout bed', async () => {
    const res = {
        setHeader: jest.fn(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
    };
    await loginController.logout(null, res);
    expect(res.send).not.toHaveBeenCalledWith('Logout faild');
});

// positive test on Get Meeting
jest.mock('../models/meet.model', () => ({
  find: jest.fn().mockResolvedValue([])
}));

describe('Meetings Controller', () => {
  test('meet good', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    await meetController.getMeetings(null, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

