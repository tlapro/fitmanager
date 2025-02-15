"use client";
import MenuAdmin from "@/components/MenuAdmin/MenuAdmin";
import UserInfo from "@/components/UserInfo/UserInfo";
import { getUsers } from "@/helpers/getUsers";
import { IUser } from "@/interfaces/IUser";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export default function Administration() {
  const [usersData, setUsersData] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos los usuarios");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>(usersData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setUsersData(sortedData);
      setFilteredUsers(sortedData)
    };

    fetchUsers();
  }, []);

  
  const normalizeText = (text: string) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);
    filterUsers(searchText, statusFilter);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchTerm("");
    const searchText = "";
    filterUsers(searchText, statusFilter);
  };

  const handleStatusFilter = (filter: string) => {
    setStatusFilter(filter);
    filterUsers(searchTerm, filter);
    setIsDropdownOpen(false);
    setCurrentPage(1);
  };

  const filterUsers = (searchText: string, filter: string) => {
    const filtered = usersData.filter((user) => {
      const normalizedUserName = normalizeText(user.name.toLowerCase());
      const matchesSearch = normalizedUserName.includes(searchText);
      const matchesActivity =
        filter === "Todos los usuarios" ||
        (filter === "Activos" && user.isActive) ||
        (filter === "Inactivos" && !user.isActive);
      return matchesSearch && matchesActivity;
    })
    

    setFilteredUsers(filtered);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col w-full justify-center items-center mt-20">
      <div className="flex flex-col md:flex-row w-full gap-4 p-4">
        <div className="w-full md:w-4/12">
          <h1 className="text-xl md:text-2xl font-bold">
            Panel Administración
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full md:w-6/12 gap-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              className="border-[1px] border-gray-200 rounded-full focus:outline-none hover:border-gray-300 focus:border-gray-400 p-2 w-full pr-10"
              placeholder="Ingresa un nombre"
            />
            {searchTerm && (
              <FaTimes
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 text-lg border-[1px] rounded-full bg-gray-100"
              />
            )}
          </div>
          <div className="relative w-full md:w-6/12">
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex justify-center items-center border-[1px] border-gray-200 rounded-full p-2 cursor-pointer hover:bg-gray-100 ${
                isDropdownOpen ? "bg-gray-100" : ""
              }`}
            >
              <span>{statusFilter === "Todos los usuarios" ? "Filtrar" : statusFilter}</span>
              <FaChevronDown size={10} className={`transform ${isDropdownOpen ? "rotate-180 ml-2" : "ml-2"}`} />
            </div>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <div
                  onClick={() => handleStatusFilter("Todos los usuarios")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Todos los usuarios
                </div>
                <div
                  onClick={() => handleStatusFilter("Activos")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Activos
                </div>
                <div
                  onClick={() => handleStatusFilter("Inactivos")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  Inactivos
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full gap-4 p-4">
        <MenuAdmin />

        <div className="w-full md:w-10/12 flex flex-col items-center border-[1px] border-gray-200 rounded-lg">
          <div className="grid md:grid-cols-4 w-full text-center bg-gray-100 border-gray-200 border-b-[1px] py-2">
            <div className="font-semibold">Nombre</div>
            <div className="font-semibold">Email</div>
            <div className="font-semibold">Estado de la Cuenta</div>
            <div className="font-semibold"></div>
          </div>
          <div className="w-full flex flex-col items-center border-gray-200">
            {currentUsers.map((user) => (
              <UserInfo
                key={user.id_user}
                id={user.id_user}
                email={user.email}
                name={user.name}
                active={user.isActive}
              />
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-4 mb-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded ${
                  currentPage === index + 1
                    ? "bg-gray-300"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
