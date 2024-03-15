import { Box, Wrap } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HTTP_URL } from "../utils";

const Language = () => {
  const [lang, setLang] = useState([]);
  const [selectedLang, setSelectedLang] = useState(null);

  useEffect(() => {
    axios
      .get(`${HTTP_URL}/public/lang`)
      .then(function (response) {
        setLang(response.data.data);
        // handle success
        console.log(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleLangSelect = (index) => {
    setSelectedLang(index);
  };

  return (
    <Wrap gap={"10px"} flexBasis={"1"}>
      {lang &&
        lang.map((item, idx) => (
          <Box
            key={idx}
            as="button"
            borderRadius="md"
            _hover={{ background: "grey", color: "white" }}
            px={4}
            h={8}
            onClick={() => handleLangSelect(idx)}
          >
            {item.lang}{" "}
            {selectedLang === idx && <CheckCircleIcon color="black.500" />}
          </Box>
        ))}
    </Wrap>
  );
};

export default Language;
