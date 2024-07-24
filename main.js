import './styles/style.css'
import { createProducts, createProductButtons } from './src/services/productService.js';
import { setupEventListeners } from './src/services/uiService.js';

const products = createProducts(9, 100, 300);
createProductButtons(products);
setupEventListeners();
