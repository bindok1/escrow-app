import React, { useEffect, useRef } from "react";
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "@/store/hooks";
import { usePathname } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"
import { fetchProducts } from "@/store/apps/eCommerce/ECommerceSlice";
import Image from "next/image";
import { ProductType } from "@/app/(DashboardLayout)/types/apps/eCommerce";

const ProductCarousel = () => {
  const [state, setState] = React.useState<{ nav1: any; nav2: any }>({ nav1: null, nav2: null });
  const slider1 = useRef<any>();
  const slider2 = useRef<any>();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const getTitle = pathName.split('/').pop();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const product: ProductType | undefined = useSelector(
    (state) => state.ecommerceReducer.products.find(
      (p: ProductType) => p.id.toString() === getTitle
    )
  );
  
  const getProductImage = product?.image_url || "/images/products/s1.jpg";

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    arrows: false,
    swipeToSlide: true,
    slidesToScroll: 1,
    centerMode: true,
    className: "centerThumb",
    speed: 500,
  };

  return (
    <Box>
      <Slider asNavFor={nav2} ref={(slider) => (slider1.current = slider)}>
        <Box>
          <Image
            src={getProductImage}
            alt={product?.name || 'Product Image'}
            width={500}
            height={500}
            style={{ borderRadius: '5px', width: '100%', objectFit: 'contain' }}
          />
        </Box>
      </Slider>
      <Slider
        asNavFor={nav1}
        ref={(slider) => (slider2.current = slider)}
        {...settings}
      >
        <Box sx={{ p: 1, cursor: "pointer" }}>
          <Image
            src={getProductImage}
            alt={product?.name || 'Product Image'}
            width={72}
            height={72}
            style={{ borderRadius: '5px' }}
          />
        </Box>
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
