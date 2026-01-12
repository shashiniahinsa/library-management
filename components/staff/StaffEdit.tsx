import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Staff } from "./Staff";
interface Staff {
    staffId: string;
    firstname: string;
    lastname: string;
    email: string;
    joinDate:number;
    lastUpdated:number;
    role:string
}
interface StaffProps {
  show: boolean;
  selectedRow: Staff | null;
  handleOnClose: () => void;
  updateStaffs: (staff: Staff) => Promise<void>;
  handleUpdateState: (staff: Staff) => void;
}

export const StaffEdit = ({show,selectedRow,handleOnClose,updateStaffs,handleUpdateState,}: StaffProps) => {
    const [staff, setStaff] = useState<Staff>({
    staffId: "",
    firstname: "",
    lastname: "",
    email: "",
    joinDate: 0,
    lastUpdated: 0,
    role: "",

  });

  useEffect(() => {
   
    
    if (selectedRow) {
      setStaff({ ...selectedRow });
    }
  }, [selectedRow]);

  const handleClose = () => {
    handleOnClose();
  };
  const handleUpdate = async () => {
    try {
      await updateStaffs(staff);
      handleUpdateState(staff);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  // grab the form input changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStaff({ ...staff, [e.target.name]: e.target.value });
  };

  console.log("Selected Row fro Staff Props", selectedRow);


  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Staff</Modal.Title>
      </Modal.Header>

      <Modal.Body>
      <Form>
  {/* Id */}
  <FloatingLabel
    controlId="floatingInputId"
    label="Staff Id"
    className="mb-3"
  >
    <Form.Control
      type="text"
      placeholder="Staff Id"
      name="Id"
      value={staff.staffId}
      readOnly
    />
  </FloatingLabel>

  {/* Firstname */}
  <FloatingLabel
    controlId="floatingInputFirstname"
    label="Firstname"
    className="mb-3"
  >
    <Form.Control
      type="text"
      placeholder="Firstname"
      name="firstname"
      value={staff.firstname}
      onChange={handleOnChange}
    />
  </FloatingLabel>

  {/* Lastname */}
  <FloatingLabel
    controlId="floatingInputLastname"
    label="Lastname"
    className="mb-3"
  >
    <Form.Control
      type="text"
      placeholder="Lastname"
      name="lastname"
      value={staff.lastname}
      onChange={handleOnChange}
    />
  </FloatingLabel>

  {/* Email */}
  <FloatingLabel
    controlId="floatingInputEmail"
    label="Email"
    className="mb-3"
  >
    <Form.Control
      type="email"
      placeholder="Email"
      name="email"
      value={staff.email}
      onChange={handleOnChange}
    />
  </FloatingLabel>

  {/* Join Date */}
  <FloatingLabel
    controlId="floatingInputDate"
    label="Join Date"
    className="mb-3"
  >
    <Form.Control
      type="date"
      placeholder="Join Date"
      name="joinDate"
      value={(staff.joinDate)}
      onChange={handleOnChange}
    />
  </FloatingLabel>

  {/* lastUpdated */}
  <FloatingLabel
    controlId="floatingInputDate"
    label="LastUpdated"
    className="mb-3"
  >
    <Form.Control
      type="date"
      placeholder="LastUpdated Date"
      name="lastUpdated"
      value={(staff.lastUpdated)}
      onChange={handleOnChange}
    />
  </FloatingLabel>

  {/* Role */}
  <FloatingLabel
    controlId="floatingInputDate"
    label="Role"
    className="mb-3"
  >
   <Form.Control as={"select"}
                 type="select"
                 name="role"
                 placeholder="Role"
                 value={String(staff.role)}
                 onChange={handleOnChange}
               >
                 <option value="ADMIN">ADMIN</option>
                 <option value="OFFICER">OFFICER</option>
                 <option value="LIBRARIAN">LIBRARIAN</option>

               </Form.Control>
  </FloatingLabel>

</Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>Close</Button>
        <Button variant="success" onClick={handleUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
};
