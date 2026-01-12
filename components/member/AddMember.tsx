import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Member } from "../member/Member";
import { title } from "process";
import Swal from "sweetalert2";
import { AddMemberData } from "../../service/Member";

interface Member {
  memberId: string;
  firstname: string;
  lastname: string;
  email: string;
  membershipDate: string;
}

export const AddMember = ({ show, handleClose, handleAdd, addMember }: any) => {
  const [newMember, setnewMember] = useState<Member>({
    memberId: "",
    firstname: "",
    lastname: "",
    email: "",
    membershipDate: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setnewMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      // save the form data at the back end
      const memberDetails = await addMember(newMember);
      console.log("saved member details", memberDetails);
      handleAdd(memberDetails);
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
          <Modal.Title>Add Member</Modal.Title>
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
                value={newMember.firstname}
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
                value={newMember.lastname}
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
                value={newMember.email}
                onChange={handleOnChange}
              />
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
