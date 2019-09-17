import React from 'react';

const NotFound = props => (
    <div className="abs-center wd-xl">
        <div className="text-center mb-4">
            <div className="text-lg mb-3">403</div>
            <p className="lead m-0">Acceso Denegado</p>
            <p>Usted no tiene permisos para ingresar a la aplicación.</p>
        </div>
        <div className="p-3 text-center">
            <span className="mr-2">&copy;</span>
            <span>2019</span>
            <span className="mx-2">-</span>
            <span>PetClinic</span>
        </div>
    </div>
)

export default NotFound;

