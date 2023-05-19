import React from 'react';
import {
    Nav,
    NavLink,
    // Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
        <div>
            <Nav>
                {/* <Bars /> */}

                <NavMenu>
                    <NavLink style={{ "fontSize": "40px", "color": "#659dbd", "backgroundColor": "white" }} to='/' activestyle>
                        Netskope Plugins Marketplace
                    </NavLink>
                    {/* <NavLink to='/' activestyle>
                        Home
                    </NavLink> */}
                    <NavLink to='/cls' activestyle>
                        CLS Module
                    </NavLink>
                    <NavLink to='/cte' activestyle>
                        CTE Module
                    </NavLink>
                    <NavLink to='/cto' activestyle>
                        CTO Module
                    </NavLink>
                    <NavLink to='/ure' activestyle>
                        URE Module
                    </NavLink>
                    <NavLink to='/are' activestyle>
                        ARE Module
                    </NavLink>
                    <NavLink to='/raise_pr' activestyle>
                        Raise PR
                    </NavLink>
                </NavMenu>
                {/* <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn>
                <NavBtn>
                    <NavBtnLink to='/signin'>Sign In</NavBtnLink>
                </NavBtn> */}
            </Nav>
        </div>
    );
};

export default Navbar;
