import axios from "axios";
import React, { useEffect, useState } from "react";

function Transporter() {
  const [orders, setOrders] = useState("");
  const [data, setdata] = useState("");
  const [price, setPrice] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/manufacturer",
        {
          method: "Post",
          orders,
          price,
          replyMessage,
        }
      );
      console.log("All data is : ", orders, price, replyMessage);
      setdata(data);
      console.log("data is all about ", data);
    } catch (error) {
      console.log("Error message : ", error.message);
    }
    resetForm();
  };

  const resetForm = () => {
    setOrders("");
    setPrice("");
    setReplyMessage("");
  };
  async function fetchAllManufacture() {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/v1/allmanufacturer"
      );
      console.log("All is data : ", data);
      setdata(data);
    } catch (error) {
      console.log("ERROR Message : ", error.message);
    }
  }
  useEffect(() => {
    fetchAllManufacture();
  }, []);
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="orders"
          >
            Orders:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={orders}
            onChange={(e) => setOrders(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="price"
          >
            Price:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="replyMessage"
          >
            Reply Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>

      <div className="mt-8">
        {data?.data?.data?.map((item) => (
          <div className="bg-gray-200 p-4 rounded mb-4" key={item._id}>
            <h1 className="font-bold">Order ID: {item.orderID}</h1>
            <p className="mb-2">Address: {item.address.address}</p>
            <p className="mb-2">Quantity: {item.quantity}</p>
            <p>Reply Message: {item.replyMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transporter;
