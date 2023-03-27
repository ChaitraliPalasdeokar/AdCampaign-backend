import AdCampaignModel from "../model/AdCampaignModel";

export default class UtilFunctions{
    constructor() {
    }

    groupDataBy(allData:AdCampaignModel[], property:string) {
        return allData.reduce((acc:{[index: string]:any}, obj:AdCampaignModel) => {
            const key:string = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }


}