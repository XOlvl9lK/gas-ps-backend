import { Chapter } from '../../entities/Chapter';
import { Article } from '../../entities/Article';

export class NodesDto {
  id: number;
  title: string;
  type: 'chapter' | 'article';
  parentId?: number;
  chapterId?: number;

  constructor(node: Chapter | Article) {
    this.id = node.id;
    this.title = node.title;
    if (node instanceof Chapter) {
      this.parentId = node?.parentId
      this.type = 'chapter'
    } else {
      this.chapterId = node?.chapterId
      this.type = 'article'
    }
  }
}