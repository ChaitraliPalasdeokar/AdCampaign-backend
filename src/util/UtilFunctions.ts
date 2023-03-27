import AdCampaignModel from "../model/AdCampaignModel";

export default class UtilFunctions{
    constructor() {
    }

    groupBy(allData:AdCampaignModel[], property:string) {
        return allData.reduce((acc:{[index: string]:any}, obj:AdCampaignModel) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }


}