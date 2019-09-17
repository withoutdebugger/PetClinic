import React from 'react';
// //Redux
import { connect } from 'react-redux';
import { getAllUsers, addUser } from './../../store/actions/users.actions';
import { getAllRoles } from './../../store/actions/roles.actions';
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
import ListUser from './ListUser';
import 'react-toastify/dist/ReactToastify.css';
import DualListBox from 'react-dual-listbox';
import FormValidator from '../Elements/FormValidator';
import Notify from '../../components/Elements/Notify';
import { ToastContainer } from 'react-toastify';
import Table from '../Elements/Table';
import { textFilter } from 'react-bootstrap-table2-filter';


class Users extends React.Component {


    state = {
        selected: [],
        options: [],
        dropdownOpen: false,
        rol: '',
        id: null,
        username: '',
        email: '',
        passwordHash: '',
        lastName: '',
        firstName: '',
        phoneNumber: '',
        cellPhoneNumber: '',
        modal: false
    }


    componentDidMount() {
        this.props.getAllUsers();
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    changeDualList = selected => {
        this.setState({ selected })
    }

    toggleModal = () => {
        this.setState({
            selected: []
        })
        this.props.getAllRoles();
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
        const inputs = [...form.elements].slice(0, 7);
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            ...this.state,
            errors
        });

        if (!hasError) {
            const user = {
                User: {
                    username: this.state.username,
                    email: this.state.email,
                    passwordHash: this.state.passwordHash,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    cellPhoneNumber: this.state.cellPhoneNumber,
                    phoneNumber: this.state.phoneNumber
                },
                Roles: this.state.selected

            }
            this.props.addUser(user).then(res => {
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

    actionsFormatter = (cell, row) => <ListUser id={row} />
    formatPerson(cell) {
        var d = cell.lastName+ ", " + cell.firstName;
        return d;
    }
    render() {
        const columns = [{
            dataField: 'user',
            text: 'Nombre y Apellido',
            filter: textFilter({ placeholder: 'Filtrar' }),
            formatter: this.formatPerson,
            sort: true
        },{
            dataField: 'user.email',
            text: 'Email',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },{
            dataField: 'user.phoneNumber',
            text: 'Teléfono Fijo',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, 
        {
            dataField: 'user.cellPhoneNumber',
            text: 'Celular',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        },{
            dataField: 'user.userName',
            text: 'Usuario',
            filter: textFilter({ placeholder: 'Filtrar' }),
            sort: true
        }, {
            dataField: '',
            text: 'Acciones',
            formatter: this.actionsFormatter
        }];
        const { users, roles } = this.props;
        
        return (
            <ContentWrapper>
                <div>
                    <ToastContainer />
                    <div className="content-heading">
                        <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                            <div className="col col-lg-9 col-md-8 col-xl-10">Usuarios
                            <small>Usted va a poder administrar los usuarios del sistema.</small></div>
                            <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                                <Button color="danger" className="btn-labeled text-right" onClick={this.toggleModal}>
                                    <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Agregar
                            </Button>
                            </div>
                        </Row>
                    </div>
                    <Container fluid>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}>Nuevo Usuario</ModalHeader>
                            <form onSubmit={this.onSubmit} action="" >
                                <ModalBody>
                                    <Row>
                                    <Col lg={12}>
                                        <center><p><strong>Datos personales</strong></p></center>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Nombre</label>
                                                <Input bsSize="sm" type="text" name="firstName" placeholder="Ingresar nombre" invalid={this.hasError('firstName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.firstName} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Apellido</label>
                                                <Input bsSize="sm" type="text" name="lastName" placeholder="Ingresar apellido" invalid={this.hasError('lastName', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.lastName} />
                                                <span className="invalid-feedback">Campo requerido</span>

                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>

                                            <FormGroup>
                                                <label>Celular</label>
                                                <Input bsSize="sm" type="number" name="cellPhoneNumber" placeholder="Ingresar celular"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.cellPhoneNumber} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Teléfono Fijo</label>
                                                <Input bsSize="sm" type="number" name="phoneNumber" placeholder="Ingresar teléfono fijo"
                                                    onChange={this.validateOnChange}
                                                    value={this.state.phoneNumber} />
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>

                                            <FormGroup>
                                                <label>Correo</label>
                                                <Input bsSize="sm" type="email" name="email" placeholder="Ingresar correo" invalid={this.hasError('email', 'required') || this.hasError('email', 'email')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required", "email"]'
                                                    value={this.state.email} />
                                                {this.hasError('email', 'required') && <span className="invalid-feedback">Campo requerido</span>}
                                                {this.hasError('email', 'email') && <span className="invalid-feedback">Correo con formato inválido</span>}
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                        <center><p><strong>Datos para inicio de sesión</strong></p></center>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Usuario</label>
                                                <Input type="text"
                                                    name="username"
                                                    invalid={this.hasError('username', 'required')}
                                                    onChange={this.validateOnChange}
                                                    data-validate='["required"]'
                                                    value={this.state.username}
                                                    bsSize="sm"
                                                    placeholder="Ingresar usuario"
                                                />
                                                <span className="invalid-feedback">Campo requerido</span>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <label>Contraseña</label>
                                                <Input
                                                    data-validate='["required"]'
                                                    value={this.state.passwordHash}
                                                    invalid={this.hasError('passwordHash', 'required')}
                                                    bsSize="sm" type="password" name="passwordHash" placeholder="Ingresar contraseña" onChange={this.validateOnChange} />
                                                <span className="invalid-feedback">Campo requerido</span>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                            <FormGroup>
                                                <label>Asignar Roles</label>
                                                <DualListBox
                                                    options={roles}
                                                    selected={this.state.selected}
                                                    onChange={this.changeDualList}
                                                    canFilter
                                                    name="rol"
                                                    filterPlaceholder="Filtrar..."
                                                    alignActions="top"
                                                ></DualListBox>
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
                                <Table keyField='user.email' data={users} columns={columns} />
                            </CardBody>
                        </Card>

                    </Container>
                </div>
            </ContentWrapper>
        );

    }
}

const mapStateToProps = state => ({
    users: state.users.users,
    roles: state.roles.roles
})
export default connect(mapStateToProps, { getAllUsers, getAllRoles, addUser })(Users);