import React, {useState,useEffect} from 'react'
import {
    Row,
    Button,
    ModalHeader,
    ModalFooter,
    Modal,
    ModalBody
  } from 'reactstrap';
function ModalDeleteModified(props){
    debugger;
    
    const [modal, setModal] = useState(true);
    

    console.log(props.info);
    return(
    <Modal isOpen={props.show} toggle={() => setModal(!modal)}>
    <ModalHeader toggle={() => setModal(!modal)}></ModalHeader>
    <form  action="" >
      <ModalBody>
          <h4><center>¿Qué acción desea realizar?</center></h4>
        <ModalFooter>
          <Button type="submit" className="btn btn-danger">Guardar</Button>
          <Button color="secondary" onClick={() => setModal(!modal)}>Cancelar</Button>
        </ModalFooter>
      </ModalBody>
    </form>
  </Modal>
)
}

export default ModalDeleteModified;