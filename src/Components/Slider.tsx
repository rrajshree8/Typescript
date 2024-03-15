import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

// Install Swiper modules
SwiperCore.use([Navigation]);

interface BannerItem {
  url: string;
}

interface CustomSwiperRef extends SwiperCore {
  params: any;
  originalParams: any;
  el: HTMLElement;
  wrapperEl: HTMLElement;
}

const Slider = () => {
  const bgColor = useColorModeValue("white", "black");

  const [banner, setBanner] = useState<BannerItem[]>([]);
  const swiper = useRef<CustomSwiperRef | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.bitdelta.com/api/v1/public/general"
        );
        setBanner(response.data.data.banners);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      
        <Swiper
          ref={(instance) => {
            if (instance) {
              swiper.current = instance as unknown as CustomSwiperRef;
            }
          }}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
          style={{ padding: "0px",backgroundColor:bgColor }}
        >
          {banner.map((item: BannerItem, index: number) => (
            <SwiperSlide key={index} style={{ padding: "0px",backgroundColor:bgColor }}>
              <Box position="relative"  h="s">
                <Image
                  objectFit="cover"
                  src={item.url}
                  alt={`Slide ${index}`}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
     
    </>
  );
};

export default Slider;
