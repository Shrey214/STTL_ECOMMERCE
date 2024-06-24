const Cart = require("../models/Cart");
const { use } = require("../routes/User");

// exports.createCart = async (req, res, next) => {
//   const items = req.body;
//   console.log("Inside cart creation", items);
//   const existingCart = await Cart.findOne({ user: req.user.id });
//   // console.log("Existing",existingCart)
//   if (existingCart) {

//     existingCart.updateOne({items:items});
//     return res
//       .status(201)
//       .json({ message: "Cart Updated", success: true });
//   }
//   // Validate the input
//   if (!items || items.length === 0) {
//     return res
//       .status(400)
//       .json({ message: "Items are required", success: false });
//   }

//   if (!Array.isArray(items)) {
//     if (!items._id || !items.price) {
//       return res.status(400).json({
//         message: "Each item must have a productId and price",
//         success: false,
//       });
//     } else {
//       const newCart = await Cart.create({ user: req.user.id, items });
//       if (!newCart) {
//         return res
//           .status(500)
//           .json({ message: "Cart creation failed, try again", success: false });
//       }

//       return res
//         .status(201)
//         .json({ message: "Cart created successfully", success: true, newCart });
//     }
//   } else {
//     // let i=0;
//     // Ensure each item has product and price
//     for (const item of items) {
//       // console.log(`item ${i}`,item)
//       if (!item._id || !item.price) {
//         return res.status(400).json({
//           message: "Each item must have a productId and price",
//           success: false,
//         });
//       }
//     }

//     // console.log(req.user.id);

//     const newCart = await Cart.create({ user: req.user.id, items });

//     if (!newCart) {
//       return res
//         .status(500)
//         .json({ message: "Cart creation failed, try again", success: false });
//     }
//     return res
//       .status(201)
//       .json({ message: "Cart created successfully", success: true, newCart });
//   }
// };

exports.createCart = async (req, res, next) => {
  const items = req.body;
  console.log("Inside cart creation", items);

  try {
    const existingCart = await Cart.findOne({ user: req.user.id });

    if (existingCart) {
      // Cart exists, update items
      existingCart.items.push(items); // Add new items to existing cart

      // Save the updated cart
      const updatedCart = await existingCart.save();

      return res
        .status(201)
        .json({ message: "Cart Updated", success: true, cart: updatedCart });
    }

    // Cart does not exist, create a new one
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Items are required", success: false });
    }

    // Validate items format
    if (!Array.isArray(items)) {
      if (!items._id || !items.price) {
        return res.status(400).json({
          message: "Each item must have a productId and price",
          success: false,
        });
      } else {
        // Create new cart with single item
        const newCart = await Cart.create({ user: req.user.id, items: [items] });

        if (!newCart) {
          return res
            .status(500)
            .json({ message: "Cart creation failed, try again", success: false });
        }

        return res
          .status(201)
          .json({ message: "Cart created successfully", success: true, newCart });
      }
    } else {
      // Validate each item in array
      for (const item of items) {
        if (!item._id || !item.price) {
          return res.status(400).json({
            message: "Each item must have a productId and price",
            success: false,
          });
        }
      }

      // Create new cart with array of items
      const newCart = await Cart.create({ user: req.user.id, items });

      if (!newCart) {
        return res
          .status(500)
          .json({ message: "Cart creation failed, try again", success: false });
      }

      return res
        .status(201)
        .json({ message: "Cart created successfully", success: true, newCart });
    }
  } catch (err) {
    console.error("Error creating/updating cart:", err);
    return res.status(500).json({ message: "Server Error", success: false });
  }
};


exports.getCartForUser = async (req, res, next) => {
  const usersCart = await Cart.findOne({ user: req.user.id });
  console.log(usersCart);
  if (!usersCart)
    return res
      .status(400)
      .json({ message: "User doesn't have any cart", success: false });

  return res
    .status(200)
    .json({ message: "cart fetched successfully", success: true, usersCart });
};
