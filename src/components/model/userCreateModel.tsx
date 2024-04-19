import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewUser, resetCreate } from "../../redux/user/userSlice";


const UserCreateModel = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const dispatch = useAppDispatch();
    const isCreateSuccess = useAppSelector(state => state.user.isCreateSuccess);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        if (!email) {
            alert('Email empty');
            return;
        }
        if (!name) {
            alert('Name empty');
            return;
        }
        dispatch(createNewUser({name, email}));
    }

    useEffect(() => {
        if (isCreateSuccess) {
            setName("");
            setEmail("");
            handleClose();
            toast('🦄 Add new user success!');

            // Reset redux
            dispatch(resetCreate());
        }
    }, [isCreateSuccess])

    return (
        <>
            <Button
                variant='primary'
                onClick={handleShow}
                className="mb-3 ms-auto"
            >
                Add New
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Name"
                        className="mb-3"
                    >
                        <Form.Control
                            type="text"
                            placeholder="Nguyễn Văn A"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Email"
                    >
                        <Form.Control 
                            type="email" 
                            placeholder="demo@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default UserCreateModel;
