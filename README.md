// ? server

<!-- Creación de constante const app = express();

app.use(express.json());
Permite que la aplicación procese datos JSON en las solicitudes HTTP. Esto es útil para manejar datos enviados desde el cliente en formato JSON, como en solicitudes POST o PUT.

app.use('/controller', controller);
Asocia el router controller a la ruta /controller. Todas las rutas definidas en el archivo o módulo controller estarán disponibles bajo el prefijo /controller.

app.use('/brand', brand);
Asocia el router brand a la ruta /brand. Todas las rutas definidas en el archivo o módulo brand estarán disponibles bajo el prefijo /brand.

const PORT = 3000;
Define el puerto en el que el servidor escuchará las solicitudes entrantes. En este caso, el puerto es el 3000

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
Inicia el servidor y lo pone a escuchar en el puerto definido. Cuando el servidor está listo, imprime un mensaje en la consola indicando la URL donde está corriendo.-->


// ? controller

<!-- router.get('/', (req, res) => {
    allProducts(res);
});
Cuando se hace una petición GET a la raíz (/), se llama a la función allProducts, que probablemente obtiene todos los productos de la base de datos y responde al cliente con la lista.

router.get('/:id', (req, res) => {
    let params_id = +req.params.id
    productById(params_id, res);
});
Cuando se hace una petición GET a /algún_id, se extrae el parámetro id de la URL, se convierte a número (+req.params.id), y se llama a productById para buscar ese producto específico y devolverlo.

router.put('/:id', (req, res) => {
    const id = +req.params.id
    const body = req.body;
    updateProductById(id, body, res);
});
Cuando se hace una petición PUT a /algún_id, se obtiene el id de la URL y los nuevos datos del producto del cuerpo de la petición (req.body). Luego, se llama a updateProductById para actualizar ese producto.

router.delete('/:id', (req, res) => {
    const params_id = +req.params.id
    deleteProductById(params_id, res);
});
Cuando se hace una petición DELETE a /algún_id, se extrae el id de la URL, se convierte a número y se llama a deleteProductById para eliminar ese producto.

export default router;
Se exporta el objeto router para que pueda ser usado en otras partes de la aplicación, normalmente en el archivo principal del servidor.
-->


// ? service

<!-- Función para obtener un producto por su ID
function productById(id, res) {
Convierte el id recibido a número entero
const isInt = +id
Valida que el id sea válido, si no lo es, responde con un error
validateId(isInt, res);
Busca el producto cuyo id coincida con el id proporcionado
const product = products.find(product => product.id === isInt)
Verifica si el producto fue encontrado, si no, responde con un error
foundProduct(product, res);
Si todo está bien, responde con el producto encontrado en formato JSON
res.json(product);
}

Función para actualizar un producto por su ID
function updateProductById(id, body, res) {
Convierte el id recibido a número entero
const isInt = +id
Valida que el id sea válido, si no lo es, responde con un error
validateId(isInt, res);
Busca el índice del producto cuyo id coincida con el id proporcionado
const product = products.findIndex(product => product.id === isInt);
Verifica si el índice es válido, si no, responde con un error
foundId(product, res);
Actualiza el producto encontrado combinando los datos actuales con los nuevos datos recibidos en body
products[product] = {...products[product], ...body}
Responde con un mensaje de éxito en formato JSON
res.json({
message: 'new product updated',
status: 200
});
}

Función para eliminar un producto por su ID
function deleteProductById(id, res) {
Convierte el id recibido a número entero
const isInt = +id;
Valida que el id sea válido, si no lo es, responde con un error
validateId(isInt, res);
Busca el índice del producto cuyo id coincida con el id proporcionado
const product = products.findIndex(product => product.id === isInt);
Verifica si el índice es válido, si no, responde con un error
foundId(product, res);
Elimina el producto del arreglo usando el índice encontrado
products.splice(product, 1);
Responde con un mensaje de éxito en formato JSON
res.json({
message: 'product deleted successfully',
status: 200
});
}

Exporta las funciones para que puedan ser usadas en otros archivos
export {
createNewProduct,
allProducts,
productById,
...otras funciones exportadas
} -->


// ? validation

<!-- Función para validar si el parámetro 'int' es un número.
Si 'int' no es un número (isNaN devuelve true), responde con un mensaje de error y status 404.
const validateId = (int, res) => {
    if (isNaN(int)) {
        res.json({
            message: 'Error id is string', Mensaje de error si el id no es un número
            status: 404 Código de estado HTTP 404 (no encontrado)
        })
    }
};

Función para verificar si un id fue encontrado.
Si 'id' es igual a -1, significa que no se encontró el id buscado.
En ese caso, responde con un mensaje de error y status 404.
const foundId = (id, res) => {
    if (id == -1) {
        res.json({
            message: 'Error id not found',  Mensaje de error si el id no existe
            status: 404  Código de estado HTTP 404 (no encontrado)
        })
    }
};

Función para verificar si un producto fue encontrado.
Si 'product' es falsy (null, undefined, etc.), responde con un mensaje de error y status 404.
const foundProduct = (product, res) => {
    if (!product) {
        res.json({
            message: 'Error product not found',  Mensaje de error si el producto no existe
            status: 404  Código de estado HTTP 404 (no encontrado)
        })
    }
};

Exporta las funciones para que puedan ser usadas en otros archivos.
export {
    validateId,
    foundId,
    foundProduct
} -->