import { useEffect, useState } from 'react';
import { Nav, Navbar, Container, Form, Button, FormControl, Row} from 'react-bootstrap'
import MovieCard from './MovieCard';
import FavouriteMovieCard from './FavouriteMovieCard'

let api_key = "&api_key=9a12f7bf2a75b481ed2612d8faf63a35";
let baseUrl = "https://api.themoviedb.org/3";
let url = baseUrl+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+api_key;

let arr = ["Movies in theater", "Coming soon", "Top rated movies" , "Kids"];



const Main = ()=>{
    const [ movieData, setData] = useState([]);
    const [ url_set, setUrl ] = useState(url);
    const [ search, setSearch ] = useState('');
    const [favourites, setFavourites] = useState([]);


    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            //console.log("Ran fetch");
            setData( data.results );
        });
    }, [url_set])

    //local storage
    useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		setFavourites(movieFavourites);
	}, []);

    const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};


    const getData = (movieType) =>{
        if(movieType==="Movies in theater"){
            url= baseUrl+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+api_key;
        }else if (movieType==="Coming soon") {
            url= baseUrl+"/movie/upcoming?"+api_key;
        }else if (movieType==="Top rated movies") {
            url= baseUrl+"/discover/movie?sort_by=popularity.desc"+api_key;
        }else if (movieType==="Kids") {
            url= baseUrl+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+api_key;
        }
    
        setUrl(url)
    }

    const searchMovie = (evt)=>{
        if (evt.key==="Enter"){
            evt.preventDefault();
            //console.log("Hello"); 
            url= baseUrl+"/search/movie?"+api_key+"&query="+search
            setUrl(url);
            setSearch("");
        }
        
    }

    const showMovie = ()=>{

        if(search.length!==0){
            url= baseUrl+"/search/movie?"+api_key+"&query="+search
            setUrl(url);
            setSearch("");
        }
        setUrl(url);
    };

    const addFavouriteMovie = (movie) => {
        let isAdded = favourites.includes(movie)

        if (isAdded){
            window.alert("Movie has been already added!")
        } else{
            const newFavouriteList = [...favourites, movie];
            setFavourites(newFavouriteList);
            saveToLocalStorage(newFavouriteList);
            window.alert("Movie has been successfully added!")
        }
		
	};
    

    const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter( 
			(favourite) => favourite.id !== movie.info.id
		);

		setFavourites(newFavouriteList);
        saveToLocalStorage(newFavouriteList);
        window.alert("Movie has been successfully removed!")

	};
    console.log(favourites);

    return (
        <>
            <div className='header'>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            {
                                arr.map((value, idx)=>{
                                    return(
                                        <Nav.Link href="#" name={value} onClick={(e)=>getData(e.target.name)} key={idx}>
                                            {value}
                                        </Nav.Link>
                                    )
                                })
                            }
                        </Nav>
                        <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search movies"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e)=>{setSearch(e.target.value)}}
                                value={search}
                                onKeyPress={searchMovie}
                        
                            />
                            <Button variant="outline-success" 
                                value={search}
                                onClick={showMovie}
                            >
                                Search
                            </Button> 
                        </Form>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
            <div className='d-flex justify-content-between'>
                <h2 className='mx-2'>Movies</h2>
                <div className='mx-3'><a href='#fav' type="button" className="btn btn-outline-success btn-sm" >Go To Favorites</a></div>
                
            </div>
            
            <div className='container'>
            
             {    
                <Row xs={2} md={4} className="g-4">
                {
                    (movieData.length===0)?<p className='notfound'>Not Found</p>: movieData.map((res, pos)=>{
                        return(
                                <MovieCard info={res} key={pos} handleFavouritesClick={addFavouriteMovie}/>
                        )
                    })
                
                }
                </Row>
                }
            </div>
            {/* Favorites section */}
            <h2 id='fav' className='mx-2'>My Favorites</h2>
            <div className='container'>
            {    
                <Row xs={2} md={4} className="g-4">
                {
                    (favourites.length===0)?<p className='notfound'>No Favourites Found</p>: favourites.map((res, pos)=>{
                        return(
                                <FavouriteMovieCard info={res} key={pos} handleFavouritesClick={removeFavouriteMovie}/>
                        )
                    })
                
                }
                </Row>
                }
            </div>
        
        </>
    )
}

export default Main;