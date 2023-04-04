import AdCampaignService from "../../src/service/AdCampaignService";
import AdCampaignModel from "../../src/model/AdCampaignModel";
import AdCampaignController from "../../src/controller/AdCampaignController";

describe("AdCampaign Service",()=>{
    afterEach(()=>{
        jest.resetAllMocks();
    })
    describe("Get Data",()=>{
    it("should make a call to getData to read data from file and return data in format", () => {
        const data:AdCampaignModel[] =[
            new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                "9.773536305012904",
                "1063.8644023804768",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "conversions"),
            new AdCampaignModel("2022-06-01",
                "affiliate_prospecting",
                "9.171867894663112",
                "998.371874002628",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "revenue")
        ];
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);

        new AdCampaignService().getDataFor({});

        expect(AdCampaignService.prototype.getAllData).toHaveBeenCalledTimes(1);
    });

    it("should return data with fields passed from query parameters", () => {
        const data:AdCampaignModel[] =[
            new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                "9.773536305012904",
                "1063.8644023804768",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "conversions"),
            new AdCampaignModel("2022-06-01",
                "affiliate_prospecting",
                "9.171867894663112",
                "998.371874002628",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "revenue")
        ];
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);
        const responseWithSelectedFields = [
            {"source": "affiliate_prospecting", "type": "incrementality"},
            {"source": "affiliate_prospecting", "type": "incrementality"}];

        const response = new AdCampaignService().getDataFor( { fields: [ 'source', 'type' ] });

        expect(response).toStrictEqual(responseWithSelectedFields);
    });

    it("should return data grouped by a field passed from query parameters", () => {
        const data:AdCampaignModel[] =[
            new AdCampaignModel("2022-06-01", "affiliate_prospecting",
            "9.773536305012904",
            "1063.8644023804768",
             "incrementality",
             "98.537499",
             "932561105d21a54d3d1d2a941164ffec321cd76b",
            "conversions"),
            new AdCampaignModel("2022-06-01",
            "baseline",
             "9.171867894663112",
             "998.371874002628",
             "incrementality",
             "98.537499",
             "932561105d21a54d3d1d2a941164ffec321cd76b",
             "revenue")
            ];
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);
        const responseGroupedBySource ={
            "affiliate_prospecting": [
                {
                    "attributed_conversions": 9.773536305012904,
                    "attributed_revenue": 1063.8644023804768,
                    "date": new Date("2022-06-01"),
                    "optimisation_target": "conversions",
                    "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
                    "source": "affiliate_prospecting",
                    "spends": 98.537499,
                    "type": "incrementality"
                }
            ],
            "baseline": [
                {
                    "attributed_conversions": 9.171867894663112,
                    "attributed_revenue": 998.371874002628,
                    "date": new Date("2022-06-01"),
                    "optimisation_target": "revenue",
                    "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
                    "source": "baseline",
                    "spends": 98.537499,
                    "type": "incrementality"
                }
            ]
        }

        const response = new AdCampaignService().getDataFor(  { groupby: 'source' });

        expect(response).toEqual(responseGroupedBySource);
    });

    it("should return data aggregated on a field based on grouped field passed from query parameters", () => {
        const data:AdCampaignModel[] =[
            new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                "9.773536305012904",
                "1063.8644023804768",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "conversions"),
            new AdCampaignModel("2022-06-01",
                "baseline",
                "9.171867894663112",
                "998.371874002628",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "revenue")
        ];
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);
        const responseAggregatedBySpends ={
            "affiliate_prospecting": {
                "spends": 98.537499
            },
            "baseline": {
                "spends": 98.537499
            }
        };

        const response = new AdCampaignService().getDataFor(  { groupby: 'source',aggregate:'spends' });

        expect(response).toEqual(responseAggregatedBySpends);
    });

    it("should throw an error given aggregated query parameter is passed without group by query parameter", () => {
       expect.assertions(1);
        const data:AdCampaignModel[] =[
            new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                "9.773536305012904",
                "1063.8644023804768",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "conversions"),
            new AdCampaignModel("2022-06-01",
                "baseline",
                "9.171867894663112",
                "998.371874002628",
                "incrementality",
                "98.537499",
                "932561105d21a54d3d1d2a941164ffec321cd76b",
                "revenue")
        ];
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);
        const errorMessage=new Error("Invalid groupby parameter. Please specify a groupby field");

        try {
           new AdCampaignService().getDataFor({ aggregate: 'spends'});
        } catch (e) {
            expect(e).toMatchObject(errorMessage);
        }
    });
    })

    describe("Get Metrics", () => {
            it("should make a call to getData to read data from file and return data in format", () => {
                const data:AdCampaignModel[] =[
                    new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                        "9.773536305012904",
                        "1063.8644023804768",
                        "incrementality",
                        "98.537499",
                        "932561105d21a54d3d1d2a941164ffec321cd76b",
                        "conversions"),
                    new AdCampaignModel("2022-06-01",
                        "affiliate_prospecting",
                        "9.171867894663112",
                        "998.371874002628",
                        "incrementality",
                        "98.537499",
                        "932561105d21a54d3d1d2a941164ffec321cd76b",
                        "revenue")
                ];
                AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);

                new AdCampaignService().getMetrics();

                expect(AdCampaignService.prototype.getAllData).toHaveBeenCalledTimes(1);
            });

        it("should return total data for given numeric fields", () => {
            const data:AdCampaignModel[] =[
                new AdCampaignModel("2022-06-01", "affiliate_prospecting",
                    "9.773536305012904",
                    "1063.8644023804768",
                    "incrementality",
                    "98.537499",
                    "932561105d21a54d3d1d2a941164ffec321cd76b",
                    "conversions"),
                new AdCampaignModel("2022-06-01",
                    "affiliate_prospecting",
                    "9.171867894663112",
                    "998.371874002628",
                    "incrementality",
                    "98.537499",
                    "932561105d21a54d3d1d2a941164ffec321cd76b",
                    "revenue")
            ];
            AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);
            const expectedMetrics = {
                "attributed_conversions": 18.95,
                "attributed_revenue": 2062.24,
                "spends": 197.07
            };

            const actualMetrics = new AdCampaignService().getMetrics();

            expect(actualMetrics).toStrictEqual(expectedMetrics);

        });

    });

});
