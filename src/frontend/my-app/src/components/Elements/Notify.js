
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Notify(message, type, position) {
    return(toast(message, {
        type: type,
        position: position
    }))
}


export default Notify;