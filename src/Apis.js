import React from 'react';
import Axios from 'axios';


const api = Axios.create({
    baseURL: 'http://localhost:3001/'
})

const Apis = {
    loadCategorias: () => api.get('categorias'),
    deleteCategoria: (id) => api.delete('categorias/' + id)
};

export default Apis;