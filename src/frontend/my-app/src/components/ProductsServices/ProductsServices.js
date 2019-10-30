import React from 'react';
import { connect } from 'react-redux';

import ContentWrapper from '../Layout/ContentWrapper';
import {
    Container,
    CardBody,
    Button,
    Modal,
    Row,
    Card,
    Col,
    ModalHeader,
    ModalBody,
    FormGroup,
    Input,
    ModalFooter
} from 'reactstrap';
import ListProductsServices from './ListProductsServices';
import 'react-toastify/dist/ReactToastify.css';
import FormValidator from '../Elements/FormValidator';
import { ToastContainer } from 'react-toastify';
import Table from '../Elements/Table';
import { textFilter } from 'react-bootstrap-table2-filter';

class ProductsServices extends React.Component {


    state = {
        dropdownOpen: false,
        productName: '',
        description: '',
        productServiceCategoryId: null,
        selectedOption: '',
        price: '',
        brand: '',
        manageInventory: '',
        modal: false
    }


    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    toggleModal = () => {
        this.setState({
            modal: !this.state.modal
        });
    }


    handleChangeSelectCountry = (selectedOption) => {
        this.setState({ productServiceCategoryId: selectedOption.value });

    }
    validateOnChange = event => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;


        const result = FormValidator.validate(input);

        this.setState({

            ...this.state,
            [input.name]: value,
            errors: {
                ...this.state.errors,
                [input.name]: result
            }

        });

    }
    hasError = (inputName, method) => {
        return this.state &&
            this.state.errors &&
            this.state.errors[inputName] &&
            this.state.errors[inputName][method]
    }
    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].slice(0, 4);
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            ...this.state,
            errors
        });

        if (!hasError) {
            const productService = {
                productName: this.state.productName,
                description: this.state.description,
                productServiceCategoryId: this.state.productServiceCategoryId,
                price: this.state.price,
                brand: this.state.brand,
                manageInventory: this.state.manageInventory
            }


            this.setState({
                modal: false
            })

        }

        e.preventDefault();
    }

    actionsFormatter = (cell, row) => <ListProductsServices id={row} />
    formatDate(cell) {
        var d = (new Date(cell).toLocaleDateString());
        return d;
    }
    render() {
        const columns = [{
            dataField: 'productName',
            text: 'Nombre de Producto',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, {
            dataField: 'manageInventory',
            text: 'Tipo',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, {
            dataField: 'description',
            text: 'Descripción',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, {
            dataField: 'brand',
            text: 'Marca',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, {
            dataField: 'price',
            text: 'Precio',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },
        {
            dataField: '',
            text: 'Acciones',
            formatter: this.actionsFormatter
        }];
        return (
            <ContentWrapper>
                <div>
                    <ToastContainer />
                    <div className="content-heading">
                        <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                            <div className="col col-lg-9 col-md-8 col-xl-10">Productos/Servicios
                            <small>Usted va a poder administrar los productos y servicios del sistema.</small></div>
                            <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                                <Button color="danger" className="btn-labeled text-right" onClick={this.toggleModal}>
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Agregar
                            </Button>
                            </div>
                        </Row>
                    </div>
                    <Container fluid>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Nuevo Producto o Servicio</ModalHeader>
                            <form onSubmit={this.onSubmit} action="" >
                                <ModalBody>
                                    <Row>
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label>Nombre Producto</label>
                                                <Input bsSize="sm" type="text" name="productName" placeholder="Ingresar nombre" invalid={this.hasError('productName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.productName} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col>
                                            <label>Tipo</label>

                                            <FormGroup>
                                                <Row col={12}>
                                                    <Col col={12}>
                                                        <div className="c-radio">
                                                            <label>
                                                                <Input type="radio" id="inlineradio1" name="a" defaultChecked="true" defaultValue="true" />
                                                                <span className="fa fa-circle"></span>Producto</label>
                                                        </div>

                                                        <div className="c-radio">
                                                            <label>
                                                                <Input type="radio" id="inlineradio1" name="a" defaultValue="false" />
                                                                <span className="fa fa-circle"></span>Servicio</label>
                                                        </div>
                                                    </Col>

                                                </Row>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label>Descripción</label>
                                                <Input bsSize="sm" type="textarea" name="description" placeholder="Ingresar descripción"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.description} />
                                            </FormGroup>
                                        </Col>

                                        <Col lg={6}>

                                            <FormGroup>
                                                <label>Marca</label>
                                                <Input bsSize="sm" type="text" name="brand" placeholder="Ingresar marca"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.brand} />
                                            </FormGroup>

                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Precio</label>
                                                <Input bsSize="sm" type="number" name="price" placeholder="Ingresar precio"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.price} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <ModalFooter>
                                        <button type="submit" className="btn btn-danger">Guardar</button>
                                        <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
                                    </ModalFooter>
                                </ModalBody>
                            </form>
                        </Modal>
                        <Card>
                            <CardBody>
                                <Table keyField='productServiceId' data={[]} columns={columns} />
                            </CardBody>
                        </Card>

                    </Container>
                </div>
            </ContentWrapper>
        );

    }
}

const mapStateToProps = state => ({
})
export default connect(mapStateToProps, {})(ProductsServices);