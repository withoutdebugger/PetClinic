import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* loader component for Suspense*/
import PageLoader from './components/Common/PageLoader';

import Base from './components/Layout/Base';
import BasePage from './components/Layout/BasePage';
import { PrivateRoute } from './privateRoute';


/* Used to render a lazy component with react-router */
const waitFor = Tag => props => <Tag {...props} />;

const Home = lazy(() => import('./components/Home/Home'));
const Users = lazy(() => import('./components/Users/Users'));
const FormEdit = lazy(() => import('./components/Users/FormEdit'));
const Logout = lazy(() => import('./auth/logout'));
const Callback = lazy(() => import('./auth/callback'));
const SilentRenew = lazy(() => import('./auth/silentRenew'));
const  NotFound = lazy(()=> import ('./components/Pages/NotFound'));
// List of routes that uses the page layout
// listed here to Switch between layouts
// depending on the current pathname
const listofPages = [
    '/logout',
    '/callback/',
    '/notfound',
    '/silentrenew'
];

const Routes = ({ location }) => {
    const currentKey = location.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 600000000000000000000000000000000 };
    const animationName = 'rag-fadeIn'
    var sesionStorage = sessionStorage.getItem("id_token");
    if (listofPages.indexOf(location.pathname) > -1  || sesionStorage == null) {
        return (
            // Page Layout component wrapper
            <BasePage>
                <Suspense fallback={<PageLoader />}>
                    <Switch location={location}>
                        <Route path="/silentrenew" component={waitFor(SilentRenew)} />
                        <Route path="/logout" component={waitFor(Logout)} />
                        <Route path="/notfound" component={waitFor(NotFound)} />
                        <Route path="/callback" component={waitFor(Callback)} />
                        <PrivateRoute exact path="/" component={waitFor(Home)} />
                        <Redirect to="/home" />
                    </Switch>
                </Suspense>
            </BasePage>
        )
    }
    else {
        return (
            <Base >
                <TransitionGroup>
                    <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={true}>
                        <div>
                            <Suspense fallback={<PageLoader />}>
                                <Switch location={location}>                                
                                <PrivateRoute exact={true} path="/home" component={Home} />
                                <PrivateRoute exact={true} path="/usuarios" component={Users} />
                                <PrivateRoute exact={true} path="/usuarios/editar/:id" component={FormEdit} />
                                <Redirect to="/home" />
                                </Switch>
                            </Suspense>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Base>
        )
    }
}

export default withRouter(Routes);
