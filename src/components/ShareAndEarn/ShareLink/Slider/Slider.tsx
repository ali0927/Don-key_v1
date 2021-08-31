import React, { useState } from 'react';
import Banner2 from "./images/Banner2.png";
import Banner3 from "./images/Banner3.png";
import Banner4 from "./images/Banner4.png";
import Banner6 from "./images/Banner6.png";
import Banner7 from "./images/Banner7.png";
import Banner1 from "./images/Banner1.jpeg";
import Banner5 from "./images/Banner5.jpeg";
import styled from "styled-components";
import clsx from 'clsx';
import SlickSlider from "react-slick";
import {LeftSliderArrow, RightSliderArrow} from "icons";
import { useWeb3 } from "don-components";
import {getTotalPoolValue,getTokenAddress, getTokenPrice, toEther} from "helpers";
import BigNumber from "bignumber.js";

const BannerRoot = styled.div`
  min-height: 227px;
`;

const BannerImage = styled.img`
    width: 100%;
    border-radius: 15px;
`;

const Heading = styled.h2`
  color: #fff;
  font-weight: 800;
  margin-top: 26px;
  margin-left: 28px;
`;

const SubHeading = styled.p`
  font-family: Poppins;
  font-size: 14px;
  font-weight: 400; 
  color: #FFFFFF;
  margin-bottom: 0px;
`

const Value = styled(SubHeading)`
    font-weight: 500; 
`;

const BannerContentRoot = styled.div`
   background-image: linear-gradient(to left, rgba(255,255,255,0.1) 0, #000000 100%);
   top: 0;
   position: absolute;
   height: 100%;
   width: 100%;
   border-radius: 15px;
`;

const BannerLeftFooter = styled.div`
  margin-top: 32px;
  padding: 28px 1px 0px 28px;
`;

const HighLight = styled.div`
  width: 39px;
  height: 22px;
  background: #FDD700;
  font-family: Poppins;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const Divider = styled.div`
  border-right: 2px solid #fff;
  height: 33px;
  margin-top: 10px;
`;

const Wordhighlight = styled.span`
   background: #FDD700;
`;

const CutomSlickSlider = styled(SlickSlider)`
    .selected {
      border: 4px solid #FED700;
      border-radius: 10px;
    }
`;

const ThumbDiv = styled.div`
    width: 72px !important;
    height: 72px;
    border: 1px solid #5C5C5C;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
`;

const LIImage = styled.img`
    height: 100%;
    object-fit: cover;
`;

const FooterText = styled.p`
   font-family: Roboto;
   font-size: 16px;
   font-weight: 500;
`;

export const Slider: React.FC<{poolAddress: string; apy: string, farmerName: string; strategyName: string}> = (props) => {
    const {poolAddress, apy, farmerName, strategyName} = props;

    const banners = [Banner1,Banner2, Banner3, Banner4,Banner5, Banner6, Banner7];
    const slickRef = React.useRef<SlickSlider | null>(null);

    const [selectedBanner, setSelectedBanner] = useState(0);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        initialSlide: 0,
      };


      const [tvl, setTvl] = useState("");

  const web3 = useWeb3();
  const fetchTvl = async () => {
      const poolValue = await getTotalPoolValue(web3, poolAddress);
     const tokenPrice = await getTokenPrice(
      web3,
      await getTokenAddress(web3, poolAddress)
      );
    
           setTvl(new BigNumber(toEther(poolValue)).multipliedBy(tokenPrice).toFixed(1));
     };

     React.useEffect(() => {
        fetchTvl();
     }, []);

    const handleChangeImage = (index: number) => () => {
        setSelectedBanner(index);
    }

    const handleNext = () => {
        if(slickRef.current){
            const nextSlide = selectedBanner+1;
            if(banners.length > nextSlide){
               slickRef.current.slickGoTo(nextSlide);
               setSelectedBanner(nextSlide);
            }
            else {
                slickRef.current.slickGoTo(0);
                setSelectedBanner(0);
            }

        }
    }

    const handlePrev = () => {
        if(slickRef.current){
      
            const nextSlide = selectedBanner-1;
            if(nextSlide === 0){
               slickRef.current.slickGoTo(banners.length-1);
               setSelectedBanner(banners.length-1);
            }
            else {
                slickRef.current.slickGoTo(nextSlide);
                setSelectedBanner(nextSlide);
            }
        }
    }

    return (
        <>
      
              <BannerRoot className="position-relative">

                  <BannerImage src={banners[selectedBanner]} alt="Banner image not found"/>
                
                  <BannerContentRoot >
                
                         <Heading>{farmerName}</Heading>
                        <div className="row">
                         <div className="col-lg-5">
                            <BannerLeftFooter>
                                <SubHeading className="mb-3">{strategyName}</SubHeading>
                         

                        <div className="row">
                           <div className="col-5">
                              <HighLight>TVL</HighLight>
                             <Value className="mt-2">{"$"+tvl}</Value>
                         </div>

                         <div className="col-2 d-flex justify-content-center">
                             <Divider/>
                          </div>

                         <div className="col-5">
                            <HighLight>APY</HighLight>
                            <Value className="mt-2">{apy}</Value>
                         </div>
                         </div>
                         </BannerLeftFooter>
                         </div>
                         <div className="col-lg-7 d-flex align-items-end justify-content-center pl-0">
                            <Value>
                                Invest in <Wordhighlight>strategies</Wordhighlight> and make the best yield
                            </Value>
                     </div> 
                   </div>
                      
                      
                  </BannerContentRoot>
                 
                 
                
              </BannerRoot>

        
              
                 <CutomSlickSlider ref={slickRef} className="mt-3" {...settings} >
                 {banners.map((banner, index)=>{
                       return(
                       <div key={index}>
                           <ThumbDiv   className={clsx({
                            "selected": index === selectedBanner
                        })}>
                               <LIImage 
                             
                               src={banner} alt="Banner image not found" onClick={handleChangeImage(index)}/>
                           </ThumbDiv>
                           </div>   
                       )
                    
                   })

                   }
                 </CutomSlickSlider>

                 <div className="d-flex justify-content-center mt-2">
                     <LeftSliderArrow role="button" className="mr-2" onClick={handlePrev}/>
                     <FooterText className="ml-2 mr-2">Select the background for the banner</FooterText>
                     <RightSliderArrow role="button" className="ml-2"  onClick={handleNext}/>
                 </div>
                 

  

        </>
    )
}
