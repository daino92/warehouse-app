import React from 'react';
import styled from '@emotion/styled';
import {Link} from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import mq from '../util/mediaQueries.js';
import {colors, dict} from '../util/variables';

const HeaderContainer = styled('header')({
    display: "flex",
    justifyContent: "space-between",
    height: "70px",
    width: "100%",
},
mq({
    padding: ["10px", "20px 40px", "20px 60px"],
    marginBottom: ["1em", "2em"],
}))

const LogoContainer = styled(Link)`
    display: flex;
	align-items: center;
	justify-content: center;
    height: 100%;
    width: 70px;
`;

const OptionsContainer = styled('div')`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const OptionLink = styled(NavLink)`
    padding: 10px 15px;
    cursor: pointer;

    &.active {
        color: ${colors.sun};
        text-decoration: underline;
    }
`;

const Header = () => (
    <HeaderContainer>
        <LogoContainer to='/'>{dict.home}</LogoContainer>
        <OptionsContainer>
            <OptionLink activeClassName='active' to='/products/Kifisia/1'>{dict.products}</OptionLink>
            <OptionLink activeClassName="active" to="/categories">{dict.categories}</OptionLink>
            <OptionLink activeClassName="active" to="/history">{dict.history}</OptionLink>
        </OptionsContainer>
    </HeaderContainer>
);

export default Header;