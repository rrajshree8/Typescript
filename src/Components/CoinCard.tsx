
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import SpChart from './Chart'

 
interface ICoinCardProps {
    keywords: string[];
    currency1: string;
    symbol: string;
    pricing: number[];
    change: number;
}
 
const CoinCard: React.FunctionComponent= () => {
    const bgColor = useColorModeValue("#96CCF9", "#0095FF");
    const [coins, setCoins] = useState<ICoinCardProps[]>([]);
    const coinArray = ['BTCUSDT', 'ETHUSDT', 'XRPUSDT','DIFXUSDT','BNBUSDT']
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${'https://api.bitdelta.com/api/v1/market/pairs'}`, {
                    headers: { 'X-API-KEY': 'BitdeltaExchange' }
                });
                const coinData: ICoinCardProps[] = response.data.data?.spot ?? [];
                console.log("data", coinData)
                setCoins(coinData);
            } catch (error) {
                console.error('Error fetching coin data:', error);
            }
        };
 
        fetchData();
    }, []);
    return (
        <Flex justifyContent='space-evenly'>
            {coins.map((item: ICoinCardProps, index: number) => {
 
                if (coinArray.includes(item.symbol)) {
                    return (
                        <Box key={index} justifyContent='space-between' m='5' bg={bgColor} borderRadius='20' p='5' w='15rem'>
 
                            <Flex>
                                <Text color='#020e8e' fontSize='2xl'>{item.keywords[0]}</Text>
                                <Text color='grey' fontSize='sm' pl='3' py='2'> {item.currency1}</Text>
                            </Flex>
                            <Flex direction={'column'}>
                                <Text as='b' fontSize='lg'>${item.pricing[0]}</Text>
                                <Text fontSize='sm' color={item.change?'green':'red'}>{(item.change).toFixed(2)}%</Text>
                            </Flex>
                            <Box m={'12px'} h={'70%'} ><SpChart data={item.pricing} index={`${item.currency1}-${index}`} change={item.change}/></Box>
 
                        </Box>
                    );
                } else {
                    return null
                }
            })}
        </Flex>
    );
 
};
 
export default CoinCard;
 