import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Member } from "./Member";
interface Member {
  memberId: string;
  firstname: string;
  lastname: string;
  email: string;
  membershipDate: string;
}
interface MemberProps {
  show: boolean;
  selectedRow: Member | null;
  handleOnClose: () => void;
  updateMembers: (member: Member) => Promise<void>;
  handleUpdateState: (member: Member) => void;
}

export const MemberEdit = ({
  show,
  selectedRow,
  handleOnClose,
  updateMembers,
  handleUpdateState,
}: MemberProps) => {
  const [member, setMember] = useState<Member>({
    memberId: "",
    firstname: "",
    lastname: "",
    email: "",
    membershipDate: "",
  });

  useEffect(() => {
    if (selectedRow) {
      setMember({ ...selectedRow });
    }
  }, [selectedRow]);

  const handleClose = () => {
    handleOnClose();
  };
  const handleUpdate = async () => {
    try {
      await updateMembers(member);
      handleUpdateState(member);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  // grab the form input changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  console.log("Selected Row fro Member Props", selectedRow);

  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Members</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Id */}
          <FloatingLabel
            controlId="floatingInputId"
            label="Member Id"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Member Id"
              name="Id"
              value={member.memberId}
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
              value={member.firstname}
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
              value={member.lastname}
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
              value={member.email}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          {/* Membership Date */}
          <FloatingLabel
            controlId="floatingInputDate"
            label="Membership Date"
            className="mb-3"
          >
            <Form.Control
              type="date"
              placeholder="Membership Date"
              name="membershipDate"
              value={member.membershipDate}
              onChange={handleOnChange}
            />
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
