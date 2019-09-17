import React from 'react';
import './App.css';
import ProjectsPage from './projects/ProjectsPage';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch
} from 'react-router-dom';
import HomePage from './home/HomePage';

const App: React.FC = () => {
  return (
    <Router>
      <header className="sticky">
        <a href="#" className="logo">
          <img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
        </a>
        <NavLink to="/" exact className="button rounded">
          <span className="icon-home"></span>
          Home
        </NavLink>
        <NavLink to="/projects/" className="button rounded">
          Projects
        </NavLink>
      </header>
      <div className="container">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/projects" exact component={ProjectsPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
