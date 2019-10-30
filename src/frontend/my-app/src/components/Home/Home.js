import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
import * as CONST from '../Common/constants';
import 'jquery-knob/js/jquery.knob.js';
import $ from 'jquery';
import { Bar as BarChart } from 'react-chartjs-2';

import { BarHorizontal, Bar } from './Chart';

// Chartist
import 'matchmedia/index.js';
import 'chartist/dist/chartist.min.css';
import ChartistGraph from 'react-chartist';
class Home extends React.Component {

    componentDidMount() {
        // Knob
        let knobLoaderOptions1 = {
            width: '50%', // responsive
            displayInput: true,
            fgColor: CONST.APP_COLORS['info']
        };
        let knobLoaderOptions2 = {
            width: '50%', // responsive
            displayInput: true,
            fgColor: CONST.APP_COLORS['danger']
        };
        let knobLoaderOptions3 = {
            width: '50%', // responsive
            displayInput: true,
            fgColor: CONST.APP_COLORS['success']
        };
        let knobLoaderOptions4 = {
            width: '50%', // responsive
            displayInput: true,
            fgColor: CONST.APP_COLORS['warning']
        };
        $(this.refs.knobChart1).knob(knobLoaderOptions1);
        $(this.refs.knobChart2).knob(knobLoaderOptions2);
        $(this.refs.knobChart3).knob(knobLoaderOptions3);
        $(this.refs.knobChart4).knob(knobLoaderOptions4);
    }


    render() {
        return (
            <ContentWrapper>
                <Row>
                    <Col md={3} sm={6}>
                        <Card className="text-center">
                            <CardHeader>Profesionales</CardHeader>
                            <CardBody>
                                <input ref="knobChart4" type="text" defaultValue="10" />

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="text-center">
                            <CardHeader>Clientes</CardHeader>
                            <CardBody>
                                <input ref="knobChart1" type="text" defaultValue="80" />

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="text-center">
                            <CardHeader>Pacientes</CardHeader>
                            <CardBody>
                                <input ref="knobChart2" type="text" defaultValue="100" />

                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={3} sm={6}>
                        <Card className="text-center">
                            <CardHeader>Proveedores</CardHeader>
                            <CardBody>
                                <input ref="knobChart3" type="text" defaultValue="40" />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card>
                            <CardHeader>Bar Horizontal</CardHeader>
                            <CardBody>
                                <ChartistGraph data={BarHorizontal.data} options={BarHorizontal.options} type={'Bar'} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg={6}>
                        <Card>

                            <CardHeader>Bar Chart</CardHeader>
                            <CardBody>
                                <BarChart data={Bar.data} options={Bar.options} width={600} height={300} />
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </ContentWrapper>
        );
    }
}


const mapStateToProps = state => ({
})

export default connect(mapStateToProps, {})(Home);
