import axios from "axios";
import React, { useEffect, useState } from "react";

function Manufacturer() {
  const [orderID, setOrderID] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [transporter, setTransporter] = useState("");
  const [replyMessage, setReplyMessage] = useState("");
  const [data, setData] = useState("");

  const handletransportId = (e) => {
    setTransporter(e.target.value);
    console.log("ID IS = ");
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/manufacturer",
        {
          method: "Post",
          orderID: "ABC12",
          to: "Shree Prakash",
          from: "Sachin",
          quantity: 1,
          address: "6481c681e46fb97d6fd98e1e",
          transporter: "6481c6c8e46fb97d6fd98e21",
          replyMessage: "My transporter quantity is two",
          role: "Manufacturer",
        }
      );
      console.log(
        "fileds data : ",
        orderID,
        to,
        from,
        quantity,
        address,
        transporter,
        replyMessage
      );
      console.log("Data is  : ", data);
    } catch (error) {
      console.log("error message : ", error.message);
    }
    // // Reset the form after submission if needed
    // resetForm();
  };

  async function fetchAllTransporter() {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/v1/fetchAllTransporter"
      );
      console.log(" Transporter data : ", data);
      setData(data);
    } catch (error) {
      console.log("Error message : ", error.message);
    }
  }
  async function fetchAllTransporterreply() {
    try {
      const data = await axios.get(
        "http://localhost:5000/api/v1/Alltransporter"
      );
      console.log(" Transporter data : ", data);
      setData(data);
    } catch (error) {
      console.log("Error message : ", error.message);
    }
  }
  const resetForm = () => {
    setOrderID("");
    setTo("");
    setFrom("");
    setQuantity("");
    setAddress("");
    setTransporter("");
    setReplyMessage("");
  };

  useEffect(() => {
    fetchAllTransporter();
    fetchAllTransporterreply();
  }, []);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Order Form</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="orderID"
          >
            Order ID:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={orderID}
            onChange={(e) => setOrderID(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="to"
          >
            To:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="from"
          >
            From:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Address:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dropdown"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Transporter:
          </label>
          <select
            name="transporter"
            id="transporter"
            value={transporter}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handletransportId}
          >
            {data?.data?.data?.map((item) => {
              return (
                <option key={item._id} value={item?._id}>
                  <h1>{item.name}</h1>
                </option>
              );
            })}
          </select>
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
      <div>
        {data?.data?.data?.map((item) => (
          <div>
            <h1>{item.price}</h1>
            <h1>{item.replyMessage}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manufacturer;
