import { BookListModelStateType } from '@/pages/book/list/model';
import { DetailModelStateType } from '@/pages/book/detail/model';
import { ReadPageModelStateType } from '@/pages/book/read/model';
import { LoginModelStateType } from '@/pages/user/login/model';
import { RegisterModelStateType } from '@/pages/user/register/model';
import { UserStateType } from '@/models/user';
import { CollectionListModelStateType } from '@/pages/collection/list/model';
import { LayoutModelStateType } from '@/models/layout';
import { CollectionDetailModelStateType } from '@/pages/collection/detail/model';
import { TagDetailModelStateType } from '@/pages/tag/detail/model';
import { HomeModelStateType } from '@/pages/home/model';
import { SearchModelStateType } from '@/pages/search/model';
import { SearchBooksModelStateType } from '@/pages/search/books/model';
import { SearchTagsModelStateType } from '@/pages/search/tags/model';
import { SearchCollectionsModelStateType } from '@/pages/search/collections/model';

export interface ConnectType {
  bookList: BookListModelStateType
  bookDetail: DetailModelStateType
  bookRead: ReadPageModelStateType
  login: LoginModelStateType
  register: RegisterModelStateType
  user: UserStateType
  collectionList: CollectionListModelStateType
  layout: LayoutModelStateType
  collectionDetail: CollectionDetailModelStateType
  tagDetail: TagDetailModelStateType
  home: HomeModelStateType
  search: SearchModelStateType
  searchBooks:SearchBooksModelStateType
  searchTags:SearchTagsModelStateType
  searchCollections:SearchCollectionsModelStateType
}
