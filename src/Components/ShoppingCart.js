// import React from 'react';
// import { connect } from 'react-redux';

// const ShoppingCart = ({ cartItems }) => {
//   return (
//     <div>
//       <h2>Shopping Cart</h2>
//       <ul>
//         {cartItems && cartItems.map((item, index) => (
//           <li key={index}>{item.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   cartItems: state.cart ? state.cart.items : [] // Check if state.cart is defined before accessing items
// });

// export default connect(mapStateToProps)(ShoppingCart);






// ShoppingCart.js
import React from 'react';
import { connect } from 'react-redux';

const ShoppingCart = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cart.items
});

export default connect(mapStateToProps)(ShoppingCart);
