const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'user';
    let text = 'some text';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, text });

  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let lat = 50.3881;
    let lng = 30.4499;
    let from = 'from';
    let url = `https://google.com/maps/?q=50.3881,30.4499`;

    let message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({ from, url });

  });
});
