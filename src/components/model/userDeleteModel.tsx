import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


const UserDeleteModel = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant='danger'
                onClick={handleShow}
                className="ms-3"
            >
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Delete user : demo@gmail.com
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UserDeleteModel;
