import React from "react";
import styled from "styled-components";

const Footer = (props) => (
  <Wrapper>
    <FooterTitle>개발자 소개</FooterTitle>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;
  background-color: black;
`;

const FooterTitle = styled.span`
  font-size: 30px;
  color: #e9f108;
`;
export default Footer;
