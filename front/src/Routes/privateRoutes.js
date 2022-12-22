import React from "react";
import { Route, Redirect } from 'react-router-dom';

function RoutesPrivate({ render, ...rest }) {
    const Component = render
    return (

        <Route {...rest}
            render={({ props, location }) =>
                localStorage.getItem('auth_token') ?
                    (<Component {...props} />) :
                    (<Redirect to={{ pathname: "/register", state: { from: location } }} />)
            }

        />
    );
}

export default RoutesPrivate