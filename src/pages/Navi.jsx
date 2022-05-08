import React, { useState } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'
import Search from './Search'
import SignedOut from './SignedOut'
import SignedIn from './SignedIn'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import UserService from '../services/UserService'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

export default function Navi() {

    const [cookie, setCookie] = useCookies(['user']);

    const [isAuthenticaten, setIsAuthenticaten] = useState(true)

    const history = useHistory()

    function handleSignOut() {
        let userService = new UserService();
        userService.deleteSession(Cookies.get("sessionId")).then((result) => {
            if (result.data.success) {
                setCookie('sessionId', "", { path: '/' });
                setCookie('evaluationModelId', "", { path: '/' });
                history.push("/")
            } else {
                toast.error("Çıkış Yapılamadı.")
            }
        })
    }

    function handleSignIn() {
        setIsAuthenticaten(true)
    }

    function homeClick() {
        history.push("/HomePage/EvaluationModelList")
    }

    function goAddParameterPanel() {
        history.push("/HomePage/ParamaterAdd")
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
                        {isAuthenticaten ? <SignedIn signOut={handleSignOut} goParamaterPanel={goAddParameterPanel}/> : <SignedOut signIn={handleSignIn} />}
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
    )
}
