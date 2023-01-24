import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
const renderer = require('react-test-renderer');
import App from './App';
import Item from './item.component';
/*import { hackerNewsService } from './hackerNews.service';

jest.mock("./hackerNews.service", () => ({
  topStories: jest.fn().mockImplementation(() => {
    return Promise.resolve({ json: Promise.resolve([34486699,34487232,34473742,34485871,34485959,34487066,34486824,34480864,34487875])});
  }),
  item: jest.fn().mockImplementation(() => {
    return Promise.resolve({ json: Promise.resolve({"by":"dwardu","descendants":49,"id":34487066,"kids":[34487442,34488446,34488937,34488853,34488324,34487358,34487449,34488246,34489308,34487321,34488407,34488010,34488136,34487500,34487280,34487277,34488179,34487294],"score":95,"time":1674467343,"title":"macOS CLI tool to configure multi-display resolutions and arrangements","type":"story","url":"https://github.com/jakehilborn/displayplacer"})});
  }),
}));*/


describe('Renders First Page', () => {
  act(() => {
    render(<App />);
  })
  const titleElement = screen.getByText('HackerNews Top Stories');
  const backButton = screen.getByText(/⇐/i).closest('button');
  const forwardButton = screen.getByText(/⇒/i).closest('button');

  it("Title h1 in document", () => expect(titleElement).toBeInTheDocument());
  it("Button Back be disabled", () => expect(backButton).toBeDisabled());
  it("Button Forward be Enabled", () => expect(forwardButton).not.toBeDisabled());
});

describe('Snapshot First Page', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
    waitFor(() => {
      it("First Load Match Snapshot", () => expect(tree).toMatchSnapshot());
    })
});

describe('Calling Top Stories', () => {
  var saveTitle, save2ndTitle: HTMLCollection;
  var appRender: any;
  var items: any[];
  it("Items rendered first time", async () => {
    appRender = await act(() => {
      return render(<App />);
    });
    return waitFor(() => {
      items = appRender.container.getElementsByClassName('item');
      saveTitle = appRender.container.getElementsByClassName('container');
      return expect(items.length).toBe(10);
    
    });
  });
  it("Items changed after button click", async () => {
    appRender = await act(() => {
      return render(<App />);
    });
    return waitFor(() => {
      act(() => {
        fireEvent.click(appRender.container.getElementsByClassName('forward')[0]);
      });
      save2ndTitle = appRender.container.getElementsByClassName('container')
      return expect(save2ndTitle).not.toBe(items)
    });
  });
});

describe('Rendering Item', () => {
  const appRender = render(<Item id={5888} ></Item>);
  waitFor(() => {
    const item = appRender.container.getElementsByClassName('item');
    const heading = appRender.getByRole('heading', {level: 2});
    it("Render 1 item", () => expect(item.length).toBe(1));
    it("Header Exists", () => expect(heading).toBeTruthy());
  });
});

describe('Snapshot Item',  () => {
  const tree = renderer
    .create(<Item id={5888} />)
    .toJSON();
    waitFor(() => {
      it("Snapshot for item 5888 are equal", () => expect(tree).toMatchSnapshot());
    })
});
