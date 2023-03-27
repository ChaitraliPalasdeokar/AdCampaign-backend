import data from '../../sphere-sample-data.json';
import UtilFunctions from "../util/UtilFunctions";
import AdCampaignModel from "../model/AdCampaignModel";

export default class AdCampaignService{

    constructor() {
    }
    getAllData() {
        const allData: AdCampaignModel[] =[];
        data.forEach((row)=>{
            allData.push(new AdCampaignModel(row.date,row.source,row.attributed_conversions,row.attributed_revenue,row.type,row.spends,row.partition_id,row.optimisation_target))
        })

        return allData;
    }

    getDataFor(allQueryParams) {
        const utilFunctions = new UtilFunctions();
        const data= this.getAllData();
        const queryParams= Object.keys(allQueryParams);
        let finalData;
        queryParams.forEach((query)=>{
           if(query=='groupby'){
               const fields = allQueryParams['groupby'];
               console.log('fields',fields);
             if(fields.length>0){
                 finalData = utilFunctions.groupBy(data,fields);
                 return finalData;
             }
           }
        });
        return finalData;

    }
}