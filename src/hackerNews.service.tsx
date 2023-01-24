export class hackerNewsService {
    static topStories = () => {
        return fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    }

    static item = (id:number) => {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    }
}