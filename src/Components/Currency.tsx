
import { Box, Wrap } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HTTP_URL } from "../utils";

const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useEffect(() => {
    axios
      .get(`${HTTP_URL}/public/fiat-currency`)
      .then(function (response) {
        setCurrencies(response.data.data.currencies);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const handleCurrencySelect = (index) => {
    setSelectedCurrency(index);
  };

  return (
    <Wrap gap={"10px"} flexBasis={"1"}>
      {currencies.map((currency, idx) => (
        <Box
          key={idx}
          as="button"
          borderRadius="md"
          _hover={{ background: "grey", color: "white" }}
          px={4}
          h={8}
          onClick={() => handleCurrencySelect(idx)}
        >
          {currency.name} - {currency.symbol}{" "}
          {selectedCurrency === idx && <CheckCircleIcon color="black.500" />}
        </Box>
      ))}
    </Wrap>
  );
};

export default Currency;
