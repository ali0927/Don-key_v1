import * as React from "react";
import { ITeamBoardProps } from "./interfaces";
import styled from "styled-components";
import { FaLinkedin, FaTwitter } from "react-icons/fa";

const Column = styled.div`
    margin-bottom: 140px;
    padding-left: 18px;
    pading-right: 18px;
`;

const CardWarpper = styled.div`
  background: #fff;
  border-radius: 20px;
  min-height: 237px;
`;

const CardContent = styled.div`
  position: absolute;
  top: -25%;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 50%;
  overflow: hidden;
  width: 174px;
  height: 174px;
  object-fit: cover;
  object-position: top;
`;

const Heading3 = styled.h3`
  font-family: Poppins;
  font-size: 1.37rem;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  font-family: Poppins;
  font-size: 0.88rem;
  color: #8B8B8B;
  margin-bottom: 5px;
`;

const IconsRoot = styled.div`
   width: 25%;
   & svg {
     font-size: 22px;
     & path {
       fill: #8B8B8B;
     }
   }
`;

export const TeamBoard: React.FC<ITeamBoardProps> = (props) => {
  const { name, designation, image, twitterlink, linkedLink } = props;

  return (
    <>
      <Column className="col-md-4 col-lg-3">
         <CardWarpper className='position-relative'>
             <CardContent className="flex-column align-items-center">
                   <Image className="img-fluid" src={image} alt="ImageNotFound" />
                   <Heading3 className="mt-4 text-center">{name}</Heading3>
                   <SubTitle>{designation}</SubTitle>
                   <IconsRoot className="d-flex justify-content-around">
                   {twitterlink && (
                    <a href={twitterlink}>
                         <FaTwitter />
                    </a>
                    )}
                  {linkedLink && (
                     <a href={linkedLink}>
                         <FaLinkedin />
                      </a>
                  )}
                  </IconsRoot>
            </CardContent>
              
         </CardWarpper>

      
      
      </Column>
    </>
  );
};

{/* <UserRoot className="shadow-sm d-flex flex-column">
<div>
    <Thumb>
       <img className="img-fluid" src={image} alt="ImageNotFound" />
    </Thumb>


    <Heading3 className="mt-4 text-center">{name}</Heading3>
    <SubTitle>{designation}</SubTitle>
   
</div>
</UserRoot> */}



{/* <UserRoot className="shadow-sm py-5 p-3 d-flex">
        
<Heading3 className="mt-4 text-center">{name}</Heading3>
<SubTitle>{designation}</SubTitle>


</UserRoot> */}

