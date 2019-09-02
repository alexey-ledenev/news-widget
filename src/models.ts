import { parseImageSrc } from './utils';

export interface INewsItem {
  id: number,
  title: string,
  subtitle: string,
  image: string,
  date: string,
  url: string
}

export class NewsItem implements INewsItem {
  id = 0;

  title = '';

  subtitle = '';

  image = '';

  date = '';

  url = '';

  constructor(id: number,
    title: string,
    subtitle: string,
    image: string,
    date: string,
    url:string) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.image = parseImageSrc(image);
    this.date = (new Date(date)).toLocaleString('ru');
    this.url = url;
  }
}
