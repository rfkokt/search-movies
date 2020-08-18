import React, {Component} from "react";
import {Jumbotron, Form, Container, Row, Col, Button} from "react-bootstrap";
import './style.css'
import Poster from "../Poster";
import axios from 'axios'

class index extends Component {
    constructor() {
        super();
        this.state = {
            listFilm : []
        }
    }

    componentDidMount() {
        this.Film()
    }

    Film = () => {
        axios.get(`https://www.omdbapi.com/?s=indonesia&apikey=176c65e1`)
            .then(res => {
                console.log(res.data.Search)
                this.setState({
                    listFilm : res.data.Search
                })
            })
    }
    cariFilm = () => {
        const nameFilm = this.state.nameFilm
        axios.get(`https://www.omdbapi.com/?s=${nameFilm}&apikey=176c65e1`)
            .then(res => {
                console.log(res.data.Search)
                this.setState({
                    listFilm : res.data.Search
                })
            })
    }

    render() {
        return (
            <div>
                <Jumbotron className='background-jumbotron'>
                    <div className={"text-white"}>
                        <h1 style={{marginTop: '100px'}}>Search Your Movies</h1>
                        <p>
                            Find <span style={{fontWeight: 'bold'}}>rating</span> movie you want with one click!
                        </p>
                        <Container>
                            <Row className={'justify-content-md-center'} style={{marginTop: '100px'}}>
                                <Col xs lg={'4'}>
                                    <Form.Group>
                                        <Form.Control onChange={(e) => {
                                            this.setState({
                                                nameFilm: e.target.value
                                            })
                                        }} type="text" placeholder="Search your movies..."/>
                                    </Form.Group>
                                </Col>
                                <Col xs lg={'1'}>
                                    <Button onClick={this.cariFilm}>Search</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Jumbotron>
                <Container>
                    <Poster listFilm={this.state.listFilm}/>
                </Container>
            </div>
        )
    }
}

export default index