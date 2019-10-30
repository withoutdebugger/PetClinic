

import React from 'react'
import {
    Row,
    FormGroup,
    Col,
    Button,
    Card,
    Input,
    CardBody
} from 'reactstrap';
import {Link} from 'react-router-dom';

import ContentWrapper from '../Layout/ContentWrapper';
import BootstrapTable from 'react-bootstrap-table-next';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Select from 'react-select';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

 const _exportPdf = () => {

     html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas);  // if you want see your screenshot in body.
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'pt');
        pdf.addImage(imgData, 'PNG', 0, 0);
      
        pdf.save("facturaPetClinic-"+new Date()+".pdf"); 
    });

 }


 
const columns = [
    // omit...
    {
        dataField: 'description',
        text: 'Descripción',
        footer: 'Cupón de Descuento: 10%'
    },
    {
        dataField: 'cant',
        text: 'Cant.',
        footer: 'IMPORTE TOTAL'
    },
    {
        dataField: 'monto',
        text: 'Monto',
        footer: '$22300'
    }];


function Facturation() {

    const products = [{ description: 'Castración', cant: 1, monto: '$22000' }, { description: 'Peluquería', cant: 1, monto: '$300' }]
    return (
        <ContentWrapper>
            <div className="content-heading">
                <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                    <div className="col col-lg-9 col-md-8 col-xl-10">Facturación
                           <small>Usted va a poder realizar la facturación.</small>
                    </div>
                    
                </Row>
            </div>
            <Card>
                <CardBody>
                    <Row>
                    <Col lg={3}>
                        <Link to={`/clientes`}>
                                <Button color="secondary" className="btn-labeled pull-right">
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span>Nuevo Cliente
                            </Button>
                            </Link>
                            </Col>
                            <Col lg={6}>
                               
                            </Col>
                            <Col lg={3}>
                                <Button color="dark" className="btn-labeled pull-right"  onClick={_exportPdf}>
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span>Descargar
                            </Button>
                            </Col>
                            </Row>
                            <br></br>
                            <br></br>
                            <Row>
                            <Col lg={6}>
                                <Button color="danger" className="btn-labeled pull-right">
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span>Agregar Item
                            </Button>
                            </Col>
                            </Row>
                            <br></br>
                            <br></br>
                            <div id="capture">
                    <Row>
                        
                        <Col lg={3}>
                            <FormGroup>
                                <label>Fecha</label>
                                <Datetime locale="es" value={new Date()} inputProps={{ className: 'form-control' }} timeFormat={false} name="date" placeholder="DD/MM/AAAA" />
                            </FormGroup>
                        </Col>
                        <Col lg={3}>
                            <label>Cliente</label>
                            <Select
                                name="clientId"
                                placeholder="Florencia Nodar"
                                loadingMessage="Cargando"
                            />
                        </Col>
                        <Col lg={3}>
                            <label>Método de Pago</label>
                            <Select
                                name="clientId"
                                placeholder="Tarjeta"
                                loadingMessage="Cargando"
                            />
                        </Col>
                        <Col lg={3}>
                            <label>Banco</label>
                            <Select
                                name="clientId"
                                placeholder="Santander Río"
                                loadingMessage="Cargando"
                            />
                        </Col>

                    </Row>
                    <Row>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Documento</label>
                                                <Input bsSize="sm" type="text"
                                                    value="35764575"/>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Dirección</label>
                                                <Input bsSize="sm" type="text"
                                                    value="Palá 772"/>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={3}>
                                            <FormGroup>
                                                <label>Teléfono</label>
                                                <Input bsSize="sm" type="text"
                                                    value="1234566777"/>
                                            </FormGroup>
                                        </Col>
                    </Row>
                    <BootstrapTable
                        keyField="id"
                        data={products}
                        columns={columns}
                    />
                    </div>
                </CardBody>

            </Card>
        </ContentWrapper>

    )

}

export default Facturation;