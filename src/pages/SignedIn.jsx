import React from 'react'
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react'
import Cookies from 'js-cookie';

export default function SignedIn({signOut, goParamaterPanel}) {

    return (
        <div>
            <Menu.Item>
                <Icon size='large' name='user'/>
                <Dropdown pointing="top left" text={Cookies.get("UserName")}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={goParamaterPanel} text="Add Parameter" icon="add"/>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
