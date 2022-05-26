import React, { useEffect, useState } from "react";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export default function Login() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [cookie, setCookie] = useCookies(['user']);

  const history = useHistory()

  useEffect(()=>{
    let userService = new UserService();
        userService.getUserBySessionUUID(Cookies.get("sessionId")).then((result) => {
          if(result.data.success){
            history.push("/HomePage/EvaluationModelList");
          }
        });
  }, []);

    const onLogin = function(event) {
      let userService = new UserService();
        userService.getByUserNameAndPassword(userName, password).then((result) => {
          if(result.data.success){
            userService.addSession(result.data.data.userId).then((sessionResult) => {
                if (sessionResult.data.success) {
                   setCookie('sessionId', sessionResult.data.data.sessionUUID, { path: '/' });
                   history.push("/HomePage/EvaluationModelList");
                }
            })
          }else{
            toast.error(result.data.message);
          }
        });
        if(event !== undefined)
          event.preventDefault();
    };

    const onRegister = function(event) {
      let userService = new UserService();
        let data = {
            userName: userName,
            password: password
        }
        userService.addUser(data).then((result) => {
          if(result.data.success){
            onLogin();
          }else{
            toast.error(result.data.message);
          }
        });
        event.preventDefault();
    };

  return (
    <div class="container" id="container">
      <div class="form-container sign-in-container">
        <form onSubmit={onLogin} class="form" id="login">
          <h1 class="form__title">Login</h1>
          <div class="form__input-group">
            <label for="username">Username: </label>
            <input onChange={event => setUserName(event.target.value)} type="text" id="text" maxlength="20" required/> 
          </div>
          <div class="form__input-group">
            <label for="pass">Password: </label>
            <input onChange={event => setPassword(event.target.value)} type="password" id="password" maxlength="20" required/> 
          </div>
          <div>
            <button type="submit" class="form__button">Submit</button>
          </div>
       </form>
      </div>
      
     <div class="form-container sign-up-container">
       <form onSubmit={onRegister} class="form" id="register">
         <h1 class="form__title">Register</h1>
         <div class="form__input-group">
           <label for="username"> Username: </label>
           <input onChange={event => setUserName(event.target.value)} type="text" id="text2" maxlength="20" required/>
         </div>
          <div class="form__input-group">
            <label for="pass">Password: </label>
            <input onChange={event => setPassword(event.target.value)} type="password" id="password2" maxlength="20" required/> 
          </div>
         <button class="form__button" type="submit">Submit</button>
       </form>
     </div> 
      
     <div class="overlay-container">
          <div class="overlay">
              <div class="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>Please login with your personal info</p>
                  <button  class="ghost" id="signIn">Sign In</button>
              </div>
              <div class="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button class="ghost" id="signUp" onMouseMove={loginScript}>Sign Up</button> 
              </div>
          </div>
      </div>
   </div>
  )
}

function loginScript(){
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    const name = document.getElementById('text');
    const pass = document.getElementById('password');
    const name2 = document.getElementById('text2');
    const pass2 = document.getElementById('password2');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
      name2.value = "";
      pass2.value = "";
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
        name.value = "";
        pass.value = "";
    });
}


