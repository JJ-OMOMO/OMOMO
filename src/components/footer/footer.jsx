import React from "react";
import styled from "styled-components";

const Footer = (props) => (
  <Wrapper>
    <FooterTitle>Developer Contact Information</FooterTitle>
    <ContentWrapper>
      <FooterContent>
        <ContactName>JiYoung</ContactName>
        <ContactLink href="https://github.com/moongaia" target="_blank">
          <i class="fab fa-github"></i>
        </ContactLink>
        <ContactLink href="https://velog.io/@young224" target="_blank">
          <i class="fas fa-blog"></i>
        </ContactLink>
        jymoon224@gmail.com
        <ContentDivider>|</ContentDivider>
        <ContactName>JungMin</ContactName>
        <ContactLink href="https://github.com/whljm1003" target="_blank">
          <i class="fab fa-github"></i>
        </ContactLink>
        <ContactLink href="https://velog.io/@whljm1003" target="_blank">
          <i class="fas fa-blog"></i>
        </ContactLink>
        whljm1003@gmail.com
      </FooterContent>
    </ContentWrapper>
    <ContactRights>
      2021 Jiyoung Moon & Jungmin Lee - All rights reserved
    </ContactRights>
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100px;
  background-color: #2f4858;
  // background-color: #ffc6a4;
`;

const FooterTitle = styled.div`
  font-size: 18px;
  // font-family: "GowunDodum-Regular";
  font-family: "CookieRun-Regular";
  color: #f7fa1b;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const FooterContent = styled.div`
  display: flex;
  font-size: 18px;
  // font-weight: bold;
  // font-family: "GowunDodum-Regular";
  font-family: "CookieRun-Regular";
  color: #f7fa1b;
`;

const ContactName = styled.div`
  padding-right: 5px;
`;
const ContentDivider = styled.div`
  font-weight: bold;
  // font-family: "GowunDodum-Regular";
  font-family: "CookieRun-Regular";
  color: #f7fa1b;
  padding: 0px 10px;
`;
const ContactRights = styled.div`
  font-size: 15px;
  font-family: "GowunDodum-Regular";
  // font-family: "CookieRun-Regular";
  color: #f7fa1b;
`;

const ContactLink = styled.a`
  color: #f7fa1b;
  padding-right: 5px;
`;
export default Footer;
