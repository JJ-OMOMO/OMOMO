import React from "react";
import styled from "styled-components";

const Footer = (props) => (
  <Wrapper>
    <FooterTitle>개발자 소개</FooterTitle>
    <FooterTitle>개발자 소개</FooterTitle>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100px;
  background-color: #2f4858;
  // background-color: #ffc6a4;
`;

const FooterTitle = styled.span`
  font-size: 30px;
  color: #e9f108;
`;
export default Footer;
