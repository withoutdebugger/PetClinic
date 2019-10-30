import React from 'react';
// //Redux
import { connect } from 'react-redux';
import { getAllClients, addClient } from '../../store/actions/clients.actions';
import { getAllCountries } from '../../store/actions/countries.actions';
import { getAllIdentificationType } from '../../store/actions/identificationType.actions';

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
import ListClient from './ListClient';
import 'react-toastify/dist/ReactToastify.css';
import FormValidator from '../Elements/FormValidator';
import Notify from '../Elements/Notify';
import { ToastContainer } from 'react-toastify';
import Table from '../Elements/Table';
import { textFilter } from 'react-bootstrap-table2-filter';
import Select from 'react-select';

class Clients extends React.Component {


    state = {
        dropdownOpen: false,
        fullName: '',
        birthDate: '',
        identificationNumber: '',
        address: '',
        addressBetween1: '',
        selectedOption: '',
        countryId: null,
        identificationTypeId:null,
        addressNumber: '',
        stateProvince: '',
        city: '',
        contactCellPhone: '',
        contactPhone: '',
        contactEmail: '',
        contactFacebook: '',
        contactTwitter: '',
        modal: false
    }


    componentDidMount() {
        this.props.getAllClients();
        this.props.getAllCountries();
        this.props.getAllIdentificationType();
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

    handleChangeSelectIdentification = (selectedOption) => {
        this.setState({ identificationTypeId: selectedOption.target.value });
    }
    
    handleChangeSelectCountry = (selectedOption) => {
        this.setState({ countryId: selectedOption.value });

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
            const client = {
                fullName: this.state.fullName,
                birthDate: this.state.birthDate,
                identificationNumber: this.state.identificationNumber,
                address: this.state.address,
                addressBetween1: this.state.addressBetween1,
                addressNumber: this.state.addressNumber,
                stateProvince: this.state.stateProvince,
                city: this.state.city,
                countryId: this.state.countryId,
                contactCellPhone: this.state.contactCellPhone,
                contactPhone: this.state.contactPhone,
                contactEmail: this.state.contactEmail,
                contactFacebook: this.state.contactFacebook,
                contactTwitter: this.state.contactTwitter

            }
            this.props.addClient(client).then(res => {
                Notify("Se agregó con éxito", "success", "bottom-right");
            }).catch((error) => {
                Notify("Ocurrió un error", "error", "bottom-right");
            });


            this.setState({
                modal: false
            })

        }

        e.preventDefault();
    }

