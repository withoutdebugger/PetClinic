
import React, { useState } from 'react'
import {
    Row,
    Card,
    Col,
    CardBody,
    FormGroup,
    ModalFooter,
    Modal,
    Input,
    ModalBody,
    ModalHeader,
    Button
} from 'reactstrap';
import ContentWrapper from '../Layout/ContentWrapper';
import Table from '../Elements/Table';
import { textFilter } from 'react-bootstrap-table2-filter';
import Select from 'react-select';

function Stock() {
    const columns = [{
        dataField: 'productName',
        text: 'Producto',
        filter: textFilter({ placeholder: 'Filtrar' }),
        sort: true
    },
    {
        dataField: 'cantMin',
        text: 'Cantidad Min.',
        sort: true
    }, 
    {
        dataField: 'cantMax',
        text: 'Cantidad Max.',
        sort: true
    },  
    {
        dataField: 'reposition',
        text: 'Punto reposición',
        sort: true
    }, 
    {
        dataField: '',
        text: 'Estado',
    }];

    const [modal, setModal] = useState(false);

    return (<ContentWrapper>
        <div className="content-heading">
            <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                <div className="col col-lg-9 col-md-8 col-xl-10">Stock
                   <small>Usted va a poder administrar el stock de la veterinaria.</small>
                </div>
                <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                                <Button color="danger" className="btn-labeled text-right" onClick={()=>setModal(!modal)}>
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Inventario
                            </Button>
                            </div>
            </Row>
        </div>
        <Card>
            <CardBody>
                <Table keyField='stockId' data={[]} columns={columns} />
            </CardBody>
        </Card>
        <Modal isOpen={modal} toggle={()=>setModal(!modal)}>
                            <ModalHeader toggle={()=>setModal(!modal)}>Carga Inventario</ModalHeader>
                            <form action="" >
                                <ModalBody>
                                    <Row>
                                   
                                    <Col lg={6}>
                                        <FormGroup>
                                            <label>Producto</label>
                                             <Select
                                            name="customerId"
                                            placeholder="Ingresar"
                                            loadingMessage="Cargando"
                                           defaultValue={"Ingresar Producto"}
                                            />
                                            </FormGroup>
                                        </Col>  
                                        <Col lg={6}>
                                        <FormGroup>
                                            <label>Cantidad</label>
                                            <Input type="number"></Input>
                                            </FormGroup>
                                        </Col>
                                     
                                     
                                    </Row>
                                    <ModalFooter>
                                        <button type="submit" className="btn btn-danger">Guardar</button>
                                        <Button color="secondary" onClick={()=>setModal(!modal)}>Cancelar</Button>
                                    </ModalFooter>
                                </ModalBody>
                            </form>
                        </Modal>
    </ContentWrapper>)

}
export default Stock;