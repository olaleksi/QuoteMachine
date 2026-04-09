import { useState,useEffect, useCallback } from "react";

const QuoteBody = () =>{

  const [quoteInfo, setQuoteInfo] = useState({text: "", author: ""});
  const [color, setColor] = useState("#000");
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
 


  const getQuote = useCallback(() => {
    setIsLoading(true);

    fetch("https://dummyjson.com/quotes/random?limit=1")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuoteInfo({
          text: data.quote || "No quote available",
          author: data.author || "Unknown",
        });

        let randColorIndex = Math.floor(Math.random() * colors.length);
        setColor(colors[randColorIndex]);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error.message);
        setQuoteInfo({
          text: error.message || "Failed to load quote. Please try again.",
          author: "Error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
 
  }, []);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  
  

  
  return (
    <div className="parent" style={{ backgroundColor: color }}>
      <div className="row justify-content-center mt-3 mb-3 container-body">
        <div className="col-8">
          <div id="quote-box">
            <p className="quotes" id="text" style={{ color: color }}>
              <i className="fa-solid fa-quote-left"></i>{" "}
              {quoteInfo.text || "Loading..."}
            </p>
            <span className="right-align" id="author" style={{ color: color }}>
              - {quoteInfo.author || "Loading..."}
            </span>

            <div className="social-medias">
              <div className="media">
                <a
                  href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(quoteInfo.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="tweet-quote"
                >
                  <i
                    class="fa-brands fa-twitter bg "
                    style={{ background: color }}
                  ></i>
                </a>
                <a
                  href={`https://www.tumblr.com/share/quote?quote=${encodeURIComponent(quoteInfo.text)}&source=${encodeURIComponent(quoteInfo.author)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    class="fa-brands fa-tumblr bg"
                    style={{ background: color }}
                  ></i>
                </a>
                <button
                  id="new-quote"
                  style={{ backgroundColor: color }}
                  onClick={getQuote}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "New Quote"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteBody;