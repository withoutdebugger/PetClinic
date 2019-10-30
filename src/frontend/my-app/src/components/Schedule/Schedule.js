import React, { useState, useEffect } from 'react'
import {
  Row,
  Button,
  ModalHeader,
  ModalFooter,
  Modal,
  Input,
  ModalBody,
  FormGroup,
  Col
} from 'reactstrap';
import ContentWrapper from '../Layout/ContentWrapper';
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment';
import { DragDropContext } from 'react-dnd'
import Datetime from 'react-datetime';
import elementClosest from 'element-closest';
import HTML5Backend from 'react-dnd-html5-backend'
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClientsSelectView } from '../../store/actions/clients.actions';
import { getAllPatientsSelectView, getPatientByCustomerId } from '../../store/actions/patients.actions';
import { getAllProfessionalSelectView } from '../../store/actions/users.actions';
import { getAllQueryTypes } from '../../store/actions/queryTypes.actions';
import { addSchedule, getAllSchedules, editSchedule, getScheduleById, deleteSchedule } from '../../store/actions/schedule.actions';
require('moment/locale/es');
moment.locale('es-AR');
elementClosest(window);
const DragAndDropCalendar = withDragAndDrop(BigCalendar)
const localizer = BigCalendar.momentLocalizer(moment)

