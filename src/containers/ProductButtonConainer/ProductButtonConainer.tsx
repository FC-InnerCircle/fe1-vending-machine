import { useContext } from "react";
import VendingMachineContext from "../../context/VendingMachineContext";
import { ProductButton } from "../../components";

const ProductButtonConainer = () => {
  const { products, buyProduct, showProductPrice, hideProductPrice } =
    useContext(VendingMachineContext);

  return (
    <div className="w-full h-4/5 mx-auto">
      <div className="w-full h-full grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductButton
            onClick={() => buyProduct(product.getName())}
            key={product.getName()}
            onMouseDown={() => showProductPrice(product.getName())}
            onMouseUp={() => hideProductPrice(product.getName())}
          >
            {product.getName()}
          </ProductButton>
        ))}
      </div>
    </div>
  );
};

export default ProductButtonConainer;
