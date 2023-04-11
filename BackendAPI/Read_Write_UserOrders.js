import { db, auth } from "../firebase";
import { collection, getDocs, addDoc, Timestamp, query, where, orderBy } from "firebase/firestore"


const currentUser = auth.currentUser;

/** @returns {Array of Documents} - Get all orders for current user filtered by uid */
async function getOrders(){
    const orders = [];

    const userOrderRef = collection(db, "User Orders");
    const userOrders = query(userOrderRef, where("uid", "==", "User ID"), orderBy("Order_Date", "desc"));  //replace User ID with currentUser.uid once auth set up
    const querySnapshot = await getDocs(userOrders);
    querySnapshot.forEach((doc) => {
      orders.push(doc.data());
    });
    // return db.collection("User Orders").where("uid", "==", "User ID")
    //         .get()
    //         .then((querySnapshot) => {
    //           let newOrders = []
    //             querySnapshot.forEach((doc) => {
    //         // doc.data() is never undefined for query doc snapshots
    //               newOrders.push(doc.data())
    //            // console.log(doc.id, " => ", doc.data());
    //         });
    //         return newOrders;
    // })
    //     .catch((error) => {
    //         console.log("Error getting documents: ", error);
    //       });
     
    //console.log(orders)
    return orders;
}


/**
 * @param {object} orders - Object with food items as keys and price of as values
 * @param {string} restaurant - Restaurant name
 * @param {number} total_price - Total price of all food items
 * @returns {void} - return nothing, saves order to database
 */

async function saveOrder(orders, restaurant, total_price){

try {
  const docRef = await addDoc(collection(db, "User Orders"), {
    Order_Date: Timestamp.now(),
    Orders: orders,
    Restaurant: restaurant,
    Total_Price: total_price,
    uid: "User ID"    //replace with currentUser.uid once auth set up
  });

  console.log("Document written with ID: ", docRef.id);

} catch(error) {
  console.log(error)
}

}


export {getOrders, saveOrder};