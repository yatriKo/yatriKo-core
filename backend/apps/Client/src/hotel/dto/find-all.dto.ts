export class FindAllDto<T> {
  data: T[];
  meta: { limit: number; offset: number; total: number };
}
