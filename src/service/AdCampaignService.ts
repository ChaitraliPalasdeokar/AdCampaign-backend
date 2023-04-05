import data from '../../sphere-sample-data.json';
import UtilFunctions from "../util/UtilFunctions";
import AdCampaignModel from "../model/AdCampaignModel";
import {metricFields, queryParameters} from "../util/constants"
export default class AdCampaignService{

    getAllData():AdCampaignModel[] {
        const allData: AdCampaignModel[] =[];
        data.forEach((row)=>{
            allData.push(new AdCampaignModel(row.date,row.source,row.attributed_conversions,row.attributed_revenue,row.type,row.spends,row.partition_id,row.optimisation_target))
        })

        return allData;
    }

    getDataFor(allQueryParams:{[index:string]:any}) {
        const utilFunctions = new UtilFunctions();
        const data:AdCampaignModel[]= this.getAllData();
        const queryParams:string[]= Object.keys(allQueryParams);
        let response: { [index: string]: any }=data;
        queryParams.forEach((query)=>{
            if(query==queryParameters.FIELDS){
                const fieldsParam = allQueryParams[queryParameters.FIELDS]
                if(fieldsParam.length>0){
                    response = utilFunctions.filterFields(response,fieldsParam)
                }
            }
           if(query==queryParameters.GROUPBY){
               const groupParam = allQueryParams[queryParameters.GROUPBY];
             if(groupParam.length>0){
                 response = utilFunctions.groupDataBy(response,groupParam);
             }
           }
           if(query==queryParameters.AGGREGATE){
               if(!(queryParams.includes(queryParameters.GROUPBY))){
                   throw new Error('Invalid groupby parameter. Please specify a groupby field')
               }
               const aggregateParam = allQueryParams[queryParameters.AGGREGATE]
               if(aggregateParam.length>0){
                   response = utilFunctions.aggregateDataBy(response,aggregateParam);
               }
           }
        });
        return response;
    }

    getMetrics() {
        const utilFunctions = new UtilFunctions();
        const data:AdCampaignModel[]= this.getAllData();

        return utilFunctions.totalDataFor(metricFields, data);
    }

}