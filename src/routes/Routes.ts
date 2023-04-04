import { Application } from 'express';
import adCampaignRouter from './AdCampaignRoutes'

export default class Routes {

    constructor(app: Application) {
        app.use('/api/v1', adCampaignRouter);
    }
}