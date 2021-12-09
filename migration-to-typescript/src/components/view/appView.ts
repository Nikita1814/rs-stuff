import { ArtResp, SourceResp } from "../controller/loader";
import News from "./news/news";
import Sources from "./sources/sources";

export class AppView {
  private news: News;
  private sources: Sources;
  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: Readonly<ArtResp>) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: Readonly<SourceResp>) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
