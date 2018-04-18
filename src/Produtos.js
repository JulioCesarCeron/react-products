import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Axios from 'axios';

import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria';
import Apis from './Apis';

export default class Produtos extends Component {
    constructor(props) {
        super(props);

        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.loadCategorias = this.loadCategorias.bind(this)
        this.removeCategoria = this.removeCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)

        this.state = {
            categorias: [],
        };
    }

    loadCategorias() {
        Apis.loadCategorias().then(res => {
            this.setState({
                categorias: res.data,
            });
        });
    }

    componentDidMount() {
        this.loadCategorias()
    }

    removeCategoria(categoria) {
        Apis.deleteCategoria(categoria.id)
        .then(res => {
            this.loadCategorias()
        })
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id} className='list-group-item' >
                <button className="btn btn-outline-danger btn-sm" onClick={() => this.removeCategoria(cat)}>x</button>
                <Link to={`/produtos/categoria/${cat.id}`} className='ml-3' >{cat.categoria}</Link>
            </li>
        );
    }

    handleNewCategoria(key) {
        if(key.keyCode === 13 ){
            Axios.post('http://localhost:3001/categorias', {
                categoria: this.refs.categoria.value
            }).then(res => {
                this.loadCategorias()
                this.refs.categoria.value = ''
            })
        }
    }

    render() {
        const { match } = this.props;
        const { categorias } = this.state;
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <h3>Categorias</h3>
                        <ul className='list-group' >{categorias.map(this.renderCategoria)}</ul>
                        <div className="card card-body bg-light">
                            <input onKeyUp={this.handleNewCategoria} className="form-control" type="text" ref='categoria' placeholder='Nova categoria' />
                        </div>
                        <div className="col-md-9">
                            <h1>Produtos</h1>
                            <Route exact path={match.url} component={ProdutosHome} />
                            <Route path={match.url + '/categoria/:catId'} component={Categoria} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
