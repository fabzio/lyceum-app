import { describe, test, expect } from 'bun:test';
import { AdministrativeRoute } from '../routes';


describe('AdministrativeController', () => {
  const { router: app } = new AdministrativeRoute();

  test('can register all new accounts', async () => {
    // Define mock data for POST request body
    const mockData = {
      administrativeList: [
        {
          name: 'John',
          firstSurname: 'Doe',
          secondSurname: 'Smith',
          code: 'ABC12345',
          email: 'john.doe@example.com',
        },
        {
            name: 'Jane',
            firstSurname: 'Doe',
            secondSurname: 'Smith',
            code: 'ABC12389',
            email: 'jane.doe@example.com',
          },
      ],
    };

    // Send POST request with mock data to the upload endpoint
    const res = await app.request('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mockData),
    });

    // Expectations
    expect(res.status).toBe(200); // Expect successful response
    const jsonResponse = await res.json();
    expect(jsonResponse).toEqual({
      success: true,
      message: 'Administrative users correctly created',
      data: expect.any(Array), // Data should be an array
    });
  });
});