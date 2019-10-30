import React from 'react';
import { Button,Row, Col } from 'reactstrap';
import {deletePatient, editPatient} from '../../store/actions/patients.actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Swal from '../Elements/Swal';
import 'react-toastify/dist/ReactToastify.css';
import Notify from '../Elements/Notify';

class ListPatients extends React.Component{

    state= {   
        swalOption5: {
            title: 'Está seguro de eliminar éste paciente ?',
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

    deletePatient = (isConfirm) =>{
        if (isConfirm) {
            const {customerId} = this.props.id;
            this.props.deletePatient(customerId).then(res=>{
                Notify("Se eliminó con éxito", "success", "bottom-right");
           }).catch((error) => {
                Notify("Ocurrió un error","error", "bottom-right");
           });

        }
    }
    
    render(){
    
        const {patientId} = this.props.id;        
        return(
             <Row className="mb-0">
             <Col  xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Link to={`/pacientes/editar/`+patientId} >
                    <Button color="success" className="btn-xs">
                        <i className="fa fa-pencil-alt"></i>
                    </Button>
                    </Link>
                </Col>
               
               <Col xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Swal options={this.state.swalOption5} callback={this.deletePatient}>
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
    patients: state.patients.patients,
    patient: state.patients.patient
})
export default connect(mapStateToProps, {deletePatient,editPatient}) (ListPatients);