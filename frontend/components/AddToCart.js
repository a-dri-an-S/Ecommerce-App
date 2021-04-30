import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';
import { useCart } from '../lib/cartState';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const { openCart } = useCart();
  return (
    <button
      disabled={loading}
      type="button"
      onClick={addToCart}
      onMouseUp={openCart}
    >
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}

AddToCart.propTypes = {
  id: PropTypes.string,
};
