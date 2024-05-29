import { useState } from 'react';
import './LoginForm.css';

function LoginForm({ onLogin }) {
 
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if(username) { 
      onLogin(username); 
    }
  }

  return (
    <div className="login">
      <div className="app-title">Flashcard Study System</div>
			<form className="login__form" action="#/login" onSubmit={onSubmit}>
				<label className="login__label" htmlFor="username-input">
					Username: 
				</label>
				<input
					id="login__username"
					className="login__username"
					value={username}
					onChange={onChange}
      			/>
				<button className="login__button" type="submit">Login</button>
			</form>
			
		</div>
  );
}

export default LoginForm;