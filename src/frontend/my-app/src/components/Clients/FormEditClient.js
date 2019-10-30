import React from 'react';
import ContentWrapper from '../Layout/ContentWrapper';
import { Link } from 'react-router-dom';
import {
    Card,
    Container,
    CardBody,
    FormGroup,
    Input,
    Row,
    Col,
    Button
}
    from 'reactstrap';
import 'react-toastify/dist/ReactToastify.css';
import { getClientById, editClient, getAllClients } from '../../store/actions/clients.actions';
import { connect } from 'react-redux';
import FormValidator from '../Elements/FormValidator';
import Notify from '../Elements/Notify';
import Select from 'react-select';
import { getAllIdentificationType } from '../../store/actions/identificationType.actions';
import { getAllCountries } from '../../store/actions/countries.actions';


class FormEditClient extends React.Component {

    state = {
        fullName: '',
        birthDate: '',
        identificationNumber: '',
        address: '',
        addressBetween1: '',
        addressNumber: '',
        stateProvince: '',
        city: '',
        contactCellPhone: '',
        identificationTypeId: null,
        countryId: null,
        contactPhone: '',
        contactEmail: '',
        contactFacebook: '',
        contactTwitter: '',
        createdDate:''
    }

    changeLanguage = lng => {
        this.props.i18n.changeLanguage(lng);
    }

    getInfo = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    componentDidMount() {
        /*para acceder al id actual que pasás por parámetro
        this.props.match.params*/
        const { id } = this.props.match.params;
        this.props.getAllCountries();
        this.props.getAllIdentificationType();
        this.props.getClientById(id);
    }
    
