import { useQuery } from "@tanstack/react-query";
import { Product } from "../components/Product";
import { Link } from "react-router-dom";

export type ProductType = {
  price: number;
  id: number;
  image: string;
  title: string;
  description: string;
}

export const Home = () => {

  const fetchProducts = async (): Promise<ProductType[]>  => {
    const res = await fetch('https://fakestoreapi.com/products?limit=15');
    const data = await res.json() as ProductType[]; // The res.json() function returns a Promise that resolves to any, which TypeScript cannot determine to be of type ProductType[] directly. To fix this issue, we add an explicit type assertion using 'as' to specify that the response will be an array of ProductType.
    return data;
  }

  const { data: products, isLoading, isError, error } = useQuery(['products'], fetchProducts)

  if (isError) {
    return <h1>Error fetching products: {JSON.stringify(error)}</h1>
  }

  return (
    <main>
      <h2>Our Products</h2>
      {!isLoading ? 
        <div className="product-list">
          {products.length > 0 ? products.map((product: ProductType) => (
            <Link key={product.id} to={`/products/${product.id}`} className="product-link">
              <Product title={product.title} image={product.image} price={product.price} />
            </Link>
          )) : <h3>Loading...</h3>}
        </div>
        : <h3 className="loading-msg">Loading...</h3>
      }
    </main>

  )
}