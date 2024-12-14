import express from 'express';

import { addKpi, getKpi } from '../controllers/kpiController';

const router = express.Router();

/**
 * @swagger
 * /kpi:
 *   get:
 *     summary: Pridobi seznam vseh stroškov
 *     responses:
 *       200:
 *         description: Uspešno pridobljen seznam stroškov
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   naziv:
 *                     type: string
 *                     description: Naziv stroška
 *                   znesek:
 *                     type: number
 *                     description: Znesek stroška
 */
router.get('/', getKpi);

/**
 * @swagger
 * /kpi/add:
 *   post:
 *     summary: Dodaj nov strošek
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../models/Strosek'
 *     responses:
 *       201:
 *         description: Uspešno dodan strošek
 *       400:
 *         description: Napaka pri dodajanju stroška
 */
router.post('/add', addKpi);

export = router;