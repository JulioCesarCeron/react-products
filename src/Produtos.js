import React, { Component } from 'react';
import { Route, Link , Router} from 'react-router-dom';
import Axios from 'axios';

import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria';
import ProdutosNovo from './ProdutosNovo';
import ProdutosEditar from './ProdutosEditar'


export default class Produtos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editingCategoria: '',
        };

        this.handleNewCategoria = this.handleNewCategoria.bind(this);
        this.editCategoria = this.editCategoria.bind(this);
        this.renderCategoria = this.renderCategoria.bind(this);
        this.cancelEditing = this.cancelEditing.bind(this);
        this.handleEditCategoria = this.handleEditCategoria.bind(this);
    }

    componentDidMount() {
        this.props.loadCategorias();
    }

    editCategoria(categoria) {
        this.setState({
            editingCategoria: categoria.id,
        });
    }

    cancelEditing() {
        this.setState({
            editingCategoria: '',
        });
    }

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria({
                id: this.state.editingCategoria,
                categoria: this.refs['cat' + this.state.editingCategoria].value,
            });
            this.setState({
                editingCategoria: '',
            });
        }
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id} className="list-group-item">
                <div className="input-group">
                    {this.state.editingCategoria === cat.id && (
                        <div className="input-group">
                            <input
                                type="text"
                                defaultValue={cat.categoria}
                                onKeyUp={this.handleEditCategoria}
                                ref={'cat' + cat.id}
                                className="form-control"
                            />
                            <div className="input-group-prepend">
                                <button
                                    className="btn btn-outline-secondary"
                                    onClick={this.cancelEditing}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                {this.state.editingCategoria !== cat.id && (
                    <div>
                        <Link
                            to={`/produtos/categoria/${cat.id}`}
                            className="ml-3"
                        >
                            {cat.categoria}
                        </Link>
                        <button
                            className="pull-right btn btn-outline-danger btn-sm"
                            onClick={() => this.props.removeCategoria(cat)}
                        >
                            <i className="fa fa-times" aria-hidden="true" />
                        </button>
                        <button
                            className="pull-right btn btn-outline-info btn-sm mr-1"
                            onClick={() => this.editCategoria(cat)}
                        >
                            <i className="fa fa-pencil" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </li>
        );
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                categoria: this.refs.categoria.value,
            });
            this.refs.categoria.value = '';
        }
    }

    render() {
        const { match, categorias } = this.props;
        let categoria = ''
        if (this.props.categoria) {
            categoria = this.props.categoria.categoria
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-3">
                        <h3>Categorias</h3>
                        <ul className="list-group">
                            {categorias.map(this.renderCategoria)}
                        </ul>
                        <div className="card card-body bg-light">
                            <input
                                onKeyUp={this.handleNewCategoria}
                                className="form-control"
                                type="text"
                                ref="categoria"
                                placeholder="Nova categoria"
                            />
                        </div>
                        <Link to='/produtos/novo'>Novo Produto</Link>
                    </div>
                    <div className="col-md-9">
                        <h1>Produtos</h1>
                        <h5>Categoria: {categoria}</h5>
                        <Route
                            exact
                            path={match.url}
                            component={ProdutosHome}
                        />
                        <Route
                            exact
                            path={match.url + '/novo'}
                            render={props => {
                                return (
                                    <ProdutosNovo
                                        {...props}
                                        categorias={categorias}
                                        createProduto={this.props.createProduto}
                                    />
                                );
                            }}
                        />
                        <Route
                            path={match.url + '/categoria/:catId'}
                            render={(props) => {
                                return <Categoria {...props} 
                                    loadProdutos={this.props.loadProdutos}
                                    loadCategoria={this.props.loadCategoria}
                                    produtos={this.props.produtos} 
                                    categoria={this.props.categoria} 
                                    removeProduto={this.props.removeProduto} />
                            }}
                        />
                        <Route path={match.url+'/editar/:id'} 
                            render={(props) =>{
                                return <ProdutosEditar {...props}
                                        categorias={categorias}
                                        readProduto={this.props.readProduto}
                                        editProduto={this.props.editProduto} />
                            } 
                        }
                        />
                    </div>
                </div>
            </div>
        );
    }
}
