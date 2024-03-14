import axios from "axios";
import { useEffect, useState } from "react";
import { HTTP_URL } from "../utils";
import { Box } from "@chakra-ui/react";

export default function CoinCard() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${HTTP_URL}/market/pairs?symbol=BTCUSDT`, {
                    headers: { 'X-API-KEY': 'BitdeltaExchange' }
                });
                const coinData = response.data.data?.spot ?? [];
                console.log(response.data.data)
                setCoins(coinData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);


   
    return (
      <Box>

      </Box>
    )
}