import React from 'react';
import { Button,Row, Col } from 'reactstrap';
import {deleteUser,getAllUsers, editUser} from './../../store/actions/users.actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Swal from './../Elements/Swal';
import 'react-toastify/dist/ReactToastify.css';
import Notify from '../../components/Elements/Notify';

class ListUser extends React.Component{

    state= {   
        swalOption5: {
            title: 'Está seguro de eliminar éste usuario ?',
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

    deleteUser = (isConfirm) =>{
        if (isConfirm) {
            const {id} = this.props.id.user;
            this.props.deleteUser(id).then(res=>{
                Notify("Se eliminó con éxito", "success", "bottom-right");
           }).catch((error) => {
                Notify("Ocurrió un error","error", "bottom-right");
           });

        }
    }
    
    render(){
    
        const {id} = this.props.id.user;    
        return(
             <Row className="mb-0">
             <Col  xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Link to={`/usuarios/editar/`+id} >
                    <Button color="success" className="btn-xs">
                        <i className="fa fa-pencil-alt"></i>
                    </Button>
                    </Link>
                </Col>
               
               <Col xl={1} xs={1} sm={1} lg={1} md={1}>
                    <Swal options={this.state.swalOption5} callback={this.deleteUser}>
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
    users: state.users.users,
    user: state.users.user
})
export default connect(mapStateToProps, {deleteUser,getAllUsers,editUser}) (ListUser);