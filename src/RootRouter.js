
import React from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, withRouter } from 'react-router-dom';
import indexRoutes from './routes/index'

class RootRouter extends React.Component {

    render(){
        return(
            <Router >
            <Switch>
            { indexRoutes.map((prop, key) => {
                return (
                <Route
                    path={prop.path}
                    key={key}
                    component={(props) => <prop.component    {...props} />}
                    exact={prop.exact ? true : false}
                />
                );
            })}
            </Switch>
        </Router>
        )
    }
}



export default RootRouter;