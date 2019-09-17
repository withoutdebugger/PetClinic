import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col} from 'reactstrap';
import { connect } from 'react-redux';
import { getRolesByUserId } from '../../store/actions/roles.actions';
import { getUserById } from '../../store/actions/users.actions';

class Home extends React.Component {

    
    render() {
        return (
            <ContentWrapper>
                <Row>
                    <Col xs={12} className="text-center">
                        <h3 className="text-thin">Bienvenidos al BackOffice de Pet Clinic</h3>
                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}


const mapStateToProps = state => ({
    roles: state.roles.rolesUserId,
    user: state.users.user
})

export default connect(mapStateToProps, { getRolesByUserId,getUserById })(Home);
