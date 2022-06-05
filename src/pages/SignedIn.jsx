import React, { useEffect, useState } from 'react'
import { Dropdown, Icon, Menu } from 'semantic-ui-react'
import Cookies from 'js-cookie';
import UserService from '../services/UserService';

export default function SignedIn({signOut, goParamaterPanel}) {

    const [userName, setUserName] = useState('')

    useEffect(()=>{
        let userService = new UserService();
            userService.getUserBySessionUUID(Cookies.get("sessionId")).then((result) => {
              if(result.data.success){
                setUserName(result.data.data.userName)
              }
            });
      });

    return (
        <div>
            <Menu.Item>
                <Icon size='large' name='user'/>
                <Dropdown pointing="top left" text={userName}>
                    <Dropdown.Menu>
                        <Dropdown.Item text="Nasıl Kullanırım?" onClick={() => {window.open("https://youtu.be/mgo3VSZIm4Y")}} icon="info"/>
                        <Dropdown.Item onClick={goParamaterPanel} text="Add Parameter" icon="add"/>
                        <Dropdown.Item onClick={signOut} text="Çıkış Yap" icon="sign-out"/>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}
