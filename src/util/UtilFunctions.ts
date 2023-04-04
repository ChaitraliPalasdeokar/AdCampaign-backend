import AdCampaignModel from "../model/AdCampaignModel";

type objectWithNumberValues = { [index: string]: number };
export default class UtilFunctions {

	groupDataBy(allData: { [index: string]: any }, property: string) {
		return allData.reduce(
			(acc: { [index: string]: any }, obj: object) => {
				const key:any = (obj as any)[property];
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
		const allFields= fields.split(',');
		return Object.keys(groupedData).reduce(
			(result: { [index: string]: any }, key: string) => {
				result[key];
				allFields.forEach((field)=>{
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
		return data.map((row:object) => {
			const obj:any={};
			values.forEach((field:string) => {
				obj[field] = (row as any)[field] ;
			});
			return obj;
		});
	}

	totalDataFor(numericFields: string[], data: AdCampaignModel[]) {
		let result: objectWithNumberValues = {};
		numericFields.forEach((field) => {
			const totalSum = data.map(obj => obj).reduce(
				(sum: number, item: { [index: string]: any }) => {
					return sum + item[field];
				},
				0
			);
			result[field] = Math.round(totalSum*100)/100;

		})
		return result;
	}
}