    componentWillReceiveProps(nextProps) {
        const { history } = nextProps;
        //podés saber cuándo los props están llegando, si lo pones en componentdidmount, viene undefined
        const { fullName, birthDate, identificationTypeId, countryId, identificationNumber, address, addressBetween1, addressNumber, stateProvince,city,
            contactCellPhone, createdDate,contactPhone,contactEmail,contactFacebook,contactTwitter} = nextProps.client;
        this.setState({
        fullName,
        birthDate,
        identificationTypeId, 
        countryId,
        identificationNumber,
        address,
        createdDate,
        addressBetween1,
        addressNumber,
        stateProvince,
        city,
        contactCellPhone,
        contactPhone,
        contactEmail,
        contactFacebook,
        contactTwitter,
        history
        })
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
    handleChangeSelectIdentification = (selectedOption) => {
        this.setState({ identificationTypeId: selectedOption.target.value });

    }
    
    handleChangeSelectCountry = (selectedOption) => {
        this.setState({ countryId: selectedOption.value });
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
            const { id } = this.props.match.params;
            const client = {
                    customerId: id,
                    createdDate: this.state.createdDate,
                    fullName: this.state.fullName,
                    birthDate: this.state.birthDate,
                    identificationNumber: this.state.identificationNumber,
                    address: this.state.address,
                    countryId: this.state.countryId,
                    identificationTypeId: this.state.identificationTypeId,
                    addressBetween1: this.state.addressBetween1,
                    addressNumber: this.state.addressNumber,
                    stateProvince: this.state.stateProvince,
                    city: this.state.city,
                    contactCellPhone: this.state.contactCellPhone,
                    contactPhone: this.state.contactPhone,
                    contactEmail: this.state.contactEmail,
                    contactFacebook: this.state.contactFacebook,
                    contactTwitter: this.state.contactTwitter
            }
            this.props.editClient(client).then(res => {
                Notify("Se modificó con éxito", "success", "bottom-right");
            }).catch((error) => {
                Notify("Ocurrió un error", "error", "bottom-right");
            });
            this.props.history.push("/clientes");
        }

        e.preventDefault();
    }
    render() {
        const {identificationType, countries} = this.props;
        const { fullName, identificationTypeId, countryId, birthDate, identificationNumber, address, addressBetween1, addressNumber, stateProvince,city,
            contactCellPhone, contactPhone,contactEmail,contactFacebook,contactTwitter} = this.state;
            return (
            <ContentWrapper>
                <div className="content-heading">
                    <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                        <div className="col col-lg-9 col-md-8 col-xl-10">Editar Cliente {fullName}
                            <small>Usted va a poder editar clientes del sistema.</small>
                        </div>
                        <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                            <Link to={`/clientes`} >
                                <Button color="danger" className="btn-labeled text-right">
                                    <span className="btn-label"><i className="fa fa-arrow-circle-left"></i></span> Volver
                            </Button>
                            </Link>
                        </div>
                    </Row>
                </div>

                <Container>
                    <div className="row">
                        <div className="col-md-12">
                            <Card className="card-default">
                                    <CardBody>
                                        <form onSubmit={this.onSubmit}>
                                        <Row>
                                        <Col lg={12}>
                                            <center><p><strong>Datos personales</strong></p></center>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Apellido y Nombre</label>
                                                <Input bsSize="sm" type="text" name="fullName" placeholder="Ingresar apellido y nombre" invalid={this.hasError('fullName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    defaultValue={fullName} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>

                                                <label>Fecha de Nacimiento</label>
                                                <Input bsSize="sm" type="date" name="birthDate" placeholder="Ingresar fecha de nacimiento" invalid={this.hasError('birthDate', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    defaultValue={new Date(birthDate)} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={5}>
                                            <label>Tipo Documento</label>
                                                <FormGroup>
                                                <select value={identificationTypeId  || ""} name="identificationTypeId" className="custom-select custom-select-sm" onChange={this.handleChangeSelectIdentification}>
                                            <option value="" >--Seleccione una opción--</option>
                                            {identificationType.map((pt, index) => (
                                            <option key={index} value={pt.value}>{pt.label}</option>
                                            ))}
                                            
                                        </select>
                                                {/* <Select
                                            name="identificationTypeId"
                                           defaultValue={identificationTypeId}
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
                                                        defaultValue={identificationNumber} />
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
                                                    defaultValue={address} />
                                            </FormGroup>
                                        </Col>

                                            <Col lg={6}>

                                            <FormGroup>
                                                <label>Entre Calles</label>
                                                <Input bsSize="sm" type="text" name="addressBetween1" placeholder=""
                                                    onChange={this.validateOnChange}
                                                    defaultValue={addressBetween1} />
                                            </FormGroup>
                                          
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                                <label>CP</label>
                                                <Input bsSize="sm" type="number" name="addressNumber" placeholder="Ingresar Código Postal"
                                                    onChange={this.validateOnChange}
                                                    defaultValue={addressNumber} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                            <label>País</label>
                                            {countryId != null ? 
                                             <Select
                                            name="countryId"
                                            placeholder="Ingresar"
                                            loadingMessage="Cargando"
                                            defaultValue={countries.filter(x=>parseInt(x.value) === countryId)[0]}
                                            onChange={this.handleChangeSelectCountry}
                                            options={countries}
                                            /> : ""}
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                        <label>Provincia</label>
                                                <Input bsSize="sm" type="text" name="stateProvince" placeholder="Ingresar Provincia"
                                                    onChange={this.validateOnChange}
                                                    defaultValue={stateProvince} />                                               
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                        <FormGroup>
                                        <label>Localidad</label>
                                                <Input bsSize="sm" type="text" name="city" placeholder="Ingresar Localidad"
                                                    onChange={this.validateOnChange}
                                                    defaultValue={city} />                                               
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
                                                    defaultValue={contactCellPhone} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Teléfono Fijo</label>
                                                <Input bsSize="sm" type="number" name="contactPhone" placeholder="Ingresar teléfono fijo"
                                                    onChange={this.validateOnChange}
                                                    defaultValue={contactPhone} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>

                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input bsSize="sm" type="email" name="contactEmail" placeholder="Ingresar correo" invalid={this.hasError('contact_email', 'required') || this.hasError('email', 'email')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required", "email"]'
                                                    defaultValue={contactEmail} />
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
                                                    defaultValue={contactFacebook} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Twitter</label>
                                                <Input bsSize="sm" type="text" name="contactTwitter" placeholder="Ingresar twitter"
                                                    onChange={this.validateOnChange}
                                                    defaultValue={contactTwitter} />
                                            </FormGroup>
                                        </Col>
                                          
                                            <Col lg={12}>
                                                <button className="btn btn-sm btn-danger" type="submit">Guardar</button>
                                            </Col>
                                            </Row>
                                        </form>
                                    </CardBody>
                            </Card>
                        </div>
                    </div>
                </Container>
            </ContentWrapper>
        );
    }
}

const mapStateToProps = state => ({
    client: state.clients.client,
    clients: state.clients.clients,
    countries: state.countries.countries,
    identificationType: state.identificationType.identificationType
})

export default connect(mapStateToProps, { getClientById, editClient, getAllClients,getAllCountries, getAllIdentificationType })(FormEditClient);