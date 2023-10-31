
import { Button, Modal } from 'flowbite-react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useState, ChangeEvent, FormEvent } from 'react';
interface Task {
    Ma_CB: number;
    TaiKhoan: string;
    Ten_CB: string;
    GioiTinh: number;

}
interface PutTaskProps {
    task: Task;
    onPut: () => void;
}
export const Edit_CanBo: React.FC<PutTaskProps> = ({ task, onPut }) => {
    const [openModal, setOpenModal] = useState<string | undefined>(undefined);
    const token = sessionStorage.getItem("name");
    const props = { openModal, setOpenModal };
    const [taikhoan, setTaikhoan] = useState<string>(task.TaiKhoan);
    const [tenCanBo, setTenCanBo] = useState<string>(task.Ten_CB);
    const [gioiTinh, setGioiTinh] = useState<number>(task.GioiTinh);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const Title = event.target.value;
        setTaikhoan(Title);
    };
    const handlTextareaEChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const Description = event.target.value;
        setTenCanBo(Description);
    };
    const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const gioiTinh = parseInt(event.target.value);
        setGioiTinh(gioiTinh);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        try {
            const response = await axios.put(`https://localhost:7259/api/ToDo/${task.Ma_CB}`, {
                taikhoan: taikhoan,
                tenCanBo: tenCanBo

            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

            setOpenModal(undefined);
            onPut();
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };
    return (
        <>
            <FontAwesomeIcon className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200 w-4 sm:w-5 h-4 sm:h-5" onClick={() => props.setOpenModal('form-elements')} icon={faPen} />

            <Modal show={props.openModal === 'form-elements'} size="md" popup onClose={() => props.setOpenModal(undefined)}>
                <div className="xl:text-base sm:text-sm text-xs fixed bg-slate-600/[.2] w-full h-full z-40 grid place-items-center px-2 text-slate-600 ">
                    <section className="relative bg-bodydark max-w-lg w-full rounded-lg p-3 sm:p-5 flex flex-col justify-start dark:bg-boxdark">

                        <Modal.Header />
                        <Modal.Body>
                            <form action="" onSubmit={handleSubmit}>
                                <div className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium tracking-wide block dark:text-bodydark">Title</label>
                                        <input
                                            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 dark:bg-body dark:text-white"
                                            type="text"
                                            name="Title"
                                            placeholder="Title"
                                            value={taikhoan}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide dark:text-bodydark">Description</label>
                                        <input
                                            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 dark:bg-body dark:text-white"
                                            type="text"
                                            name="Description"
                                            placeholder="Description"
                                            value={tenCanBo}
                                            onChange={handlTextareaEChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium tracking-wide block dark:text-bodydark">Status</label>
                                        <select
                                            className="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400 dark:bg-body dark.text-white"
                                            name="Gender"
                                            value={gioiTinh === 1 ? '1' : '0'}
                                            onChange={handleStatusChange}
                                        >
                                            <option value="1">Nam</option>
                                            <option value="0">Nữ</option>
                                        </select>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500 bg-customPurple"
                                        >
                                            Edit a Task
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>

                    </section>
                </div>
            </Modal>
        </>
    )
}
