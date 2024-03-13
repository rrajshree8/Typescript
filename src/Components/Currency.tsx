import { Box, Wrap } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { HTTP_URL } from '../utils'

const Currency = () => {

    const [currencies,setCurrencies]=useState([])


    useEffect(()=>{

        axios.get(`${HTTP_URL}/public/fiat-currency`)
  .then(function (response) {
    setCurrencies(response.data.data.currencies)

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

    },[])

  return (
    <Wrap gap={'10px'} flexBasis={'1'}>
 

{currencies && currencies?.map((item:any,idx)=>{
    return(
<Box key={idx} as='button' borderRadius='md'  _hover={{ background: 'grey', color:'white' }}  px={4} h={8}>
  {item.name} - {item.symbol}
</Box>
    )
})}






   </Wrap>
  )
}


export default Currency