    actionsFormatter = (cell, row) => <ListClient id={row} />
    formatDate(cell) {
        var d = (new Date(cell).toLocaleDateString());
        return d;
    }
    render() {
        const columns = [{
            dataField: 'fullName',
            text: 'Apellido y Nombre',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },
        {
            dataField: 'birthDate',
            text: 'Fecha de Nacimiento',
            filter: textFilter({ placeholder: 'Filtrar' }),
            formatter: this.formatDate,
            sort: true
        },  
        {
            dataField: 'identificationNumber',
            text: 'Número de Documento',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },{
            dataField: 'contactEmail',
            text: 'Email',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },
        {
            dataField: '',
            text: 'Acciones',
            formatter: this.actionsFormatter
        }];
        const { clients, countries,identificationType } = this.props;
        debugger;
        return (
            <ContentWrapper>
                <div>
                    <ToastContainer />
                    <div className="content-heading">
                        <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                            <div className="col col-lg-9 col-md-8 col-xl-10">Clientes
                            <small>Usted va a poder administrar los clientes del sistema.</small></div>
                            <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                                <Button color="danger" className="btn-labeled text-right" onClick={this.toggleModal}>
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Agregar
                            </Button>
                            </div>
                        </Row>
                    </div>
                    <Container fluid>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Nuevo Cliente</ModalHeader>
                            <form onSubmit={this.onSubmit} action="" >
                                <ModalBody>
                                    <Row>
                                        <Col lg={12}>
                                            <center><p><strong>Datos personales</strong></p></center>
                                        </Col>
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label>Apellido y Nombre</label>
                                                <Input bsSize="sm" type="text" name="fullName" placeholder="Ingresar apellido y nombre" invalid={this.hasError('fullName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.fullName} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                            <FormGroup>

                                                <label>Fecha de Nacimiento</label>
                                                <Input bsSize="sm" type="date" name="birthDate" placeholder="Ingresar fecha de nacimiento" invalid={this.hasError('birthDate', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.birthDate} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={5}>
                                            <label>Tipo Documento</label>
                                                <FormGroup>
                                              
                                                <select required  name="identificationTypeId" className="custom-select custom-select-sm" onChange={this.handleChangeSelectIdentification}>
                                            <option value="" >--Seleccione una opción--</option>
                                            {identificationType.map((pt, index) => (
                                            <option key={index} value={pt.value}>{pt.label}</option>
                                            ))}
                                            
                                        </select>
                                                {/* <Select
                                            name="identificationTypeId"
                                           defaultValue={this.state.identificationTypeId}
                                           loadingMessage="Cargando"
                                           placeholder="Ingresar"
                                            onChange={this.handleChangeSelectIdentification}
                                            options={identificationType}
                                            /> */}
                                                </FormGroup>
                                            </Col>
                                          
                                            <Col lg={7}>
                                            <label>Nº de documento</label>
                                                <FormGroup>
                                                    <Input bsSize="sm" type="number" name="identificationNumber" placeholder="Ingresar número de documento" invalid={this.hasError('fullName', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        value={this.state.identificationNumber} />
                                                    <span className="invalid-feedback">Campo requerido</span>

                                                </FormGroup>
                                            </Col>
                                            
                                        <Col lg={12}>
                                            <center><p><strong>Dirección</strong></p></center>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Dirección</label>
                                                <Input bsSize="sm" type="text" name="address" placeholder="Ingresar Dirección"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.address} />
                                            </FormGroup>
                                        </Col>

                                            <Col lg={6}>

                                            <FormGroup>
                                                <label>Entre Calles</label>
                                                <Input bsSize="sm" type="text" name="addressBetween1" placeholder=""
                                                    onChange={this.validateOnChange}
                                                    value={this.state.addressBetween1} />
                                            </FormGroup>
                                          
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                                <label>CP</label>
                                                <Input bsSize="sm" type="number" name="addressNumber" placeholder="Ingresar Código Postal"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.addressNumber} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                            <label>País</label>
                                             <Select
                                            name="countryId"
                                            placeholder="Ingresar"
                                            loadingMessage="Cargando"
                                           defaultValue={this.state.countryId}
                                            onChange={this.handleChangeSelectCountry}
                                            options={countries}
                                            />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                        <label>Provincia</label>
                                                <Input bsSize="" type="text" name="stateProvince" placeholder="Ingresar Provincia"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.stateProvince} />                                               
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                        <label>Localidad</label>
                                                <Input bsSize="sm" type="text" name="city" placeholder="Ingresar Localidad"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.city  } />                                               
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                            <center><p><strong>Información del contacto</strong></p></center>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Celular</label>
                                                <Input bsSize="sm" type="number" name="contactCellPhone" placeholder="Ingresar celular"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.contactCellPhone} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Teléfono Fijo</label>
                                                <Input bsSize="sm" type="number" name="contactPhone" placeholder="Ingresar teléfono fijo"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.contactPhone} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>

                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input bsSize="sm" type="email" name="contactEmail" placeholder="Ingresar correo" invalid={this.hasError('contact_email', 'required') || this.hasError('email', 'email')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required", "email"]'
                                                    value={this.state.contactEmail} />
                                                {this.hasError('email', 'required') && <span className="invalid-feedback">Campo requerido</span>}
                                                {this.hasError('email', 'email') && <span className="invalid-feedback">Correo con formato inválido</span>}
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>

                                            <center><p><strong>Redes Sociales</strong></p></center>
                                        </Col>

                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Facebook</label>
                                                <Input bsSize="sm" type="text" name="contactFacebook" placeholder="Ingresar facebook"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.contactFacebook} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Twitter</label>
                                                <Input bsSize="sm" type="text" name="contactTwitter" placeholder="Ingresar twitter"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.contactTwitter} />
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
                                <Table keyField='customerId' data={clients} columns={columns} />
                            </CardBody>
                        </Card>

                    </Container>
                </div>
            </ContentWrapper>
        );

    }
}

const mapStateToProps = state => ({
    clients: state.clients.clients,
    countries: state.countries.countries,
    identificationType: state.identificationType.identificationType
})
export default connect(mapStateToProps, { getAllClients, addClient,getAllCountries, getAllIdentificationType })(Clients);