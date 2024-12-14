import {Request, Response, NextFunction} from 'express';

import {KPI} from '../models/kpi.model';

export const getKpi = async (req: Request, res: Response) => {
    try {
        const kpis = await KPI.find();
        res.status(200).json(kpis);
    } catch (err) {
        res.status(500).json({
            message: 'Error when getting kpis.',
            error: err,
        });
    }
};

export const addKpi = async (req: Request, res: Response) => {
    try {
        const kpi = new KPI(req.body);
        await kpi.save();
        res.status(201).json(kpi);
    } catch (err) {
        res.status(400).json({
            message: 'Error when adding kpi.',
            error: err,
        });
    }
};