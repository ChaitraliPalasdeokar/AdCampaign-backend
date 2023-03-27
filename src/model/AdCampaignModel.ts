export default class AdCampaignModel {

    readonly date: Date;

    readonly source: string;

    readonly attributed_conversions: number;

    readonly attributed_revenue: number;

    readonly type:string;

    readonly spends: number;

    readonly partition_id: string;

    readonly optimisation_target: string;



    constructor(date:string, source:string, attributed_conversions:string,attributed_revenue:string,type:string,spends:string,partition_id:string,optimisation_target:string) {
        this.date = new Date(date);
        this.source = source;
        this.attributed_conversions = Number(attributed_conversions);
        this.attributed_revenue=Number(attributed_revenue);
        this.type = type;
        this.spends=Number(spends);
        this.partition_id =partition_id;
        this.optimisation_target = optimisation_target;
    }
}