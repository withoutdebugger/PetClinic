import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../store/actions/actions';
import HeaderRun from './Header.run'

class Header extends Component {

    componentDidMount() {
        HeaderRun();
    }

    toggleUserblock = e => {
        e.preventDefault();
        this.props.actions.toggleSetting('showUserBlock');
    }
    toggleOffsidebar = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('offsidebarOpen');
    }
    toggleCollapsed = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('isCollapsed');
        this.resize()
    }

    toggleAside = e => {
        e.preventDefault()
        this.props.actions.toggleSetting('asideToggled');
    }

    logout() {
        window.location.replace("/logout");
    }

    resize() {
        // all IE friendly dispatchEvent
        var evt = document.createEvent('UIEvents');
        evt.initUIEvent('resize', true, false, window, 0);
        window.dispatchEvent(evt);
        // modern dispatchEvent way
        // window.dispatchEvent(new Event('resize'));
    }

    render() {
        return (
            <header className="topnavbar-wrapper">
                { /* START Top Navbar */}
                <nav className="navbar topnavbar">
                    { /* START navbar header */}
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#/">
                            <div className="brand-logo hide-from-cel">
                                <img className="img-fluid " src="img/logo.png" alt="App Logo" />
                            </div>
                            <div className="brand-logo-collapsed">
                                <img className="img-fluid" src="img/logo-single.png" alt="App Logo" />
                            </div>
                        </a>
                    </div>
                    { /* END navbar header */}

                    { /* START Left navbar */}
                    <ul className="navbar-nav mr-auto flex-row">
                        <li className="nav-item">
                            { /* Button used to collapse the left sidebar. Only visible on tablet and desktops */}
                            <a href="" className="nav-link d-none d-md-block d-lg-block d-xl-block" onClick={this.toggleCollapsed}>
                                <em className="fas fa-bars"></em>
                            </a>
                            { /* Button to show/hide the sidebar on mobile. Visible on mobile only. */}
                            <a href="" className="nav-link sidebar-toggle d-md-none" onClick={this.toggleAside}>
                                <em className="fas fa-bars"></em>
                            </a>
                        </li>
                        { /* START User avatar toggle */}
                        <li className="nav-item d-none d-md-block">
                            <a className="nav-link" onClick={this.toggleUserblock}>
                                <em className="icon-user"></em>
                            </a>
                        </li>
                        { /* END User avatar toggle */}
                    </ul>
                    { /* END Left navbar */}
                    { /* START Right Navbar */}
                    <ul className="navbar-nav flex-row">
                        { /* Search icon */}
                        <li className="nav-item" title="Salir">
                            <a className="nav-link" onClick={this.logout}>
                                <em className="icon-logout"></em>
                            </a>
                        </li>

                    </ul>
                    { /* END Right Navbar */}
                </nav>
                { /* END Top Navbar */}
            </header>
        );
    }

}

Header.propTypes = {
    actions: PropTypes.object,
    settings: PropTypes.object
};

const mapStateToProps = state => ({ settings: state.settings })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(actions, dispatch) })

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);