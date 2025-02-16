
export interface ProductType {
  id: string;
  created_at: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  seller_address: string;
}

export interface ProductFiterType {
  id: number;
  filterbyTitle?: string;
  name?: string;
  sort?: string;
  icon?:  any;
  devider?: boolean;
}

export interface ProductCardProps {
  id?: string | number;
  color?: string;
  like: string;
  star: number;
  value?: string;
}
