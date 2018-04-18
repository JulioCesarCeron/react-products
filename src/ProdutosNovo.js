import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export default class ProdutosNovo extends Component {
    constructor(props) {
        super(props);
        
        this.handleNovoProduto = this.handleNovoProduto.bind(this)

        this.state = {
            redirect: false
        }

    }
    
    
    handleNovoProduto(){
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto).then((res) => this.setState({redirect: '/produtos/categoria/'+produto.categoria }))
    }

    render() {
        const { categorias } = this.props
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Produtos novo</h2>
                <select ref='categoria' className='form-control' >
                    {categorias.map((c) => <option key={c.id} value={c.id}>{c.categoria}</option> )}
                </select>   
                <input placeholder='Nome do novo produto' className='form-control' ref='produto' ></input>
                <button className="btn btn-secondary" onClick={this.handleNovoProduto} >Salvar</button>
            </div>
        );
    }
}