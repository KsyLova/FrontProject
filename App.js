import React from 'react';
import './App.css';
import Logo from './Logo';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function App() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    const countries = [
        { name: 'All Countries', code: '' },
        { name: 'United States', code: 'us' },
        { name: 'United Kingdom', code: 'gb' },
        { name: 'Canada', code: 'ca' },
        { name: 'Australia', code: 'au' },
        { name: 'India', code: 'in' }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setSearchQuery('');
        setSelectedCountry('');
    };

    return (
        <>
            <Navbar  bg="dark">
                <Container className='d-block w-50'>
                    <h1 className='text-center' style={{ color: '#f8f9fa' }}>TOP NEWS</h1>
                    <Nav className='d-flex justify-content-between'>
                        {['Business', 'Politics', 'Health', 'Science', 'Sports', 'Technology'].map((category) => (
                            <Button
                                key={category}
                                variant="btn btn-outline-light"
                                onClick={() => handleCategoryClick(category.toLowerCase())}
                            >
                                {category}
                            </Button>
                        ))}
                        <Button variant="btn btn-outline-light" onClick={handleClearFilters}>Clear Filters</Button>
                    </Nav>
                    <Form className="mt-3">
                        <Row className="align-items-center">
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Search news..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="mb-3"
                                />
                            </Col>
                            <Col>
                                <Form.Select value={selectedCountry} onChange={handleCountryChange} className="mb-3">
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Navbar>
            <div className="content-offset">
                <NewsList selectedCategory={selectedCategory} searchQuery={searchQuery} selectedCountry={selectedCountry} />
            </div>
            <Footer />
        </>
    );
}

function NewsList({ selectedCategory, searchQuery, selectedCountry }) {
    const API_KEY = "b5a00c0f40a720dbe1368b258cf0fbdd";
    const BASE_URL = "https://gnews.io/api/v4/top-headlines";
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let url = `${BASE_URL}?apikey=${API_KEY}&lang=en&max=10`;
            if (selectedCountry) {
                url += `&country=${selectedCountry}`;
            }
            if (selectedCategory) {
                url += `&category=${selectedCategory}`;
            }

            const response = await fetch(url);
            const jsonData = await response.json();
            setArticles(jsonData.articles || []);
        };
        fetchData();
    }, [selectedCategory, searchQuery, selectedCountry]);

    const filteredArticles = articles.filter(article => 
        article.description && article.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className="mt-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {filteredArticles.map((item) => (
                    <Col key={item.url}>
                        <Card className='h-100' bg='dark' text='light'>
                            {item.image && <Card.Img variant="top" src={item.image} />}
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {item.source.name ? item.source.name : "unknown"}
                                </Card.Subtitle>
                                <Card.Text>
                                    {item.description}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-center">
                                <Button variant="light" href={item.url} target="_blank">Read more</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </div>
        </Container>
    );
}

function Footer() {
    const handleButtonPress = () => alert('Subscription successful!');
    const [footerTerm, setFooterTerm] = useState(localStorage.getItem('email') || 'default');
    console.log(footerTerm);

    useEffect(() => {
        localStorage.setItem('email', footerTerm);
    }, [footerTerm]);

    const footerChange = (event) => {
        setFooterTerm(event.target.value);
    }

    return (
        <footer className="footer-copyright text-center py-3">
            <div className="container">
                <h5 className="text-uppercase">Join our channels to get the best news</h5>
                <p>You can unsubscribe at any time.</p>
                <InputGroup className="mb-3" style={{ maxWidth: '300px', margin: '0 auto' }}>
                    <Form.Control id="email" placeholder="Email" onChange={footerChange} />
                    <Button size="sm" variant="outline-secondary" onClick={handleButtonPress}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027z"/>
                        </svg>
                    </Button>
                </InputGroup>
            </div>
            <div>© 2024 Copyright: <a href="https://react-bootstrap.netlify.app/">ReactBootstrap.app</a></div>
        </footer>
    );
}

export default App;
