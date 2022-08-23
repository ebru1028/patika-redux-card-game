import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCards } from "../../redux/playground/playgroundSlice";
import { useSelector } from "react-redux";

import { updateCard } from "../../redux/playground/playgroundSlice";
import { playgroundSelectors } from "../../redux/playground/playgroundSlice";

function List() {
  const [shuffleCards, setShuffleCards] = useState([]);
  const [shuffelState, setShuffelState] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);

  const dispatch = useDispatch();

  const cards = useSelector(playgroundSelectors.selectAll);

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  useEffect(() => {
    if (!shuffelState && cards.length > 0) {
      shuffle(cards);
    }
  }, [cards]);

  useEffect(() => {
    
    if(shuffleCards.filter(card => card.complete === true).length == (shuffleCards.length-1))
    {
      alert("tebrikler hepsini bildiniz...  "+score+" puan aldınız");
      return
    }

    if (selectedCards.length === 2) {

      //seçilen iki kartın isimleri aynı ise kartları complete ediyoruz
      if (selectedCards[0].name === selectedCards[1].name &&
        selectedCards[0].id !== selectedCards[1].id) {
        for (let i = 0; i < selectedCards.length; i++) {
          var id = selectedCards[i].id;
          completeCard(id);
        }

        setSelectedCards([]);
        setScore(score + 50);
        console.log("Completed: "+shuffleCards.filter(card => card.complete === true).length);
        return;
      }

      //Seçilem iki kart eşleşmiyorsa kartları kapatıyoruz ve temizliyoruz
      for (let i = 0; i < selectedCards.length; i++) {
        
        setTimeout(function(){
          var id = selectedCards[i].id;
          closeCard(id);
        }, 1000)
        
      }

      console.log("temizle");
      setSelectedCards([]);
      setScore(score - 10); 

      return;
    }
  }, [selectedCards]);

  const closeCard = (id) => {
    setShuffleCards((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return { ...obj, close: true };
        }

        return obj;
      })
    );
  };

  const openCard = (id) => {
    setShuffleCards((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return { ...obj, close: false };
        }

        return obj;
      })
    );
  };

  const completeCard = (id) => {
    setShuffleCards((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          return { ...obj, complete: true };
        }

        return obj;
      })
    );
  };

  const shuffle = (array) => {
    setShuffelState(true);

    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    setShuffleCards(array);
  };

  const HandleSubmit = (event, id) => {
    event.preventDefault();
    if (!id) return false;

    setShuffleCards((current) =>
      current.map((obj) => {
        if (obj.id === id) {
          setSelectedCards([obj].concat(selectedCards));
          return { ...obj, close: false };
        }

        return obj;
      })
    );
  };

  return (
    <div className="playground">
      {shuffleCards.map((item, i) => (
        <a
          href="#"
          key={`${i}`}
          className={`card ${item.close ? "" : "opened"}`}
          onClick={(e) => HandleSubmit(e, item.id)}
        >
          <div className="front">?</div>
          <div className="back">
            <img alt={`${item.name}`} src={`${item.imgUrl}`} />
          </div>
        </a>
      ))}
      {
        shuffleCards.filter(card => card.complete === true).length == (shuffleCards.length-1) &&
         <a href="#"
         className="restart-btn"
         onClick={() => window.location.reload(false)}
         >Yeniden Oyna</a>
               
      }
      
    </div>
  );
}

export default List;
