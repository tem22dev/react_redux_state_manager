import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUser } from '../redux/user/userSlice';
import UserDeleteModel from "./model/userDeleteModel";
import UserEditModel from "./model/userEditModel";
import Button from "react-bootstrap/Button";

function UsersTable() {
    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user.listUser);
    const [selectedUser, setSelectedUser] = useState<object | null>(null);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        dispatch(fetchListUser())
    }, []);

    const handleEditClick = (user: any) => {
        setSelectedUser(user);
        setShow(true);
    };
    
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Button
                                    variant='warning'
                                    onClick={() => handleEditClick(user)}
                                >
                                    Edit
                                </Button>
                                <UserDeleteModel />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
    
            <UserEditModel show={show} dataUser={selectedUser} handleClose={handleClose}/>
        </>
    );
}

export default UsersTable;