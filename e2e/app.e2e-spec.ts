import { Gemmaa360Page } from './app.po';

describe('gemmaa360 App', function() {
  let page: Gemmaa360Page;

  beforeEach(() => {
    page = new Gemmaa360Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
