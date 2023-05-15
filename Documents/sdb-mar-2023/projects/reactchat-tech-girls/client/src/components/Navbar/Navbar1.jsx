import React from "react";
import styled from "styled-components";
import { Logo } from "../Logo";

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  padding: 0 1.5em;
  height: 60px;
  box-shadow: 0 1px 3px rgba(15, 15, 15, 0.13);
  with: 100%;
  `;

   const LeftSection = styled.div`
    display: flex;
    `;

    const MiddleSection = styled.div`
    display: flex;
    flex: 2;    
    `;

    const RightSection = styled.div`
    display: flex;
    `;

    export function NavBar(props) {
        return (
            <NavBarContainer>
                <LeftSection><Logo/></LeftSection>
                <MiddleSection>Middle Section</MiddleSection>
                <RightSection>Right Section</RightSection>
            </NavBarContainer>
        );
    }
