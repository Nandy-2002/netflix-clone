import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'


const TitleCards = ({title,category}) => {
  

const [apiData,setApiDate] = useState([])
const cardsRef=useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Y2RkNzQxNGRjZGZkOWUwZmZlMGRmMjYwNjZjYmFlNyIsIm5iZiI6MTc1NDI3Mjc1OS45MjksInN1YiI6IjY4OTAxM2Y3ODk5ZjQwZWZkZjdjZjZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iwDnybWbz4GgQjgIolybTDG5lyxm1V6iI2IDaBUDc-A'
  }
};



const handleWheel=(event)=>{
  event.preventDefault();
  cardsRef.current.scrollLeft+=event.deltaY;
}

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiDate(res.results))
  .catch(err => console.error(err));

  cardsRef.current.addEventListener("wheel",handleWheel)
},[category])


  return (
    <div className='title-cards'>
      <h2>{title?title:"Popluar on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`} className="card" key={index}>
                  <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                  <p>{card.original_title}</p>
            </Link>
           
        })}
      </div>
      </div>
  )
}

export default TitleCards
