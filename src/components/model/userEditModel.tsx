import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { resetUpdate, updateUser } from "../../redux/user/userSlice";


const UserEditModel = (props: any) => {
    const { show, dataUser, handleClose } = props;
    const [id, setId] = useState();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const dispatch = useAppDispatch();
    const isUpdateSuccess = useAppSelector(state => state.user.isUpdateSuccess);
    
    useEffect(() => {
        if (dataUser?.id) {
            setId(dataUser.id)
            setName(dataUser.name);
            setEmail(dataUser.email);
        }
    }, [dataUser]);

    const handleSubmit = () => {
        if (!name) {
            alert("Name empty!");
            return;
        }
        if (!email) {
            alert("Email empty!");
            return;
        }

        dispatch(updateUser({ id, name, email }))
    }

    useEffect(() => {
        if (isUpdateSuccess) {
            setName("");
            setEmail("");
            handleClose();
            toast('🦄 Update user success!');

            // Reset redux
            dispatch(resetUpdate())
            
        }
    }, [isUpdateSuccess]);
    
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit A User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nguyễn Văn A"
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Email"
                    >
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="demo@gmail.com" 
                        />
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserEditModel;
