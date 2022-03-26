import React, { useState } from "react";
import UserService from "../services/UserService";
import { useHistory } from "react-router-dom";

export default function Login() {

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

    const onLogin = function(event) {
      let userService = new UserService();
        userService.getByUserNameAndPassword(userName, password).then((result) => {
          if(result.data.success){
            history.push("/HomePage/EvaluationModelList");
          }else{
            alert(result.data.message);
          }
        });
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
            history.push("/HomePage/EvaluationModelList");
          }else{
            alert(result.data.message);
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
            <input onChange={event => setUserName(event.target.value)} type="text" maxlength="20" required/> 
          </div>
          <div class="form__input-group">
            <label for="pass">Password: </label>
            <input onChange={event => setPassword(event.target.value)} type="password" maxlength="20" required/> 
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
           <input onChange={event => setUserName(event.target.value)} type="text" maxlength="20" required/>
         </div>
          <div class="form__input-group">
            <label for="pass">Password: </label>
            <input onChange={event => setPassword(event.target.value)} type="password" maxlength="20" required/> 
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

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });
    
    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });
}


