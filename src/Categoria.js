import React, { Component } from 'react';
import {Link} from 'react-router-dom'

export default class Categoria extends Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this)
        this.renderProduto = this.renderProduto.bind(this)

        this.state = {
            produtos: [],
            categoria: {},
            id: null
        };
    }

    loadData(id) {
        this.setState({ id })
        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }

    componentDidMount = () => {
        const id = this.props.match.params.catId;
        this.loadData(id);
    };

    componentWillReceiveProps = nextProps => {
        if (nextProps.match.params.catId !== this.state.id) {
            this.loadData(nextProps.match.params.catId)
        }
    };

    renderProduto(produto){
        return (
            <div key={produto.id} className="card card-body bg-light mt-3 mb-3">
                <p >  
                    <button className="pull-right btn btn-outline-danger btn-sm ml-1" onClick={() => this.props.removeProduto(produto).then((res) => this.loadData(this.props.match.params.catId) ) }>
                        <i className="fa fa-times" aria-hidden="true" />
                    </button>
                    
                    <Link to={'/produtos/editar/'+produto.id} className='pull-right'>
                            <button className="btn btn-outline-info btn-sm"><i className="fa fa-pencil" aria-hidden="true" /></button>
                        </Link>
                    {produto.produto}
                </p>
            </div>
        )
    }


    render() {
        return (
            <div>
                <h5>{this.state.categoria.categoria} </h5>

                {
                    this.props.produtos.length === 0 &&
                    <p className='alert alert-danger' >Nenhum produto</p>
                }

                {this.props.produtos.map(this.renderProduto)}
            </div>
        );
    }
}
