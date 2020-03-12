import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form'
import fire from './utils/firebase';
import './App.css';

function SignupView(){
  const { register, errors, handleSubmit } = useForm()
  const onSubmit = data => {
    console.log(data)
    fire.auth().createUserWithEmailAndPassword(data.email, data.password)
    .then( u => console.log(u))
    .catch(err => console.error(err))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <h1>Sign up</h1>
    <label>First Name:</label>
    <input name="firstName" ref={register({ required: true, maxLength: 20 })}  />
    {errors.firstName && <p>This is required</p>}
    <label>Last Name:</label>
    <input name="lastName" ref={register({ required: true, maxLength: 20 })}  />
    {errors.lastName && <p>{errors.lastName.message}</p>}
    <label>Gender:</label>
    <select name="gender" ref={register}>
      <option value="male">male</option>
      <option value="female">female</option>
    </select>
    <label>Email:</label>
    <input name="email" ref={register({ required:true })} />
    {errors.email && <p>{errors.email.message}</p>}
    <label>Password:</label>
    <input name="password" ref={register({ required: true })} type="password" />
    {errors.password && <p>{errors.password.message}</p>}
    <input type="submit" />
  </form>
  );
}

function LoginView({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <input
        onChange={event => {
          setEmail(event.target.value);
        }}
      />
      <input
        type="password"
        onChange={event => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={() => {
          onClick(email, password);
        }}
      >
        Login
      </button>
    </div>
  );
}
function LogoutView({ onClick }) {
  return (
    <div>
      <span>You are logged in</span>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}

function onAuthStateChange(callback) {
  fire.auth().onAuthStateChanged(user => {
    if (user) {
      console.log(user.email)
      callback({loggedIn: true});
    } else {
      callback({loggedIn: false});
    }
  });
}

function login(username, password) {
  fire.auth().signInWithEmailAndPassword(username, password);
}

function logout() {
  fire.auth().signOut();
}

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });
  
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const requestLogin = (username, password) => {
    login(username, password);
  };
  
  const requestLogout = () => {
    logout();
  }
   if(!user.loggedIn){
     return null;
   }
  return (
    <div className="App">
      <div className="Homescreen">
      Welcome to Household Inventory App
      { user.loggedIn ? <LogoutView onClick={requestLogout} /> : ''}
    {user.loggedIn ? '': <SignupView />}  
      </div>
    </div>
  );
}