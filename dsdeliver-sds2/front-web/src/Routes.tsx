import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Footer from './Footer';

import Home from './Home';
import Orders from './Orders';

function Routes() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/orders" component={Orders} /> 
      </Switch>
      <Footer /> 
    </BrowserRouter>
  )
}

export default Routes;

