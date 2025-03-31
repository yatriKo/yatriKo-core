export class FindAllDto<T> {
  data: T[];
  meta: { limit: number; offset: number; total: number };

  constructor(data: T[], limit: number, offset: number, total: number) {
    this.data = data;
    this.meta = { limit, offset, total };
  }
}
