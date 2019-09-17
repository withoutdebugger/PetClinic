/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.3
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
// App Routes
import Routes from './Routes';
import { AuthProvider } from "./auth/providers/authProvider";

// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'
import 'react-dual-listbox/lib/react-dual-listbox.css';


class App extends Component {
  render() {

    // specify base href from env varible 'PUBLIC_URL'
    // use only if application isn't served from the root
    // for development it is forced to root only
    /* global PUBLIC_URL */
    const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

    return (

      <AuthProvider>
        <BrowserRouter basename={basename}>
            <Routes />
        </BrowserRouter>
      </AuthProvider>
    );

  }
}

export default App;
