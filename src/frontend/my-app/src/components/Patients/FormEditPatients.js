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
import { getPatientById, editPatient, getAllPatients } from '../../store/actions/patients.actions';
import { connect } from 'react-redux';
import FormValidator from '../Elements/FormValidator';
import Notify from '../Elements/Notify';
require('moment/locale/es');

class FormEditPatients extends React.Component {

    state = {
        patientId:'',
        fullName: '',
        birthDate: ''
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
        this.props.getPatientById(id);
    }
    
    componentWillReceiveProps(nextProps) {
        const { history } = nextProps;
        //podés saber cuándo los props están llegando, si lo pones en componentdidmount, viene undefined
        const { fullName, birthDate} = nextProps.patient;
        this.setState({
        fullName,
        birthDate,
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

    onSubmit = e => {
        const form = e.target;
        const inputs = [...form.elements].slice(0, 2);
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            ...this.state,
            errors
        });

        if (!hasError) {
            const { id } = this.props.match.params;
            const patient = {
                    patientId: id,
                    fullName: this.state.fullName,
                    birthDate: this.state.birthDate               
            }
            this.props.editPatient(patient).then(res => {
                Notify("Se modificó con éxito", "success", "bottom-right");
            }).catch((error) => {
                Notify("Ocurrió un error", "error", "bottom-right");
            });
            this.props.history.push("/pacientes");
        }

        e.preventDefault();
    }
    render() {
        const { fullName, birthDate } = this.state;
        debugger;
         
            return (
            <ContentWrapper>
                <div className="content-heading">
                    <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                        <div className="col col-lg-9 col-md-8 col-xl-10">Editar Paciente {fullName}
                            <small>Usted va a poder editar paciente del sistema.</small>
                        </div>
                        <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                            <Link to={`/pacientes`} >
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
                                                    defaultValue={birthDate} />
                                                <span className="invalid-feedback">Campo requerido</span>
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
    patient: state.patients.patient,
    patients: state.patients.patients
})

export default connect(mapStateToProps, { getPatientById, editPatient, getAllPatients })(FormEditPatients);