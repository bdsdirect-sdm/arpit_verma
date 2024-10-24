"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const GOOGLE_MAPS_API_KEY = 'AIzaSyATvMkqQs927wPlKOM_fR7k2lkrkPHMZ9I';
const client = new google_maps_services_js_1.Client({});
app.get('/api/geocode', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const address = req.query.address;
    if (!address) {
        return res.status(400).send('Address query parameter is required');
    }
    try {
        const response = yield client.geocode({
            params: {
                address: address,
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000,
        });
        res.json(response.data.results);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Google Maps API');
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on the port: ${PORT}`);
});
