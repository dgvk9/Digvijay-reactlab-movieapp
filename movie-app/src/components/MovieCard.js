import React from 'react';
import {Card, Button, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';


const MovieCard = (movie) =>{
    //console.log(movie.info)
    let img_path="https://image.tmdb.org/t/p/w500";
 

    return (
        <div>
            
                <Col key={movie.info.id} className='d-flex align-items-stretch my-3'>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={img_path+movie.info.poster_path} />
                            <Card.Body>
                                <Card.Title >{movie.info.title}</Card.Title>
                                <div className='d-flex justify-content-between'>
                                        <Button variant="outline-info"
                                        onClick={() => movie.handleFavouritesClick(movie.info)}
                                        >
                                            Add to favorite
                                        </Button>
                                    <Link to={`/info/${movie.info.id}`}>
                                        <Button variant="outline-info" className='mx-3'>More</Button>
                                    </Link>                             
                                </div>  
                            </Card.Body>
                        </Card>
                </Col>
        </div>
    )
}

export default MovieCard