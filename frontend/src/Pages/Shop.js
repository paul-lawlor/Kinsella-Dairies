import ProductList from "../Components/ProductList";
import Basket from "../Components/Basket";

export default function Shop() {
  return (
    <>
      <h1> shop </h1>
      <div className="basket">
        <ProductList></ProductList>
        <Basket></Basket>
      </div>
    </>
  );
}
