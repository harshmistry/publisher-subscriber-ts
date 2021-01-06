import { generateUUID } from '../utility';

test('Generate UUID', () => {
    expect(generateUUID()).not.toBeNull();
});