import AdCampaignModel from "../model/AdCampaignModel";

export default class UtilFunctions {
	constructor() {}

	groupDataBy(allData: { [index: string]: any }, property: string) {
		return allData.reduce(
			(acc: { [index: string]: any }, obj: AdCampaignModel) => {
                const key: string = obj[property];
				if (!acc[key]) {
					acc[key] = [];
				}
				acc[key].push(obj);
				return acc;
			},
			{}
		);
	}

	aggregateDataBy(groupedData: { [index: string]: any }, fields: string) {
		return Object.keys(groupedData).reduce(
			(result: { [index: string]: any }, key: string) => {
				result[key] = groupedData[key].reduce(
					(sum: number, item: { [index: string]: any }) => {
						return sum + item[fields];
					},
					0
				);
				return result;
			},
			{}
		);
	}
}