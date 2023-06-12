// import React, { useState } from "react";
// import axios from "axios"; // Corrected import statement
// import { Link, useParams } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { role } = useParams();

//   async function handleSubmit() {
//     try {
//       await axios.post("http://localhost:5000/api/v1/signup", {
//         method: "Post",
//         email,
//         password,
//         role,
//       });
//     } catch (error) {
//       console.log("Error message is : ", error.message);
//     }
//   }

//   return (
//     <div>
//       <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="email"
//           >
//             Email:
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="email"
//             name="email"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="password"
//           >
//             Password:
//           </label>
//           <input
//             className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             type="password"
//             name="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <Link to={`/${role}`}>
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Login
//             </button>
//           </Link>
//           <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
//             Forgot Password?
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager"; // Import the utility functions

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { role } = useParams();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
        // role,
      });
      console.log("Response data is  : ", response);
      console.log("Logged in successfully!");
    } catch (error) {
      console.log("Error message: ", error.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Link to="/manufacture">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </Link>
          <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Forgot Password?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
