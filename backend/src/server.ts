import express from "express";
import { Client } from "@googlemaps/google-maps-services-js";
import dotenv from "dotenv";
import { config } from "process";


dotenv.config();
const app = express();
const PORT = process.env.PORT;
const GOOGLE_MAPS_API_KEY = 'AIzaSyATvMkqQs927wPlKOM_fR7k2lkrkPHMZ9I';
const client = new Client({});

app.get('/api/geocode', async (req:any, res:any) => {
    const address = req.query.address as string;

    if (!address) {
        return res.status(400).send('Address query parameter is required');
    }

    try {
        const response = await client.geocode({
            params: {
                address: address,
                key: GOOGLE_MAPS_API_KEY,
            },
            timeout: 1000, 
        });

        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data from Google Maps API');
    }
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the port: ${PORT}`);
});