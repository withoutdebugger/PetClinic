import React from 'react';
// //Redux
import { connect } from 'react-redux';
import { getAllPatients, addPatient} from '../../store/actions/patients.actions';

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
import ListPatients from './ListPatients';
import 'react-toastify/dist/ReactToastify.css';
import FormValidator from '../Elements/FormValidator';
import Notify from '../Elements/Notify';
import { ToastContainer } from 'react-toastify';
import Table from '../Elements/Table';
import { textFilter } from 'react-bootstrap-table2-filter';

class Patients extends React.Component {


    state = {
        dropdownOpen: false,
        fullName: '',
        birthDate: '',
        modal: false
    }


    componentDidMount() {
        this.props.getAllPatients();
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
        const inputs = [...form.elements].slice(0, 1);
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            ...this.state,
            errors
        });

        if (!hasError) {
            const patient = {
                fullName: this.state.fullName,
                birthDate: this.state.birthDate

            }
            this.props.addPatient(patient).then(res => {
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

    actionsFormatter = (cell, row) => <ListPatients id={row} />
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
            dataField: '',
            text: 'Acciones',
            formatter: this.actionsFormatter
        }];
        const { patients } = this.props;
        return (
            <ContentWrapper>
                <div>
                    <ToastContainer />
                    <div className="content-heading">
                        <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                            <div className="col col-lg-9 col-md-8 col-xl-10">Pacientes
                            <small>Usted va a poder administrar los pacientes del sistema.</small></div>
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
                                                <Input bsSize="sm" type="date" name="birthDate" placeholder="Ingresar fecha de nacimiento"
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.birthDate} />

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
                                <Table keyField='patientId' data={patients} columns={columns} />
                            </CardBody>
                        </Card>

                    </Container>
                </div>
            </ContentWrapper>
        );

    }
}

const mapStateToProps = state => ({
    patients: state.patients.patients
})
export default connect(mapStateToProps, { getAllPatients, addPatient })(Patients);