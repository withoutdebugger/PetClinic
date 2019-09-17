import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
  import paginationFactory from 'react-bootstrap-table2-paginator';
  import filterFactory from 'react-bootstrap-table2-filter';
  import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
  import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export default class Table extends Component {
    render() {
        const customTotal = (from, to, size) => (
            <span className="react-bootstrap-table-pagination-total">
              { size } Resultados
            </span>
          );
        const options = {
            paginationSize: 4,
            pageStartIndex: 1,
            alwaysShowAllBtns: true, 
            firstPageText: 'Primero',
            prePageText: 'Anterior',
            nextPageText: 'Próximo',
            lastPageText: 'Último',
            nextPageTitle: 'Primer página',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Próxima página',
            lastPageTitle: 'Última página',
            showTotal: true,
            paginationTotalRenderer: customTotal,
            sizePerPageList: [{
              text: '10', value: 10
            }, {
              text: '15', value: 15
            }, {
              text: 'Todas', value: this.props.data.length
            }] // A numeric array is also available. the purpose of above example is custom the text
          };
        
        return (
              <BootstrapTable   
                                 filter={ filterFactory() } 
                                 columns={this.props.columns} 
                                 pagination={ paginationFactory(options) } 
                                 bootstrap4 
                                 striped
                                 keyField={this.props.keyField}
                                 data={this.props.data} 
                                 noDataIndication="No hay registros disponibles" 
                                 bordered={ false } >
                                </BootstrapTable>
            
        )
    }
}
