import AdCampaignModel from "../model/AdCampaignModel";

export default class UtilFunctions {
	constructor() {
	}

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
		const allfields= fields.split(',');
		return Object.keys(groupedData).reduce(
			(result: { [index: string]: any }, key: string) => {
				result[key];
				allfields.forEach((field)=>{
					const aggregated_data= groupedData[key].reduce(
						(sum: number, item: { [index: string]: any }) => {
							return sum + item[field];
						},
						0
					);
					result[key]={...result[key],[field]:aggregated_data};

				})
				return result;
			},
			{}
		);
	}

	filterFields(data: { [p: string]: any }, fieldsParam: any) {
		const values: string[] = Array.isArray(fieldsParam) ? fieldsParam: [fieldsParam] || [ ];
		console.log('params',values);
		return data.map((row) => {
			const obj={};
			values.forEach((field) => {
				obj[field] = row[field];
			});
			return obj;
		});
	}

}