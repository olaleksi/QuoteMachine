import { useState,useEffect } from "react";

const QuoteBody = () =>{

  const [quoteInfo, setQuoteInfo] = useState({});
  const [color, setColor] = useState("#000");

  useEffect(() => {
    getQuote();
  }, [])


  const getQuote = () => {
    fetch('https://api.quotable.io/random')
     .then((response) => {
       return response.json();
     })
    .then((data) => {
      setQuoteInfo({
        text: data.content,
        author: data.author
      })
      
    }); 

    
    var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

    let randColorIndex = Math.floor(Math.random() * colors.length);
    setColor(colors[randColorIndex]);
    
 
  };

  
  

  
  return(
    <div className="parent"  style={{backgroundColor: color}}>
    <div className="row justify-content-center mt-3 mb-3 container-body" >
        <div className="col-8">
          <div  id="quote-box">
                
                  <p className='quotes' id="text" style={{color: color}}>
                    <i className="fa-solid fa-quote-left"></i> {quoteInfo.text}
                  </p>
                 <span className="right-align" id="author" style={{color: color}}>
                  - {quoteInfo.author}
                 </span>
                

                <div className="social-medias">
                  <div className="media" >
                    <a href={"https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quoteInfo.text} target="_blank" id="tweet-quote"><i class="fa-brands fa-twitter bg " style={{background: color}}></i></a>
                    <a href="" target="_blank" ><i class="fa-brands fa-tumblr bg" style={{background: color}}></i></a>
                    <a href="#" id="new-quote" style={{backgroundColor: color}} onClick={getQuote}>New Quote</a>
                  </div>
                  
                </div>
          </div>

          
        </div>
      </div>
      </div>
  )
}

export default QuoteBody;