import React from 'react'
import { Dropdown, Icon, Image, Menu } from 'semantic-ui-react'

export default function SignedIn({signOut}) {
    return (
        <div>
            <Menu.Item>
                <Icon size='large' name='user'/>
                <Dropdown pointing="top left" text="Bekir Geriş">
                    <Dropdown.Menu>
                        <Dropdown.Item text="bilgilerim" icon="info"/>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
