import React from 'react';
import { Button,Row, Col } from 'reactstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Swal from '../Elements/Swal';
import 'react-toastify/dist/ReactToastify.css';

class ListSuppliers extends React.Component{

    state= {   
        swalOption5: {
            title: 'Está seguro de eliminar éste proveedor ?',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'Cancelar',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: true
                },
                confirm: {
                    text: 'Sí',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: true
                }
            }
        },
        id: ''
    }

    deleteSupplier = (isConfirm) =>{
        if (isConfirm) {
            //const {supplierId} = this.props.id;
        }
    }
    
    render(){
    
        const {supplierId} = this.props.id;        
        return(
             <Row className="mb-0">
             <Col  xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Link to={`/proveedor/editar/`+supplierId} >
                    <Button color="success" className="btn-xs">
                        <i className="fa fa-pencil-alt"></i>
                    </Button>
                    </Link>
                </Col>
               
               <Col xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Swal options={this.state.swalOption5} callback={this.deleteSupplier}>
                    <Button color="danger" className="btn-xs">
                    <i className="fa fa-trash-alt"></i>
                    </Button>
                 </Swal> 
               </Col> 
             </Row>
        )
    }
}
const mapStateToProps = state=>({
})
export default connect(mapStateToProps, {}) (ListSuppliers);