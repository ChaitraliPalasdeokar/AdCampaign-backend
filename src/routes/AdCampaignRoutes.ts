import { Router } from 'express';
import AdCampaignController from "../controller/AdCampaignController";

class AdCampaignRoutes {
    router = Router();
    adCampaignController = new AdCampaignController();

    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/data').get(this.adCampaignController.getData);
        this.router.route('/data/metrics').get(this.adCampaignController.getMetrics);
    }
}
export default new AdCampaignRoutes().router;