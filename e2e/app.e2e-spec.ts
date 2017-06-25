import { TwentyOnePointsVisualisedPage } from './app.po';

describe('twenty-one-points-visualised App', () => {
  let page: TwentyOnePointsVisualisedPage;

  beforeEach(() => {
    page = new TwentyOnePointsVisualisedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
