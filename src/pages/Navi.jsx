import React, { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Menu } from 'semantic-ui-react'
import Search from './Search'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export default function Navi() {

    const [cookies, setCookie] = useCookies(['user']);

    const [isAuthenticaten, setIsAuthenticaten] = useState(true)

    const history = useHistory()

    function handleSignOut() {
        setIsAuthenticaten(false)
        setCookie('UserName', "", { path: '/' });
        setCookie('Password', "", { path: '/' });
        setCookie('UserId', "", { path: '/' });
        history.push("/")
    }

    function handleSignIn() {
        setIsAuthenticaten(true)
    }

    function homeClick() {
        history.push("/HomePage/EvaluationModelList")
    }

    return (
        <div>
            <Menu inverted size='mini' fixed="top">
                <Menu.Item onClick={homeClick} name='home' />
                <Menu.Item name='messages' />

                <Menu.Item>
                    <Search />
                </Menu.Item>

                <Menu.Menu position='right'>
                    <Dropdown item text='Language'>
                        <Dropdown.Menu>
                            <Dropdown.Item>English</Dropdown.Item>
                            <Dropdown.Item>Türkçe</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Menu.Item>
                        {isAuthenticaten ? <SignedIn signOut={handleSignOut} /> : <SignedOut signIn={handleSignIn} />}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}
