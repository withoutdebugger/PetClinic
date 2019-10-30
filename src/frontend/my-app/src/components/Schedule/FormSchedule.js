import React, {useEffect, useState, useRef} from 'react'
import { getScheduleById,deleteSchedule, editSchedule} from '../../store/actions/schedule.actions';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsSelectView } from '../../store/actions/clients.actions';
import { getAllProfessionalSelectView } from '../../store/actions/users.actions';
import { getPatientByCustomerId } from '../../store/actions/patients.actions';
import { getAllQueryTypes } from '../../store/actions/queryTypes.actions';
import Datetime from 'react-datetime';
import ContentWrapper from '../Layout/ContentWrapper';
import Swal from 'sweetalert2';

import {
    Row,
    Input,
    FormGroup,
    Col,
    Button
  } from 'reactstrap';
  import moment from 'moment';
  import Select from 'react-select';

const FormSchedule = ({match,history, props}) =>{
    const descriptionRef = useRef('');
    const queryTypesRef = useRef('');
    const customerRef = useRef('');
    const dateStartRef= useRef('');
    const dateEndRef= useRef('');
    const patientRef = useRef('');
    const professionalRef = useRef('');
    const dispatch = useDispatch();
    const [customerId, setCustomerId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [professionalId, setProfessionalId] = useState('');
    const [queryTypesId, setQueryTypesId] = useState('');
    
    const clients = useSelector((state) => state.clients.clientsSelectView);
    const patients = useSelector((state) => state.patients.patientCustomer);
    const professionals = useSelector((state) => state.users.usersSelectView);
    const queryTypes = useSelector((state) => state.queryTypes.queryTypes);
    const [scheduleDateStart, setScheduleDateStart] = useState(new Date());
    const [scheduleDateEnd, setScheduleDateEnd] = useState(new Date());
    const clientsSelectView = () => dispatch(getAllClientsSelectView());
    const professionalSelectView = () => dispatch(getAllProfessionalSelectView());
    const queryTypesSelectView = () => dispatch(getAllQueryTypes());
    const scheduleById = useSelector((state) => state.schedules.schedule);
    const patientsSelectView = (id) => dispatch(getPatientByCustomerId(id));
    const yesterday = Datetime.moment().subtract(1, 'day');
    const deleteScheduleById = (id) => dispatch(deleteSchedule(id));
    const saveEditSchedule = (schedule) => dispatch(editSchedule(schedule));
    const { id } = match.params;

    useEffect(() => {
        queryTypesSelectView();
        clientsSelectView();
        professionalSelectView();
        dispatch(getScheduleById(id));
    }, [dispatch, id])
    
    const returnToPrincipal=()=>{
        history.push("/agenda");
    }

      const valid = (current) => {
        return current.isAfter(yesterday) && current.day() !== 0 && current.day() !== 7;;
      };
      const deleteS= () =>{
        Swal.fire({
          title: 'Eliminar',
          text: "¿Seguro desea eliminar ésta consulta?",
          type: 'warning',
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí'
        }).then((result) => {
          if (result.value) {
            deleteScheduleById(id);
            returnToPrincipal();
        }
        })
      }
      const onSubmit = e => {
        e.preventDefault();
        saveEditSchedule(
          { scheduleId: id ,
            notes: descriptionRef.current.value,
            professionalId: professionalRef.current.props.defaultValue !== null ? professionalRef.current.props.defaultValue.value : null, 
            customerId: customerRef.current.props.defaultValue !== null ? customerRef.current.props.defaultValue.value : null, 
            patientId: patientRef.current.props.defaultValue !== null ? patientRef.current.props.defaultValue.value : null, 
            queryTypesId: queryTypesRef.current.props.defaultValue !== null ? queryTypesRef.current.props.defaultValue.value : null, 
            scheduleDateStart: dateStartRef.current.state.selectedDate._d, scheduleDateEnd: dateEndRef.current.state.selectedDate._d });
        returnToPrincipal();
      }
      const getValidTimes = function (dateTime) {
        var date = new moment(dateTime);
        if (moment().isSame(date, 'day')) {
          return {
            hours: {
              min: date.hours(),
              max: 20,
              step: 1,
            },
            minutes: {
              min: 0,
              max: 59,
              step: 1,
            },
          };
        }
        return {
          hours: {
            min: 9,
            max: 20,
            step: 1,
          },
          minutes: {
            min: 0,
            max: 59,
            step: 1,
          },
        };
      }
    return(
    <ContentWrapper>
      <div className="content-heading">
      <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
        <div className="col col-lg-9 col-md-8 col-xl-10">Editar agenda
              <small>Usted va a poder editar la agenda de los profesionales.</small>
        </div>
        <div className="col-6 col-lg-3 col-md-4 col-xl-2">
          <Button color="danger" className="btn-labeled text-right" onClick={returnToPrincipal}>
            <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Volver
          </Button>
        </div>
      </Row>
    </div>
        <form onSubmit={onSubmit}  action="" >
          <Row>
            <Col lg={6}>
              <FormGroup>
                <label>Fecha y Hora Inicio</label>
                <Datetime locale="es"
                  ref={dateStartRef}
                  timeConstraints={getValidTimes(scheduleDateStart)}
                  isValidDate={valid}
                  defaultValue={new moment(scheduleById.scheduleDateStart)}
                  inputProps={{ className: 'form-control' }}
                  onChange={e => setScheduleDateStart(e._d)}
                  timeFormat={true}
                  key={`scheduleDateStart:${scheduleById.scheduleDateStart}`}
                  name="scheduleDateStart"
                  placeholder="DD/MM/AAAA" /> 
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <label>Fecha y Hora Fin</label>
                <Datetime
                  locale="es"
                  ref={dateEndRef}
                  timeConstraints={getValidTimes(new moment(scheduleDateEnd))}
                  isValidDate={valid}
                  defaultValue={new moment(scheduleById.scheduleDateEnd)}
                  inputProps={{ className: 'form-control' }}
                  onChange={e => setScheduleDateEnd(e._d)}
                  timeFormat={true}
                  key={`scheduleDateEnd:${scheduleById.scheduleDateEnd}`}
                  name="scheduleDateEnd"
                  placeholder="DD/MM/AAAA" />
              </FormGroup>
            </Col>
             <Col lg={6}>
              <FormGroup>
                <label>Cliente</label>
                <Select
                  ref={customerRef}
                  name="customerId"
                  placeholder="Ingresar"
                  loadingMessage="Cargando"
                  defaultValue={clients.filter(x=>parseInt(x.value) === scheduleById.customerId || customerId)[0]}
                  key={`customerId:${scheduleById.customerId}`}
                  onChange={selectedOption => setCustomerId(selectedOption.value) || patientsSelectView(selectedOption.value) }
                  options={clients}
                />
              </FormGroup>
            </Col> 
              <Col lg={6}>
                <FormGroup>
                  <label>Paciente</label>
                  <Select
                    ref={patientRef}
                    name="patientId"
                    placeholder="Ingresar"
                    loadingMessage="Cargando"
                    value = {patients.filter(x=>parseInt(x.value) === scheduleById.patientId || patientId)[0]}
                    onChange={selectedOption => setPatientId(selectedOption.value)}
                    key={`patientId:${scheduleById.patientId}`}
                    options={patients}
                  />
                </FormGroup>
              </Col> 
              <Col lg={6}>
                <FormGroup>
                  <label>Profesional</label>
                  <Select
                    ref={professionalRef}
                    name="professionalId"
                    placeholder="Ingresar"
                    loadingMessage="Cargando"
                    defaultValue={professionals.filter(x=>x.value === scheduleById.professionalId || professionalId)[0]}
                    onChange={selectedOption => setProfessionalId(selectedOption.value)}
                    key={`professionalId:${scheduleById.professionalId}`}
                    options={professionals}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>Consulta</label>
                  <Select
                    ref={queryTypesRef}
                    name="queryTypesId"
                    placeholder="Ingresar"
                    loadingMessage="Cargando"
                    key={`queryTypesId:${scheduleById.queryTypesId}`}
                    defaultValue={queryTypes.filter(x=>parseInt(x.value) === scheduleById.queryTypesId || queryTypesRef)[0]}
                    onChange={selectedOption => setQueryTypesId(selectedOption.value)}
                    options={queryTypes}
                   />
                 </FormGroup>
             </Col> 
              <Col lg={12}>
                <FormGroup>
                  <label>Descripción</label>
                  <Input type="textarea" name="notes" defaultValue={scheduleById.notes} key={`description:${scheduleById.notes}`}
                  innerRef={descriptionRef} placeholder="Ingresar descripción" /> 
                </FormGroup>
              </Col>
          </Row>
            <Button onClick={() => deleteS()} color="danger">Eliminar</Button>
            <button type="submit" className="btn btn-primary">Guardar</button>
      </form>
      </ContentWrapper>
    )
}

export default FormSchedule;