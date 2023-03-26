import { Router } from 'express';
import AdCampaignController from "../controller/AdCampaignController";

class AdCampaignRoutes {
    router = Router();
    adCampaignController = new AdCampaignController();

    constructor() {
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.adCampaignController.getData);
    }
}
export default new AdCampaignRoutes().router;