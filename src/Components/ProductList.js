// import React from 'react';
// import { connect } from 'react-redux';
// import { addToCart } from '../actions/cartActions';

// const ProductList = ({ products, addToCart }) => {
//   return (
//     <div>
//       <h2>Products</h2>
//       <ul>
//         {products && products.map((product, index) => ( // Check if products is defined before mapping
//           <li key={index}>
//             {product.name} - ${product.price}
//             <button onClick={() => addToCart(product)}>Add to Cart</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   products: state.products
// });

// export default connect(mapStateToProps, { addToCart })(ProductList);


// ProductList.js
import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

const ProductList = ({ products, addToCart }) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, { addToCart })(ProductList);
