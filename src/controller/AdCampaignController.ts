import data from '../../sphere-sample-data.json';
import express from "express";

export default class AdCampaignController{
    constructor() {
    }

    async getData(req: express.Request, res: express.Response){
        try {
            console.log('started');
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json('Error')
        }

    }
}