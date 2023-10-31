import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
interface Task {
    Ma_CB: number;
    TaiKhoan: string;
    Ten_CB: string;
    GioiTinh: number;

}
interface DeleteTaskProps {
    task: Task;
    onDelete: () => void;
}
const Delete_CanBo: React.FC<DeleteTaskProps> = ({ task, onDelete }) => {
    const [openModal, setOpenModal] = useState<string | undefined>(undefined);
    const [tasks, setTasks] = useState<Task[]>([]);
    const token = sessionStorage.getItem("name");
    const DeleteTasks = async (Ma_CB: number) => {
        try {
            const response = await axios.delete(`https://localhost:7259/api/ToDo/${Ma_CB}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            setOpenModal(undefined);
            const responseData: Task[] = response.data.items;
            setTasks(responseData);
            onDelete();
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    return (
        <>

            <FontAwesomeIcon className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200" onClick={() => setOpenModal('pop-up')} icon={faTrash} />
            <Modal show={openModal === 'pop-up'} size="md" popup onClose={() => setOpenModal(undefined)}>
                <div className="xl:text-base sm:text-sm text-xs fixed bg-slate-600/[.2] w-full h-full z-40 grid place-items-center px-2 text-slate-600 ">
                    <section className="relative bg-graydark max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start dark:bg-boxdark">

                        <Modal.Header />
                        <Modal.Body>
                            <div className="text-center">
                                {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                                <h3 className="mb-5 text-lg font-normal text-gray-2 dark:text-gray-400">
                                    Bạn có muốn xóa người dùng này?
                                </h3>
                                <div className="flex justify-center gap-4">
                                    <Button className='bg-primary w-25' onClick={() => DeleteTasks(task.Ma_CB)}>
                                        Có
                                    </Button>
                                    <Button className='bg-gray w-25' onClick={() => setOpenModal(undefined)}>
                                        Không
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </section>
                </div>
            </Modal>
        </>
    )
}

export default Delete_CanBo