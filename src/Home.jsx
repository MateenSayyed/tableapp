import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Home</title>
      </Helmet>

      <h2 className="text-2xl mb-4">User Data</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200">ID</th>
              <th
                className="py-2 px
              -4 border-b-2 border-gray-200"
              >
                Name
              </th>

              <th className="py-2 px-4 border-b-2 border-gray-200">Email</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Username</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Address</th>
              <th className="py-2 px-4 border-b-2 border-gray-200">Phone</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="bg-gray-100 border-b">
                <td className="py-2 px-4">{user.id}</td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.username}</td>
                <td className="py-2 px-4">
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                </td>
                <td className="py-2 px-4">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
