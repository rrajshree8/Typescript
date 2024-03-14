import { Box, Center, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { HTTP_URL } from "../utils";

export default function CoinTable() {

    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${HTTP_URL}/market/pairs`, {
                    headers: { 'X-API-KEY': 'BitdeltaExchange' }
                });
                const coinData = response.data.data?.spot ?? [];
                setCoins(coinData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);


    function lakhCal(number: number): string {
        if (number >= 100000) {
            return (number / 100000).toFixed(2) + ' L';
        } else {
            return number.toFixed(2);
        }
    }

    return (
        <Box m={'30px'}>
            <Center>Coin Price Table</Center>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Name:</Th>
                            <Th>Price:</Th>
                            <Th>High:</Th>
                            <Th>Low:</Th>
                            <Th>Change:</Th>
                            <Th>Circulating Supply:</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                    {coins?.map((coin:any, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Flex>
                                        <Box>{coin.keywords[0]}</Box>
                                        <Box pl='2' fontSize='sm' color='gray'>{coin.currency1}</Box>
                                    </Flex>
                                </Td>
                                <Td><Box color={coin.pricing[0] >= 0 ? 'green' : 'red'}>$ {coin.pricing[0]}</Box></Td>
                                <Td>$ {coin.high}</Td>
                                <Td>$ {coin.low}</Td>
                                <Td>
                                    <Box color={coin.change >= 0 ? 'green' : 'red'}>
                                        $ {(coin.change / 10).toFixed(2)}
                                    </Box>
                                </Td>
                                <Td>{lakhCal(coin.volume)}</Td>
                            </Tr>
                        ))}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>
    )
}