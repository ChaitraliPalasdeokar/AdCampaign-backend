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

    getDataFor(allQueryParams:{[index:string]:any}) {
        const utilFunctions = new UtilFunctions();
        const data= this.getAllData();
        const queryParams= Object.keys(allQueryParams);
        let finalData: { [index: string]: any }=data;
        queryParams.forEach((query)=>{
           if(query=='groupby'){
               const groupParam = allQueryParams['groupby'];
               console.log('fields',groupParam);
             if(groupParam.length>0){
                 finalData = utilFunctions.groupDataBy(finalData,groupParam);
             }
           }
           if(query=='aggregate'){
               const aggregateParam = allQueryParams['aggregate']
               if(aggregateParam.length>0){
                   finalData = utilFunctions.aggregateDataBy(finalData,aggregateParam);
               }
           }
        });
        return finalData;

    }
}