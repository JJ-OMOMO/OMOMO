import React from "react";
import styled from "styled-components";

const Footer = (props) => (
  <Wrapper>
    <FooterTitle>개발자 소개</FooterTitle>
    <FooterTitle>개발자 소개</FooterTitle>
    <ContactRights>
      2021 Jiyoung Moon & Jungmin Lee - All rights reserved
    </ContactRights>
  </Wrapper>
);

const Wrapper = styled.div`
  // display: flex;
  // justify-content: space-between;
  height: 100px;
  background-color: #2f4858;
  // background-color: #ffc6a4;
`;

const FooterTitle = styled.span`
  font-size: 30px;
  color: #e9f108;
`;

const ContactRights = styled.div`
  font-size: 20px;
  color: yellow;
`;
export default Footer;
