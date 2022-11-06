import { Routes, Route } from "react-router-dom";
import Header from './components/header/header';
import './App.css';
import Users from "./components/users/Users";
import Profile from './components/profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import Login from './components/login/login';
import { Container } from '@mui/material'

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth='md'>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="dialogs/*" element={<Dialogs />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="login/" element={<Login />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
