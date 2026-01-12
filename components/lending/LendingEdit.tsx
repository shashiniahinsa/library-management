import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
interface Lending {
  lendingId: string;
  book: string;
  member: string;
  isActive: boolean;
  overDue: number;
  fineAmount: number;
}
interface LendingProps {
  show: boolean;
  selectedRow: Lending | null;
  handleOnClose: () => void;
  updateLendings: (lending: Lending) => Promise<void>;
  handleUpdateState: (lending: Lending) => void;
}

export const LendingEdit = ({
  show,
  selectedRow,
  handleOnClose,
  updateLendings,
  handleUpdateState,
}: LendingProps) => {
  const [lending, setLending] = useState<Lending>({
    lendingId: "",
    book: "",
    member: "",
    isActive: false,
    overDue: 0,
    fineAmount: 0,
  });

  useEffect(() => {
    if (selectedRow) {
      setLending({ ...selectedRow });
    }
  }, [selectedRow]);

  const handleClose = () => {
    handleOnClose();
  };
  const handleUpdate = async () => {
    try {
      await updateLendings(lending);
      handleUpdateState(lending);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  // grab the form input changes
  // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLending({ ...lending, [e.target.name]: e.target.value });
  // };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === "isActive" ? value === "1" : value;
    setLending((prev) => ({ ...prev, [name]: newValue }));
  };

  console.log("Selected Row fro Lending Props", selectedRow);

  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Lendings</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {/* Lending Id */}
          <FloatingLabel
            controlId="floatingInput"
            label="Lending Id"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Lending Id"
              name="lendingId"
              value={lending.lendingId}
              readOnly
            />
          </FloatingLabel>

          {/* Book */}
          <FloatingLabel
            controlId="floatingInput"
            label="Book"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Book"
              name="book"
              value={lending.book}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          {/* Member */}
          <FloatingLabel
            controlId="floatingInput"
            label="Member"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Member"
              name="member"
              value={lending.member}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          {/* Is Active */}
          <FloatingLabel
            controlId="floatingInput"
            label="Is Active"
            className="mb-3"
          >
            <Form.Control
              as="select"
              name="isActive"
              value={String(lending.isActive)} // Convert to string if it's 0 or 1
              onChange={handleOnChange}
            >
              <option value="yes">Yes</option>
              <option value="0">No</option>
            </Form.Control>
          </FloatingLabel>

          {/* Over Due */}
          <FloatingLabel
            controlId="floatingInput"
            label="Over Due"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Over Due"
              name="overDue"
              value={lending.overDue}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          {/* Fine Amount */}
          <FloatingLabel
            controlId="floatingInput"
            label="Fine Amount"
            className="mb-3"
          >
            <Form.Control
              type="number"
              placeholder="Fine Amount"
              name="fineAmount"
              value={lending.fineAmount}
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
