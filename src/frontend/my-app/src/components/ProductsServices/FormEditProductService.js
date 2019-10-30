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

class FormEditSupplier extends React.Component {

    state = {
        productName: '',
        description: '',
        productServiceCategoryId: null,
        selectedOption: '',
        price: '',
        brand: '',
        manageInventory: '',
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
    }

    componentWillReceiveProps(nextProps) {
        const { history } = nextProps;
        //podés saber cuándo los props están llegando, si lo pones en componentdidmount, viene undefined
        const { productName, description, productServiceCategoryId, price, brand, manageInventory } = nextProps.client;
        this.setState({
            productName,
            description,
            productServiceCategoryId,
            price,
            brand,
            manageInventory,
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
        const inputs = [...form.elements].slice(0, 4);
        const { errors, hasError } = FormValidator.bulkValidate(inputs)
        this.setState({
            ...this.state,
            errors
        });

        if (!hasError) {
            const { id } = this.props.match.params;
            const productService = {
                productServiceId: id,
                productName: this.state.productName,
                description: this.state.description,
                productServiceCategoryId: this.state.productServiceCategoryId,
                price: this.state.price,
                brand: this.state.brand,
                manageInventory: this.state.manageInventory
            }
            this.props.history.push("/productosServicios");
        }

        e.preventDefault();
    }
    render() {
        const { productName, description,
        productServiceCategoryId,
        selectedOption,
        price,
        brand,
        manageInventory} = this.state;
        return (
            <ContentWrapper>
                <div className="content-heading">
                    <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
                        <div className="col col-lg-9 col-md-8 col-xl-10">Editar Producto/Servicio {productName}
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
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Nombre</label>
                                                    <Input bsSize="sm" type="text" name="productName" placeholder="Ingresar nombre" invalid={this.hasError('businessName', 'required')}
                                                        onChange={this.validateOnChange}
                                                        data-validate='["required"]'
                                                        defaultValue={productName} />
                                                    <span className="invalid-feedback">Campo requerido</span>

                                                </FormGroup>
                                            </Col>
                                            <Col lg={6}>
                                                <FormGroup>
                                                    <label>Descripción</label>
                                                    <Input bsSize="sm" type="text" name="description" placeholder="Ingresar Descripción"
                                                        onChange={this.validateOnChange}
                                                        defaultValue={description} />
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
})

export default connect(mapStateToProps, {  })(FormEditSupplier);