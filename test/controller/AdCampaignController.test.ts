import AdCampaignService from "../../src/service/AdCampaignService";
import AdCampaignController from "../../src/controller/AdCampaignController";
import express from "express";
import {Request} from "express";

describe("AdCampaign Controller", () => {
    afterEach(()=>{
        jest.resetAllMocks();
    });

    describe("Get Data",()=>{

    it("Should make a call to adcampaign service to get all data given query parameters are not passed", async () => {
        const mockRequest = {
        } as express.Request;
        const mockResponse: any = {
            json: jest.fn(),
            status: jest.fn(),
        };
       AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue([{
           "date": "2022-06-01",
           "source": "affiliate_prospecting",
           "attributed_conversions": "9.773536305012904",
           "attributed_revenue": "1063.8644023804768",
           "type": "incrementality",
           "spends": "98.537499",
           "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
           "optimisation_target": "conversions"
           }, {
               "date": "2022-06-01",
               "source": "affiliate_prospecting",
               "attributed_conversions": "9.171867894663112",
               "attributed_revenue": "998.371874002628",
               "type": "incrementality",
               "spends": "98.537499",
               "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
               "optimisation_target": "revenue"
           }]);

       new AdCampaignController().getData(mockRequest,mockResponse);

       expect(AdCampaignService.prototype.getAllData).toHaveBeenCalledTimes(1);
    });

    it("Should return response with all data given query parameters are not passed", async () => {
        const mockRequest = {
        } as express.Request;
        const data = [{
            "date": "2022-06-01",
            "source": "affiliate_prospecting",
            "attributed_conversions": "9.773536305012904",
            "attributed_revenue": "1063.8644023804768",
            "type": "incrementality",
            "spends": "98.537499",
            "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
            "optimisation_target": "conversions"
        }, {
            "date": "2022-06-01",
            "source": "affiliate_prospecting",
            "attributed_conversions": "9.171867894663112",
            "attributed_revenue": "998.371874002628",
            "type": "incrementality",
            "spends": "98.537499",
            "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
            "optimisation_target": "revenue"
        }];
        const mockResponse: any = {
            json: jest.fn().mockImplementationOnce((data) => Promise.resolve(data)),
            status: jest.fn(),
        };
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(data);

        await new AdCampaignController().getData(mockRequest,mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(data);
    });

    it("Should make a call to adcampaign service to return queried data given query parameters are passed", async () => {
        const mockRequest = {
            query: { groupby: [ 'source' ], aggregate: 'spends' },
            get: jest.fn(),
        } ;
        const mockResponse: any = {
            json: jest.fn(),
            status: jest.fn(),
        };
        AdCampaignService.prototype.getDataFor = jest.fn().mockReturnValue({
                "affiliate_prospecting": {
                    "attributed_conversions": 10450.631080134954
                },
                "baseline": {
                    "attributed_conversions": 25487.58813220433
                },
                "direct": {
                    "attributed_conversions": 9711.69138028424
                }
            }
        );

        new AdCampaignController().getData(mockRequest as any as Request,mockResponse);

        expect(AdCampaignService.prototype.getDataFor).toHaveBeenCalledTimes(1);
    });

    it("Should return queried data as response given query parameters are passed", async () => {
        const data = {
            "affiliate_prospecting": {
                "attributed_conversions": 10450.631080134954
            },
            "baseline": {
                "attributed_conversions": 25487.58813220433
            },
            "direct": {
                "attributed_conversions": 9711.69138028424
            }
        };
        const mockRequest = {
            query: { groupby: [ 'source' ], aggregate: 'spends' },
            get: jest.fn(),
        } ;
        const mockResponse: any = {
            json: jest.fn().mockImplementationOnce((data) => Promise.resolve(data)),
            status: jest.fn(),
        };

        AdCampaignService.prototype.getDataFor = jest.fn().mockReturnValue(data);

        new AdCampaignController().getData(mockRequest as any as Request,mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(data);
    });

    it("Should return error given any error is thrown from Adcampaign service", async () => {
        const mockRequest = {};
        const mockResponse: any = {
            json: jest.fn().mockImplementationOnce((data) => Promise.resolve(data)),
            status: jest.fn(),
        };
        AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue(new Error('Generic Error'));

        new AdCampaignController().getData(mockRequest as any as Request,mockResponse);

        expect(mockResponse.json).toHaveBeenCalledWith(new Error('Generic Error'));
    });
    });

    describe("Get Metrics",()=>{
        it("Should make a call to adcampaign service to get all metrics of data", async () => {
            const mockRequest = {
            } as express.Request;
            const mockResponse: any = {
                json: jest.fn(),
                status: jest.fn(),
            };
            AdCampaignService.prototype.getAllData = jest.fn().mockReturnValue([{
                "date": "2022-06-01",
                "source": "affiliate_prospecting",
                "attributed_conversions": "9.773536305012904",
                "attributed_revenue": "1063.8644023804768",
                "type": "incrementality",
                "spends": "98.537499",
                "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
                "optimisation_target": "conversions"
            }, {
                "date": "2022-06-01",
                "source": "affiliate_prospecting",
                "attributed_conversions": "9.171867894663112",
                "attributed_revenue": "998.371874002628",
                "type": "incrementality",
                "spends": "98.537499",
                "partition_id": "932561105d21a54d3d1d2a941164ffec321cd76b",
                "optimisation_target": "revenue"
            }]);

            new AdCampaignController().getMetrics(mockRequest,mockResponse);

            expect(AdCampaignService.prototype.getAllData).toHaveBeenCalledTimes(1);
        });

    })

});