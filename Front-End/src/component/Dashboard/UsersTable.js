import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";

export default function UsersTable() {
  const [Users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost/api/getUsers.php")
      .then((response) => setUsers(response.data))
      .catch((error) =>
        console.error("There was an error fetching the Users!", error)
      );
  }, []);
  console.log(Users)

  const handleUpdate = (user) => {
    navigate(`/dashboard/AddUser`, {
      state: { id: user.id,password:user.password, ...user },
    });
  };

  const handleDelete = (user) => {
    axios.post("http://localhost/api/deleteUser.php", { id: user.id })

      .then(() => {
        setUsers((prevProducts) =>
          prevProducts.filter((p) => p.id !== user.id)
        );
      })
      .catch((error) =>
        console.error("There was an error deleting the user!", error)
      );
  };

  return (
    <div className="container p-6 mx-auto bg-[#111827] shadow-md min-h-[100vh]">
      <h2 className="mb-6 text-2xl font-bold text-center text-white">
        Users Table
      </h2>
      <table className="w-full overflow-hidden text-sm text-left text-gray-400 border border-gray-700 rounded-md">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Role</th>
            <th className="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {Users.length > 0 ? (
            Users.map((User, index) => (
              <tr
                key={index}
                className="transition duration-200 hover:bg-gray-500"
              >
                <td className="px-6 py-4 font-medium text-white whitespace-nowrap">
                  {User.Name}
                </td>
                <td className="px-6 py-4">{User.email}</td>
                <td className="px-6 py-4">{User.role}</td>
                <td className="flex items-center justify-center gap-4 px-6 py-4 text-center">
                  <button
                    onClick={() => handleUpdate(User)}
                    className="text-green-500 hover:text-green-700"
                  >
                    <FontAwesomeIcon icon={faPlus} title="Edit" />
                  </button>
                  <button
                     onClick={() => handleDelete(User)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faTrash} title="Delete" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="px-6 py-4 italic text-center text-gray-500"
              >
                No Users Found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
