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
import { getUserById, editUser, getAllUsers } from '../../store/actions/users.actions';
import { getAllRoles } from '../../store/actions/roles.actions';
import { connect } from 'react-redux';
import DualListBox from 'react-dual-listbox';
import FormValidator from '../Elements/FormValidator';
import Notify from '../../components/Elements/Notify';


class FormEdit extends React.Component {

    state = {
        userName: '',
        email: '',
        lastName: '',
        firstName: '',
        cellPhoneNumber: '',
        phoneNumber: '',
        selected: [],
        passwordHash: ''
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
        this.props.getAllRoles();
        this.props.getUserById(id);
    }
    componentWillReceiveProps(nextProps) {
        const { history } = nextProps;
        //podés saber cuándo los props están llegando, si lo pones en componentdidmount, viene undefined
        const { userName, email, passwordHash, firstName, lastName, cellPhoneNumber, phoneNumber } = nextProps.user.user;
        this.setState({
            userName: userName,
            email,
            firstName,
            lastName,
            cellPhoneNumber,
            phoneNumber,
            passwordHash,
            selected: nextProps.user.roles,
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
    changeDualList = selected => {
        this.setState({ selected })
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
            const { id } = this.props.match.params;
            const user = {
                User: {
                    id: id,
                    userName: this.state.userName,
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    cellPhoneNumber: this.state.cellPhoneNumber,
                    phoneNumber: this.state.phoneNumber,
                    passwordHash: this.state.passwordHash
                },
                Roles: this.state.selected
            }

            this.props.editUser(user).then(res => {
                Notify("Se modificó con éxito", "success", "bottom-right");
            }).catch((error) => {
                Notify("Ocurrió un error", "error", "bottom-right");
            });
            this.props.history.push("/usuarios");
        }

        e.preventDefault();
    }
    render() {
        const { userName, email, passwordHash, firstName, lastName, cellPhoneNumber, phoneNumber, selected } = this.state;
        const { roles } = this.props;

        return (
            <ContentWrapper>
                <div className="content-heading">
                    <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                        <div className="col col-lg-9 col-md-8 col-xl-10">Editar Usuario {userName}
                            <small>Usted va a poder editar usuarios del sistema.</small>
                        </div>
                        <div className="col-6 col-lg-3 col-md-4 col-xl-2">
                            <Link to={`/usuarios`} >
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
                                                    <label>Nombre</label>
                                                    <Input bsSize="sm" type="text" name="firstName" placeholder="Ingresar nombre" invalid={this.hasError('firstName', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        defaultValue={firstName} />
                                                    <span className="invalid-feedback">Campo requerido</span>
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Apellido</label>
                                                    <Input bsSize="sm" type="text" name="lastName" placeholder="Ingresar apellido" invalid={this.hasError('lastName', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        defaultValue={lastName} />
                                                    <span className="invalid-feedback">Campo requerido</span>
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Celular</label>
                                                    <Input bsSize="sm" type="number" name="cellPhoneNumber" placeholder="Ingresar celular"
                                                        onChange={this.validateOnChange}
                                                        defaultValue={cellPhoneNumber} />
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Teléfono Fijo</label>
                                                    <Input bsSize="sm" type="number" name="phoneNumber" placeholder="Ingresar teléfono fijo"
                                                        onChange={this.validateOnChange}
                                                        defaultValue={phoneNumber} />

                                                </FormGroup>
                                            </Col>
                                            <Col lg={12}>
                                                <FormGroup>
                                                    <label>Correo</label>
                                                    <Input bsSize="sm" type="email" name="email" placeholder="Ingresar correo"
                                                        invalid={this.hasError('email', 'required') || this.hasError('email', 'email')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required", "email"]'
                                                        defaultValue={email} />
                                                    {this.hasError('email', 'required') && <span className="invalid-feedback">Campo requerido</span>}
                                                    {this.hasError('email', 'email') && <span className="invalid-feedback">Correo con formato inválido</span>}
                                                </FormGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Usuario</label>
                                                    <Input type="text"
                                                        name="userName"
                                                        invalid={this.hasError('userName', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        defaultValue={userName}
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
                                                        defaultValue={passwordHash}
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
                                                        selected={selected}
                                                        onChange={this.changeDualList}
                                                        canFilter
                                                        filterPlaceholder="Filtrar..."
                                                        alignActions="top"
                                                    ></DualListBox>
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
    user: state.users.user,
    users: state.users.users,
    roles: state.roles.roles
})

export default connect(mapStateToProps, { getUserById, editUser, getAllUsers, getAllRoles })(FormEdit);