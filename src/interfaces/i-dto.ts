export interface IReposDto {
  total_count: number;
  incomplete_results: boolean;
  items: IReposItem[];
}

export interface IReposItem {
  id: string;
  name: string;
  html_url: string;
  description: string;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}
