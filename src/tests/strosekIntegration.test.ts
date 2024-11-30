
import request from 'supertest';
import app from '../index';

import { Strosek } from '../models/strosek.model'; // Tvoj model za stroške

// Počisti bazo pred vsakim testom
beforeEach(async () => {
    await Strosek.deleteMany({});
});

afterEach(() => {
  jest.clearAllTimers();
});

afterAll(() => {
  process.exit();
});


describe('Strosek API Integration Tests', () => {
  it('should fetch all stroski', async () => {
    const response = await request(app).get('/stroski');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch an empty array when no stroski exist', async () => {
    const response = await request(app).get('/stroski');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it('should add a new strosek', async () => {
    const newStrosek = {
      naziv: 'Pisarna',
      znesek: 100.50,
      datum: '2024-01-01',
      kategorija: 'Pisarniški material',
      oseba: 'Janez Novak',
      nacinPlacila: 'Gotovina',
      komentar: 'Nakup papirja',
    };

    const response = await request(app).post('/stroski/add').send(newStrosek);
    expect(response.status).toBe(201);
    expect(response.body.naziv).toBe(newStrosek.naziv);
  });

  it('should return 400 for invalid strosek data', async () => {
    const invalidStrosek = { znesek: 100.50 };

    const response = await request(app).post('/stroski/add').send(invalidStrosek);
    expect(response.status).toBe(400);
  });

  it('should return 404 for non-existent endpoint', async () => {
    const response = await request(app).get('/non-existent');
    expect(response.status).toBe(404);
  });
});
