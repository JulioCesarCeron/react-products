import React, { Component } from 'react';
import Axios from 'axios';

export default class Categoria extends Component {
    constructor(props) {
        super(props);

        this.loadData = this.loadData.bind(this)

        this.state = {
            produtos: [],
            categoria: {}
        };
    }

    loadData(id) {
        Axios.get('http://localhost:3001/produtos?categoria=' + id).then(
            res => {
                this.setState({
                    produtos: res.data,
                });
            }
        );

        Axios.get('http://localhost:3001/categorias/' + id).then(
            res => {
                this.setState({
                    categoria: res.data
                });
            }
        );
    }

    componentDidMount = () => {
        const id = this.props.match.params.catId;
        this.loadData(id);
    };

    componentWillReceiveProps = nextProps => {
        this.loadData(nextProps.match.params.catId)
    };

    renderProduto(produto){
        return <p key={produto.id} className="card card-body bg-light" > {produto.produto} </p>
    }

    render() {
        return (
            <div>
                <h5>{this.state.categoria.categoria} </h5>

                {this.state.produtos.map(this.renderProduto)}
            </div>
        );
    }
}
