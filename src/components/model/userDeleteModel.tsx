import { useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser, resetDelete } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from 'react-toastify';


const UserDeleteModel = (props: any) => {
    const { show, dataUser, handleClose } = props;
    const dispatch = useAppDispatch();
    const isDeleteSuccess = useAppSelector(state => state.user.isDeleteSuccess);
    
    const handleDelete = () => {
        dispatch(deleteUser(dataUser));
    }

    useEffect(() => {
        if (isDeleteSuccess) {
            handleClose();
            toast('🦄 Delete user success!');

            // Reset redux
            dispatch(resetDelete());
        }
        
    }, [isDeleteSuccess]);
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete user : {dataUser?.email}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserDeleteModel;
