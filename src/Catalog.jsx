import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './Catalog.css';

const Navbar = () => (
	<nav className = "navbar">
		<Link to = "/"> Home </Link>
		<Link to = "/products"> Products </Link>
		<Link to = "/cart"> Cart </Link>
	</nav>
);

const Home = () => (
	<div className = "container">
		<h1 className = "title"> Welcome to the Mini Product Catalog! </h1>
		<p className = "text"> Use the navigation above to explore our products </p>
	</div>
);

const productsData = [ 
	{id: 1, name: "tour dates hoodie", price: 60, description: "premium heavyweight 12.5oz. hoodie 75% cotton / 25% polyester screen printed graphics", imageUrl: "https://store.porterrobinson.com/cdn/shop/files/Porter_TourHoodieBack.png"},
	{id: 2, name: "cat logo hoodie", price: 60, description: "premium heavyweight 12.5oz. hoodie 75% cotton / 25% polyester screen printed graphics", imageUrl: "https://store.porterrobinson.com/cdn/shop/files/cat-hoodie_1.png" },
	{id: 3, name: "tour dates tee", price: 30, description: "100% cotton screen printed graphics oversized fit custom printed neck label", imageUrl: "https://store.porterrobinson.com/cdn/shop/files/worldtour-shirt-front_1.png" }
];

const ProductCard = ({ product }) => (
	<div className = "product-card">
		<img src = {product.imageUrl} alt = {product.name} className = "product-image" />
		<h2 className = "product-name"> {product.name} </h2>
		<p className = "product-price"> ${product.price} </p>
		<Link to ={`/products/${product.id}`} className = "details-link"> View Details </Link>
	</div>
);

const ProductList = () => { const [products] = useState(productsData);
	return (
		<div className = "product-list">
			{products.map(product => (<ProductCard key = {product.id} product = {product} />))}
		</div>
	);
};

const ProductDetail = () => {const { id } = useParams(); 
	const product = productsData.find(p => p.id === parseInt(id));

	if (!product) 
		return <div className = "container">
			Product not found
		</div>;

	return ( 
		<div className = "product-detail">
			<img src = {product.imageUrl} alt = {product.name} className = "detail-image" />
			<h1 className = "detail-title"> {product.name} </h1>
			<p className = "detail-price"> Price: ${product.price} </p>
			<p className = "detail-description"> {product.description} </p>
		</div>
	);
};

const Catalog = () => (
	<Router> 
		<Navbar /> 
		<Routes>
			<Route path = "/" element = {<Home />} />
			<Route path = "/products" element = {<ProductList />} />
			<Route path = "/products/:id" element = {<ProductDetail />} />
			<Route path="/cart" element={<div className="container"> Cart Page (Not Implemented) </div>} />
		</Routes>
	</Router>
);

export default Catalog;