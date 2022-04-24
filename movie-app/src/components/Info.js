import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap'

let api_key = "?api_key=9a12f7bf2a75b481ed2612d8faf63a35";
let baseUrl = "https://api.themoviedb.org/3";
let img_path="https://image.tmdb.org/t/p/w500";



const Info = () =>{
    const params = useParams();
    let id = params.id;
    let url = baseUrl+"/movie/"+id+api_key;

    const navigate = useNavigate();

    const [ movie, setMovie] = useState(url);
    

    useEffect(()=>{
        fetch(url).then(res=>res.json()).then(data=>{
            setMovie( data);
            //console.log("Ran fetch");
        });
    }, [url])
    return (
        <div>
            
            <Card className="text-center mx-auto" style={{ width: '42rem' }}>
                <Card.Header>About this movie</Card.Header>
                <Card.Img variant="top" src={img_path + movie.backdrop_path}/>
                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                        {movie.tagline}
                        <hr/>
                        {movie.overview}
                        <hr/>
                        <em>Release Date:</em> {movie.release_date}
                        <hr/>
                        <em>Runtime (minutes):</em> {movie.runtime}
                        <hr/>
                        <em>Rating:</em> {movie.vote_average}
                        <hr/>
                    </Card.Text>
                    <Button variant="primary" onClick={()=>{navigate("/")}}>Go back</Button>
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
            </Card>
        </div>
    )
}

export default Info