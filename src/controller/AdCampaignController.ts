import express from "express";
import AdCampaignService from "../service/AdCampaignService";

export default class AdCampaignController{

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
            res.json(response);
        } catch (error:unknown) {
            console.log(error);
            res.status(400);
            if(error instanceof Error)
                res.json(error.message);
            res.json('Error');
        }
    }


}