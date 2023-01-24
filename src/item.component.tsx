import React, { useEffect, useState } from 'react';
import { hackerNewsService } from './hackerNews.service';
import spinner from "./assets/grid.svg";

interface ItemProps {
    id: number;
}
interface storyDef {
    title: string;
    by: string;
    url: string;
}
export const Item = ({ id }:ItemProps) => {
    const [story, setStory] = useState<storyDef>({} as storyDef);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        hackerNewsService.item(id).then((results) => {
            return results.json();
          }).then((json) => {
            setStory(json);
            setLoading(false);
          });
    }, [])
    return (
        <div className='item'>
            {loading ? <React.Fragment><img src={spinner} className="spinner" alt='Loading...'/></React.Fragment>:
            <React.Fragment><a target="_blank" rel="noreferrer" href={story.url}><h2>{story.title}</h2></a>
            <small>by: {story.by} </small></React.Fragment>}
        </div>
    )
}

export default Item;