import { Router } from "express";
import { createNewProduct, allProducts, productById, updateProductById, deleteProductById } from './service.js';

const router = Router();

/* router.get('/', (req, res) => {
    res.send('Lista de productos');
});

// params
router.post('/params/:id', (req, res) => {
    const { id } = req.params;
    res.send('Traer producto en el id: ' + id);
});

// query
router.get('/estado', (req, res) => {
    const { estado } = req.query;
    res.send('Traer productos con el estado: ' + estado);
})

//body
router.post('/new', (req, res) => {
    const { nombre, precio } = req.body;
    res.json({
        message: 'Producto creado',
        nombre,
        precio
    });
}); */



// CreateProduct (crear)
router.post('/', (req, res) => {
    const data = req.body;
    createNewProduct(data, res);
});


// allProduct (traer)
router.get('/', (req, res) => {
    allProducts(res);
});


// oneProduct (traer uno)
router.get('/:id', (req, res) => {
    let params_id = +req.params.id
    productById(params_id, res);
});


// updateProduct (actualizar)
router.put('/:id', (req, res) => {
    const id = +req.params.id
    const body = req.body;
    updateProductById(id, body, res);
});


// deleteProduct (eliminar)
router.delete('/:id', (req, res) => {
    const params_id = +req.params.id
    deleteProductById(params_id, res);
});



export default router;