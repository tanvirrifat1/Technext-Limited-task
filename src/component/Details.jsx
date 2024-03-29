import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <p className="text-center items-center mt-10 text-2xl">Loading</p>;
  }

  return (
    <div>
      <div className="min-h-[85vh]">
        <div className="md:w-[700px] hero-content  flex-col lg:flex-row mx-auto flex space-x-10 my-10 border-4 border-indigo-700 p-5 rounded ">
          <div className="rounded-xl">
            <img
              src={users?.image}
              alt=""
              className="object-cover object-center w-full rounded-t-md  dark-bg-gray-500"
            />
          </div>
          <div className="space-y-2">
            <h1 className="flex">
              <strong className="w-[115px]">Name</strong>{" "}
              <span>: {users?.firstName + users?.lastName}</span>
            </h1>

            <h1 className="flex">
              <strong className="w-[115px]">Email</strong>{" "}
              <span>: {users?.email}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">Address</strong>{" "}
              <span>: {users?.address?.address}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">CompanyName</strong>{" "}
              <span>: {users?.company?.name}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">City</strong>{" "}
              <span>: {users?.address?.city}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">Gender</strong>{" "}
              <span>: {users?.gender}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
