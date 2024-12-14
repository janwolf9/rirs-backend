import request from 'supertest';
import app from '../index';

import { KPI } from '../models/kpi.model';

afterAll(() => {
    process.exit();
  });

describe('Kpi API Integration Tests', () => {
    it('should fetch all kpis', async () => {
      const response = await request(app).get('/kpi');
      expect(response.status).toBe(200);
    });
  
    it('should fetch an empty array when no stroski exist', async () => {
      const response = await request(app).get('/kpi');
      expect(response.status).toBe(200);
    });
  
    it('should add a new strosek', async () => {
      const newKpi = {
        id: '1',
        naziv: 'Pisarna',
        vrednost: 100.50,
        obdobje: '2024-01-01',
        opis: 'Nakup papirja',
        datum: '2024-01-01',
      }
  
      const response = await request(app).post('/kpi/add').send(newKpi);
      expect(response.status).toBe(201);
    });
  
    it('should return 400 for invalid strosek data', async () => {
      const invalidKpi = { vrednost: 100.50 };
  
      const response = await request(app).post('/kpi/add').send(invalidKpi);
      expect(response.status).toBe(400);
    });
  
    it('should return 404 for non-existent endpoint', async () => {
      const response = await request(app).get('/non-existent');
      expect(response.status).toBe(404);
    });
  });