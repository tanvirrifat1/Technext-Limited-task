import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState("selected");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://dummyjson.com/users/search?q=${searchQuery}`
        );

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
  }, [searchQuery]);

  const sortUsers = (sortBy) => {
    let sortedUsers = [...users.users];
    if (sortBy === "firstName") {
      sortedUsers = sortedUsers.sort((a, b) =>
        a.firstName.localeCompare(b.firstName)
      );
    } else if (sortBy === "email") {
      sortedUsers = sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortBy === "companyName") {
      sortedUsers = sortedUsers.sort((a, b) =>
        a.company.name.localeCompare(b.company.name)
      );
    }
    setUsers({ ...users, users: sortedUsers });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    sortUsers(event.target.value);
  };

  const data = localStorage.getItem("booking");
  const parsedData = JSON.parse(data);

  console.log(users);

  return (
    <div className="p-2">
      <section className="py-20 container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
                Profiles Here
              </h2>
              {/* <p className="text-base text-body-color">
                A Phone service offer generally refers to the products or
                services offered by a company or organization in the context of
                Mobile. These services may include
              </p> */}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="flex justify-between">
          <div className="relative my-6">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 ">
              <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 text-black"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none border border-black text-black"
            />
          </div>
          {/*  */}

          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="select select-bordered w-full max-w-xs border border-black text-black"
          >
            <option selected>Select</option>
            <option value="firstName">Name</option>
            <option value="email">Email</option>
            <option value="companyName">Company Name</option>
          </select>
        </div>
        {/*  */}
        {isLoading && <p className="text-center text-2xl">Loading...</p>}
        <div className="w-full container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
          {users?.users?.slice(0, 12).map((service) => (
            <div
              key={service?.id}
              className="w-full max-w-sm overflow-hidden bg-white text-black border border-slate-950 p-4 rounded-md hover:shadow-xl"
            >
              <img
                className="object-cover object-center w-full "
                src={service?.image}
                alt="avatar"
              />

              <div className="px-6 py-4">
                <h1 className="text-xl font-semibold bg-white text-black">
                  <Link to={`/details/${service?.id}`}>
                    Name : {service?.firstName + service?.lastName}
                  </Link>
                </h1>

                <p className="py-2 bg-white text-black">
                  Email: {service?.email}
                </p>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="suitcase icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 11H10V13H14V11Z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.company?.name}</h1>
                </div>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="location pin icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.address?.address}</h1>
                </div>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="email icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.email}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/*  */}

        <div className="w-full mt-2 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
          {parsedData?.map((service) => (
            <div
              key={service?.id}
              className="w-full max-w-sm overflow-hidden bg-white text-black border border-slate-950 p-4 rounded-md hover:shadow-xl"
            >
              <img
                className="object-cover object-center w-full h-80"
                src={service?.imageUrl}
                alt="avatar"
              />

              <div className="px-6 py-4">
                <h1 className="text-xl font-semibold bg-white text-black">
                  Name : {service?.firstName + service?.lastName}
                </h1>

                <p className="py-2 bg-white text-black">
                  Email: {service?.email}
                </p>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="suitcase icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M14 11H10V13H14V11Z" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7 5V4C7 2.89545 7.89539 2 9 2H15C16.1046 2 17 2.89545 17 4V5H20C21.6569 5 23 6.34314 23 8V18C23 19.6569 21.6569 21 20 21H4C2.34314 21 1 19.6569 1 18V8C1 6.34314 2.34314 5 4 5H7ZM9 4H15V5H9V4ZM4 7C3.44775 7 3 7.44769 3 8V14H21V8C21 7.44769 20.5522 7 20 7H4ZM3 18V16H21V18C21 18.5523 20.5522 19 20 19H4C3.44775 19 3 18.5523 3 18Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.company}</h1>
                </div>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="location pin icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.address}</h1>
                </div>

                <div className="flex items-center mt-4 bg-white text-black">
                  <svg
                    aria-label="email icon"
                    className="w-6 h-6 fill-current"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z"
                    />
                  </svg>

                  <h1 className="px-2 text-sm">{service?.email}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
