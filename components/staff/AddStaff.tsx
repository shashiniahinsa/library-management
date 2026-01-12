import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Staff } from "../staff/Staff";
import { title } from "process";
import Swal from "sweetalert2";
import { AddStaffData } from "../../service/Staff";

 interface Staff {
          staffId: string;
          firstname: string;
          lastname: string;
          email: string;
          joinDate:number;
          lastUpdated:number;
          role:string   
      }


export const AddStaff = ({ show, handleClose, handleAdd, addStaff }: any) => {
  const [newStaff, setnewStaff] = useState<Staff>({
    staffId: "",
    firstname: "",
    lastname: "",
    email: "",
    joinDate: 0,
    lastUpdated: 0,
    role: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewStaff((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // save the form data at the back end
      const staffDetails = await AddStaffData(newStaff);
      console.log("saved staff details", staffDetails);
      handleAdd(staffDetails);
      Swal.fire({
        title: "Successfully Saved!",
        icon: "success",
        draggable: true,
      });
      handleClose();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Staff</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
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
                 value={newStaff.firstname}
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
                 value={newStaff.lastname}
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
                 value={newStaff.email}
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
                            value={String(newStaff.role)}
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
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
