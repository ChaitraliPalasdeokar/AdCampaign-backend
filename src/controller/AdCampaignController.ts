import express from "express";
import AdCampaignService from "../service/AdCampaignService";

export default class AdCampaignController{
    constructor(
    ) {
    }

     getData(req: express.Request, res: express.Response){
         const service = new AdCampaignService();
         const queryParamsPresent = Object.keys(req.query).length!==0;
         let response;
         try {
             if(queryParamsPresent){
                 response = service.getDataFor(req.query);
             }
             else{
                 response = service.getAllData();
             }
            console.log('started');
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(400);
            res.json('Error')
        }
    }


}