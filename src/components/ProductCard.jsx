import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts";

export const ProductCard = ({ productDetails }) => {
  const { _id, title, price, discount, discountPrice, imageUrl } =
    productDetails;
  const {
    cartState: { cart, wishlist },
    cartDispatch,
  } = useCart();
  const navigate = useNavigate();
  const productInCart = cart.find((product) => product._id === _id);
  const productInWishlist = wishlist.find((product) => product._id === _id);

  return (
    <>
      <div className="card card-vertical flex-col shadow-1 br-s">
        <div className="card-media">
          <img src={imageUrl} alt="card media" />
        </div>
        <div className="card-badge">{discount}% off</div>
        <div className="card-nonmedia">
          <div className="card-details flex-col">
            <p className="text-center text-m">{title}</p>
            <p className="text-center text-bold text-l">
              ₹{discountPrice}{" "}
              <span className="text-s text-regular text-strike">₹{price}</span>
            </p>
          </div>
          <div className="card-actions">
            {productInWishlist ? (
              <button
                className="btn btn-s btn-fill br-s outline"
                onClick={() => navigate("/wishlist")}
              >
                Go to Wishlist
              </button>
            ) : (
              <button
                className="btn btn-s btn-fill br-s outline"
                onClick={() =>
                  cartDispatch({
                    type: "ADD_TO_WISHLIST",
                    payload: productDetails,
                  })
                }
              >
                Save to Wishlist
              </button>
            )}
            {productInCart ? (
              <button
                className="btn btn-s btn-fill br-s solid"
                onClick={() => navigate("/cart")}
              >
                Go to Cart
              </button>
            ) : (
              <button
                className="btn btn-s btn-fill br-s solid"
                onClick={() =>
                  cartDispatch({ type: "ADD_TO_CART", payload: productDetails })
                }
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
