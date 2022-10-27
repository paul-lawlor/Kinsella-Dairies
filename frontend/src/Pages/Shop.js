import ProductList from "../Components/ProductList";
import Basket from "../Components/Basket";

export default function Shop() {
  return (
    <>
      <h1 className='mx-3 mt-3'> Shop </h1>
      <div className="basket">
        <ProductList/>
        <Basket/>
      </div>
    </>
  );
}
