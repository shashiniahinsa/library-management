import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Member } from "../member/Member";
interface Book {
  bookId: string;
  title: string;
  publisher: string;
  isbn: string;
  author: string;
  edition: string;
  price: number;
  totalQty: number;
  avilableQty: number;
  //   lastUpdatedDate: string;
  //   lastUpdatedTime: string;
}
interface BookProps {
  show: boolean;
  selectedRow: Book | null;
  handleOnClose: () => void;
  updateBooks: (book: Book) => Promise<void>;
  handleUpdateState: (book: Book) => void;
}

export const BookEdit = ({
  show,
  selectedRow,
  handleOnClose,
  updateBooks,
  handleUpdateState,
}: BookProps) => {
  const [book, setBook] = useState<Book>({
    bookId: "",
    title: "",
    publisher: "",
    isbn: "",
    author: "",
    edition: "",
    price: 0,
    totalQty: 0,
    avilableQty: 0,
  });

  useEffect(() => {
    if (selectedRow) {
      setBook({ ...selectedRow });
    }
  }, [selectedRow]);

  const handleClose = () => {
    handleOnClose();
  };
  const handleUpdate = async () => {
    try {
      await updateBooks(book);
      handleUpdateState(book);
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  // grab the form input changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  console.log("Selected Row fro Book Props", selectedRow);

  return (
    <Modal show={show} onHide={handleOnClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Books</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FloatingLabel
            controlId="floatingInput"
            label="Book Id"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              name="bookId"
              value={book.bookId}
              readOnly
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              type="textl"
              placeholder="name@example.com"
              name="title"
              value={book.title}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Publisher">
            <Form.Control
              type="text"
              placeholder="Password"
              name="publisher"
              value={book.publisher}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="ISBN">
            <Form.Control
              type="text"
              placeholder="Password"
              name="isbn"
              value={book.isbn}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Author">
            <Form.Control
              type="text"
              placeholder="Password"
              name="author"
              value={book.author}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Edition">
            <Form.Control
              type="text"
              placeholder="Password"
              name="edition"
              value={book.edition}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Price">
            <Form.Control
              type="number"
              placeholder="Password"
              name="price"
              value={book.price}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Total Qty">
            <Form.Control
              type="nuber"
              placeholder="Password"
              name="totalQty"
              value={book.totalQty}
              onChange={handleOnChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Avl Qty">
            <Form.Control
              type="number"
              placeholder="Password"
              name="avilableQty"
              value={book.avilableQty}
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
