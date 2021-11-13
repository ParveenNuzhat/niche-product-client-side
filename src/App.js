import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Header from './Components/Header/Header';
import NotFound from './Components/NotFound/NotFound';
import Models from './Components/Models/Models';
import Purchase from './Components/Purchase/Purchase';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Footer from './Components/Footer/Footer';
import Dashboard from './Components/Dashboard/Dashboard';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route exact path='/'>
            <Home></Home>
          </Route>
          <Route exact path='/home'>
            <Home></Home>
          </Route>
          <Route exact path='/models'>
            <Models></Models>
          </Route>
          <Route exact path='/register'>
            <Register></Register>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route path='/dashboard'>
            <Dashboard></Dashboard>
          </Route>
          <PrivateRoute exact path='/purchase/:carId'>
            <Purchase></Purchase>
          </PrivateRoute>
          <Route exact path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
