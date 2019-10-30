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
import { connect } from 'react-redux';
import FormValidator from '../Elements/FormValidator';
import Select from 'react-select';
import { getAllCountries } from '../../store/actions/countries.actions';


class FormEditSupplier extends React.Component {

    state = {
        businessName: '',
        address: '',
        addressBetween1: '',
        addressNumber: '',
        stateProvince: '',
        city: '',
        contactCellPhone: '',
        countryId: null,
        contactPhone: '',
        contactEmail: '',
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
       // const { id } = this.props.match.params;
        this.props.getAllCountries();
    }
    
    componentWillReceiveProps(nextProps) {
        const { history } = nextProps;
        const { businessName, countryId, address, addressBetween1, addressNumber, stateProvince,city,
            contactCellPhone, createdDate,contactPhone,contactEmail} = nextProps.client;
        this.setState({
        businessName,
        countryId,
        address,
        createdDate,
        addressBetween1,
        addressNumber,
        stateProvince,
        city,
        contactCellPhone,
        contactPhone,
        contactEmail,
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
            const supplier = {
                    customerId: id,
                    createdDate: this.state.createdDate,
                    businessName: this.state.businessName,
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
            this.props.history.push("/proveedores");
        }

        e.preventDefault();
    }
    render() {
        const { countries} = this.props;
        const { fullName, countryId, address, addressBetween1,businessName, addressNumber, stateProvince,city,
            contactCellPhone, contactPhone,contactEmail} = this.state;
            return (
            <ContentWrapper>
                <div className="content-heading">
                    <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                        <div className="col col-lg-9 col-md-8 col-xl-10">Editar Proveedor {fullName}
                            <small>Usted va a poder editar los proveedores del sistema.</small>
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
                                                <label>Nombre</label>
                                                <Input bsSize="sm" type="text" name="businessName" placeholder="Ingresar nombre" invalid={this.hasError('businessName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    defaultValue={businessName} />
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
    countries: state.countries.countries
})

export default connect(mapStateToProps, { getAllCountries })(FormEditSupplier);