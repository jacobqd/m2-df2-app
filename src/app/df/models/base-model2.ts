export class BaseModel2<T> {

  code: number;
  message: string;
  result: {
    pageNum: string;
    pageSize: string;
    size: string;
    orderBy: string;
    startRow: string;
    endRow: string;
    total: string;
    pages: string;
    list: Array<T>;
  };
}
