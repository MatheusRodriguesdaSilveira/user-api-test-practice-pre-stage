export interface ICreateServiceRequest {
  name: string;
  description: string;
  image: string;
  price: number;
  category_id: string;
}

export interface IUpdateServiceRequest {
  service_id: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  category_id?: string;
}
