import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import { connect } from 'react-redux';

class SidebarUserBlock extends Component {

    state = {
        showUserBlock: false
    }

    componentWillReceiveProps(newProps) {
        if (newProps.showUserBlock !== this.props.showUserBlock) {
            this.setState({ showUserBlock: newProps.showUserBlock })
        }
    }

    render() {
        return (
            <Collapse id="user-block" isOpen={ this.state.showUserBlock }>
                <div>
                    <div className="item user-block">
                       {/* User picture */}
                       <div className="user-block-picture">
                       <div className="user-block-status">
            <button type="button"
                className="btn btn-danger btn-circle btn-xl">{sessionStorage.getItem("userName")[0].toUpperCase()}{sessionStorage.getItem("userName")[1].toUpperCase()}</button>
                <div className="row">
                    <div className="circle bg-success circle-lg"></div>
            <small>En línea</small>
        </div>
        </div>
                       </div>
                       {/* Name and Job */}
                       <div className="user-block-info">
                          <span className="user-block-name">{sessionStorage.getItem("userName")}</span>
                       </div>
                    </div>
                </div>
            </Collapse>
        )
    }
}

SidebarUserBlock.propTypes = {
    showUserBlock: PropTypes.bool
};

const mapStateToProps = state => ({ showUserBlock: state.settings.showUserBlock })

export default connect(
    mapStateToProps
)(SidebarUserBlock);