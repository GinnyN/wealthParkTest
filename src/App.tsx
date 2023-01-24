import { useEffect, useState, useRef } from 'react';
import { hackerNewsService } from './hackerNews.service';
import Item from './item.component';
import './App.css';

const App = () => {
  const itemByPage = 10;
  const amountOfTitles = 100;
  const [itemArray, setItemArray] = useState([]);
  const [page, setPage] = useState(0);
  const [classAnimation, setClassAnimation] = useState('');
  const container = useRef<HTMLDivElement>({} as HTMLDivElement);

  useEffect(() => {
    hackerNewsService.topStories().then((results) => {
      return results.json();
    }).then((json) => setItemArray(json.slice(0, amountOfTitles)));
    container.current?.addEventListener('animationend', () => {
      setClassAnimation('');
    });
  }, [])

  const flipPage = (forward:boolean) => {
    if(forward) {
      setPage(page + itemByPage);
      setClassAnimation('fadeInRightClass');
    } else {
      setPage(page - itemByPage);
      setClassAnimation('fadeInLeftClass');
    }
  }

  return (
    <div className="App">
      <div><h1>HackerNews Top Stories</h1></div> 
        <div className={`container ${classAnimation}`} ref={container}>
          {itemArray.slice(page, page + itemByPage).map((itm, index) => <Item id={itm} key={index+page}></Item> )}
        </div> 
      <div className='paginator'>
        <button className='back' onClick={() => flipPage(false)} disabled={page <= 0}>⇐</button>
        <div>{(page/itemByPage) + 1}</div>
        <button className='forward' onClick={() => flipPage(true)} disabled={page+itemByPage >= 100}>⇒</button>
      </div>
    </div>
  );
}

export default App;
