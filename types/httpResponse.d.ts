declare namespace HttpResponse {
  interface Base<T> {
    data: T;
  }

  /** 自定义接口回调 */
  interface Callback<T> extends Base<T> {
    code: number;
    message: string;
  }

  interface ResultCallback<T> extends Callback<T> {
    data: {
      results: T[];
      total: number;
    };
  }

  interface Pagination<T> extends Callback<T> {
    data: {
      results: T[];
      pageInfo: {
        hasMore: boolean;
        prevCursor: string;
        nextCursor: string;
        direction: Consume.Direction;
      };
    };
  }
}
