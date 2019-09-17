import React from 'react';

class Spinner extends React.Component {
    render() { 
    return(
            <div className="card card-default">
                <div className="card-body loader-demo d-flex align-items-center justify-content-center">
                    <div className="ball-spin-fade-loader">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
 )

}
}

export default Spinner;