function Schedule({history}) {
  const [modal, setModal] = useState(false);
  const [habDelete, setHabDelete] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [scheduleId, setScheduleId] = useState(0);
  const [patientId, setPatientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [queryTypesId, setQueryTypesId] = useState('');
  const [notes, saveNotes] = useState('');
  const [scheduleDateStart, setScheduleDateStart] = useState(new Date());
  const [scheduleDateEnd, setScheduleDateEnd] = useState(new Date());
  const today = new Date();
  const yesterday = Datetime.moment().subtract(1, 'day');

  const dispatch = useDispatch();
  const saveSchedule = (schedule) => dispatch(addSchedule(schedule));
  const clientsSelectView = () => dispatch(getAllClientsSelectView());
  const patientsSelectView = (id) => dispatch(getPatientByCustomerId(id));
  const professionalSelectView = () => dispatch(getAllProfessionalSelectView());
  const queryTypesSelectView = () => dispatch(getAllQueryTypes());
  const schedulesGetAll = () => dispatch(getAllSchedules());
  const clients = useSelector((state) => state.clients.clientsSelectView);
  const patients = useSelector((state) => state.patients.patientCustomer);
  const professionals = useSelector((state) => state.users.usersSelectView);
  const queryTypes = useSelector((state) => state.queryTypes.queryTypes);
  const schedulesAll = useSelector((state) => state.schedules.schedules);
  
   schedulesAll.forEach(element => {
     element.start = new Date(element.start);
     element.end =  new Date(element.end);
  });

  useEffect(() => {
    queryTypesSelectView();
    clientsSelectView();
    professionalSelectView();
    schedulesGetAll();
  }, []);

  const parseStyleProp = ({ style }) => style ? { style } : {}

  const selectEvent = event => {
    history.push("editarAgenda/"+event.id);
  };
  const onSubmit = e => {
    e.preventDefault();
    debugger;
    saveSchedule({ notes, professionalId, customerId, patientId, queryTypesId, scheduleDateStart, scheduleDateEnd });
    setModal(!modal);
  }
  const valid = (current) => {
    return current.isAfter(yesterday) && current.day() !== 0 && current.day() !== 7;;
  };

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
  return (
    <ContentWrapper>
  
      <div className="content-heading">
        <Row className="no-gutters col-lg-12 col-md-12 col-xl-12">
          <div className="col col-lg-9 col-md-8 col-xl-10">Agenda
                <small>Usted va a poder administrar la agenda de los profesionales.</small>
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-xl-2">
            <Button color="danger" className="btn-labeled text-right" onClick={() => setModal(!modal) || setHabDelete(false) || setQueryTypesId('') || setScheduleDateEnd(new Date()) || setScheduleDateStart(new Date()) || setCustomerId('')  || setPatientId('')  || setProfessionalId('')  || saveNotes('')}>
              <span className="btn-label"><i className="fa fa-plus-circle"></i></span> Agregar Turno
            </Button>
          </div>
        </Row>
      </div>
      <DragAndDropCalendar
        localizer={localizer}
        style={{ minHeight: 500 }}
        selectable
        events={schedulesAll}
        messages={{next:"Siguiente",previous:"Anterior",today:"Hoy", month: "Mes", week: "Semana", day: "Día"}}
        min={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9)}
        max={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)}
        onSelectEvent={(e) => selectEvent(e)}
        defaultView="week"
        defaultDate={new Date()}
        eventPropGetter={parseStyleProp}
      />
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>{habDelete === true ? "Modificar": "Nuevo"} Turno</ModalHeader>
        <form onSubmit={onSubmit} action="" >
          <ModalBody>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <label>Fecha y Hora Inicio</label>
                  <Datetime locale="es"
                    timeConstraints={getValidTimes(scheduleDateStart)}
                    isValidDate={valid}
                    value={scheduleDateStart}
                    inputProps={{ className: 'form-control' }}
                    onChange={e => setScheduleDateStart(e._d)}
                    timeFormat={true}
                    name="scheduleDateStart"
                    placeholder="DD/MM/AAAA" />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>Fecha y Hora Fin</label>
                  <Datetime
                    locale="es"
                    timeConstraints={getValidTimes(new moment(scheduleDateEnd))}
                    isValidDate={valid}
                    value={scheduleDateEnd}
                    inputProps={{ className: 'form-control' }}
                    onChange={e => setScheduleDateEnd(e._d)}
                    timeFormat={true}
                    name="scheduleDateEnd"
                    placeholder="DD/MM/AAAA" />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>Cliente</label>
                  <Select
                    name="customerId"
                    placeholder="Ingresar"
                    loadingMessage="Cargando"
                    defaultValue={clients.filter(x=>parseInt(x.value) === customerId)[0]}
                    onChange={selectedOption => setCustomerId(selectedOption.value) || patientsSelectView(selectedOption.value) }
                    options={clients}
                  />
                </FormGroup>
              </Col> 
                <Col lg={6}>
                  <FormGroup>
                    <label>Paciente</label>
                    <Select
                      name="patientId"
                      placeholder="Ingresar"
                      loadingMessage="Cargando"
                      defaultValue={patients.filter(x=>parseInt(x.value) === patientId)[0]}
                      onChange={selectedOption => setPatientId(selectedOption.value)}
                      options={patients}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <label>Profesional</label>
                    <Select
                      name="professionalId"
                      placeholder="Ingresar"
                      loadingMessage="Cargando"
                      defaultValue={professionals.filter(x=>x.value === professionalId)[0]}
                      onChange={selectedOption => setProfessionalId(selectedOption.value)}
                      options={professionals}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <label>Consulta</label>
                    <Select
                      name="queryTypesId"
                      placeholder="Ingresar"
                      loadingMessage="Cargando"
                      defaultValue={queryTypes.filter(x=>parseInt(x.value) === queryTypesId)[0]}
                      onChange={selectedOption => setQueryTypesId(selectedOption.value)}
                      options={queryTypes}
                    />
                  </FormGroup>
                </Col>
                <Col lg={12}>
                  <FormGroup>
                    <label>Descripción</label>
                    <Input type="textarea" name="notes" defaultValue={notes} onChange={e => saveNotes(e.target.value)} placeholder="Ingresar descripción" />
                  </FormGroup>
                </Col>
            </Row>
            <ModalFooter>
              <button type="submit" className="btn btn-primary">Guardar</button>
              <Button color="secondary" onClick={() => setModal(!modal)}>Cancelar</Button>
            </ModalFooter>
          </ModalBody>
        </form>
      </Modal>

    </ContentWrapper>

  )

}

export default DragDropContext(HTML5Backend)(Schedule);