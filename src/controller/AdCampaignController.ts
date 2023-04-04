import {Request,Response} from "express";
import AdCampaignService from "../service/AdCampaignService";

export default class AdCampaignController{

     getData(req: Request, res:Response){
         const service = new AdCampaignService();
         const queryParamsPresent = req.query?Object.keys(req.query).length!==0:false;
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