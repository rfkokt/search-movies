import React, {Component} from "react";
import {Card, Button, Row, Col, Modal, Image, Container} from "react-bootstrap";
import axios from 'axios'

class Poster extends Component {
    constructor() {
        super();
        this.state = {
            show: false
        }
        this.handleClose = this.handleClose.bind(this)
    }


    liatDetail = (item) => {
        const detailFilm = item.imdbID
        axios
            .get(`http://www.omdbapi.com/?i=${detailFilm}&apikey=176c65e1`)
            .then(res => {
                const data = res.data
                console.log(data)
                this.setState({
                    Plot: data.Plot,
                    Director: data.Director,
                    Writer: data.Writer,
                    Actor: data.Actors,
                    Runtime: data.Runtime,
                    Language: data.Language,
                    Date: data.Released,
                    Rating: data.imdbRating,
                    PosterDetail: data.Poster,
                    TitleDetail: data.Title,
                    Genre: data.Genre,
                    show: true
                }, () => console.log('hai', this.state.PosterDetail))
            })
    }

    handleClose() {
        this.setState({
            show: false
        })
    }

    render() {
        const {show, Plot, Director, Writer, Actor, Runtime, Language, Date, Rating, Genre, TitleDetail, PosterDetail} = this.state;
        return (
            <div>
                <Container>
                    <Row>
                        {this.props.listFilm.map((item, key) =>
                            <Col xs={{span : 10, offset:2}} sm={{span : 10, offset:2}} md={{span : 6, offset:0}} lg={{span : 4, offset:0}} style={{marginBottom: '20px'}}>
                                <Card style={{width: '18rem'}}>
                                    <Card.Img variant="top" key={key.item}
                                              src={item.Poster === "N/A" ? 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' : item.Poster}
                                              height={300}/>
                                    <Card.Body>
                                        <Card.Title>{item.Title}</Card.Title>
                                        <Card.Text>
                                            <div>
                                                <p>{item.Year}</p>
                                                <p className={"text-uppercase"}>{item.Type}</p>
                                            </div>

                                        </Card.Text>
                                        <Button variant="primary" onClick={this.liatDetail.bind(this, item)}>See
                                            Detail</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                    </Row>
                </Container>
                <Modal
                    show={show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{TitleDetail}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className={'text-center'}>
                                <Image
                                    src={PosterDetail === "N/A" ? 'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' : PosterDetail}
                                    width={400} rounded/>
                            </div>
                            <br/>
                            <h4>Storyline</h4>
                            <p style={{textIndent: "50px", marginBottom: '15px'}}>{Plot}</p>
                        </div>
                        <div>
                            <h4>Details</h4>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Director : <span
                                style={{fontWeight: 'normal'}}>{Director}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Writer : <span
                                style={{fontWeight: 'normal'}}>{Writer}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Actors : <span
                                style={{fontWeight: 'normal'}}>{Actor}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Genre : <span
                                style={{fontWeight: 'normal'}}>{Genre}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Release Date : <span
                                style={{fontWeight: 'normal'}}>{Date}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Rating IMDb : <span
                                style={{fontWeight: 'normal'}}>{Rating}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Runtime : <span
                                style={{fontWeight: 'normal'}}>{Runtime}</span></h1>
                            <h1 style={{fontSize: "14px", fontWeight: 'bold'}}>Language : <span
                                style={{fontWeight: 'normal'}}>{Language}</span></h1>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Poster