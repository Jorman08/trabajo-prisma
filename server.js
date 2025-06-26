import express from 'express';
import controller from './product/controller.js';
import brand from './product/brand/controller.brand.js';
import category from './product/category/controller.category.js';
import user from './product/user/controller.user.js';

const app = express();

app.use(express.json());
app.use('/controller', controller);
app.use('/brand', brand);
app.use('/category', category);
app.use('/user', user);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
