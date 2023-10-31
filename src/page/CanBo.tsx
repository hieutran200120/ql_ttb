import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Delete_CanBo from "../components/Delete_CanBo";
import { Edit_CanBo } from "../components/Edit_CanBo";
interface Task {
    Ma_CB: number;
    TaiKhoan: string;
    Ten_CB: string;
    GioiTinh: number;

}
const CanBo = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isListInView1, setIsListInView1] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const token = sessionStorage.getItem("name");


    const pageSize = 4;

    const fetchTasks = async (page: number) => {
        try {
            const response = await axios.get(`https://unleashed-reminiscent-wash.glitch.me/api/can-bo`, {
                params: { offset: page, limit: pageSize }, // Sử dụng limit và offset
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const responseData: Task[] = response.data.data.data;
            setTasks(responseData);
            setTotalPages(response.data.data.totalPages);
            console.log(responseData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage, token]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleTaskDeleted = () => {
        fetchTasks(currentPage);
    };
    const handleTaskPut = () => {
        fetchTasks(currentPage);
    };
    return (
        <>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-900">
                    <div>
                    </div>
                    <label className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tên cán bộ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                tài khoản
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Giới tính
                            </th>
                            <th scope="col" className="px-6 py-3">
                                hành động
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">{task.Ten_CB}</div>

                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {task.TaiKhoan}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className={`h-2.5 w-2.5 rounded-full ${task.GioiTinh === 1 ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                                        {task.GioiTinh === 1 ? 'Nam' : 'Nữ'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        <Delete_CanBo task={task} onDelete={handleTaskDeleted} />
                                        <Edit_CanBo task={task} onPut={handleTaskPut} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>

    )
}

export default CanBo