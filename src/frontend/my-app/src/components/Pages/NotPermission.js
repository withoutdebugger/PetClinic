import React from 'react';
import {
    Row,
    Col
} from 'reactstrap';

const NotPermission = () => (
    <Row>
        <Col xs={12} className="text-center">
            <div className="text-center mb-4">
                <div className="text-lg mb-3">401</div>
                <p className="lead m-0">No Autorizado</p>
                <p>Usted no tiene permisos para ingresar a éste módulo.</p>
            </div>
        </Col>
    </Row>
)

export default NotPermission;

