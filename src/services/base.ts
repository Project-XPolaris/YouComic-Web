export interface ListQueryContainer<T> {
  count: number;
  next: string;
  previous: string;
  page:number;
  pageSize:number;
  result: T[];
}


