const { InMemoryUserStore } = require('../salt');

describe('salted password store', () => {
  test('signup + correct login', () => {
    const store = new InMemoryUserStore();
    store.signup('a@b.com', 'pw');
    expect(store.login('a@b.com', 'pw')).toBe(true);
  });
  test('wrong password', () => {
    const store = new InMemoryUserStore();
    store.signup('a@b.com', 'pw');
    expect(store.login('a@b.com', 'nope')).toBe(false);
  });
});
