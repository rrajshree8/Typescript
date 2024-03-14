
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HTTP_URL } from '../utils';
import { Image, Img } from '@chakra-ui/react';

export default function Slider() {

    const [banner,setBanner]=useState([])


    useEffect(()=>{

        axios.get(`${HTTP_URL}/public/general`)
  .then(function (response) {
    setBanner(response.data.data.banners)

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

    },[])



  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        {banner && banner?.map((item:any,idx)=>{
          return(
           
            item.url.startsWith("https")? <SwiperSlide key={idx}><img src={item.url}/></SwiperSlide> : null
          )
        })}
      </Swiper>
    </>
  );
}
