import styled from 'styled-components';
import logo from "../../img/logo.png";



const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const LogoImg =  styled.div`
    width: 29px;
    height: 29px;   
    
    img {
        width: 100%;
        height: 100%;
        }
 `;

 const LogoText = styled.div`
    font-size: 16px;
    margin: 0 ;
    margin-left: 4px;
    color: #222;
    font-weight: 500;
    `;

    export function Logo(props) {
        return <LogoWrapper>
            <LogoImg><img src={logo} alt="Chat app logo" />
            </LogoImg>
            <LogoText>Chat App</LogoText>
            </LogoWrapper>
    }


