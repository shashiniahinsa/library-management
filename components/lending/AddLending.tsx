import React, { useEffect, useState } from "react";
import { Button, Form, Modal, FloatingLabel } from "react-bootstrap";
import { Member } from "../member/Member";
import { title } from "process";
import Swal from "sweetalert2";

interface Lending {
    lendingId: string;
    book: string;
    member: string;
    isActive: boolean;
    overDue: number;
    fineAmount: number;
  } 

export const AddLending = ({show,handleClose,handleAdd,addLending}:any) => {
    const [newLending,setnewLending]=useState<Lending>({
        lendingId: "",
        book: "",
        member: "",
        isActive: false,
        overDue: 0,
        fineAmount: 0,
    });

    const handleOnChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}= e.target
        setnewLending((prev)=> ({...prev,[name]:value}))
        
    }

    const handleSubmit=async ()=>{
        try{
           // save the form data at the back end
           const lendingDetails =  await addLending(newLending)
           console.log("saved lending details",lendingDetails);
           handleAdd(lendingDetails);
           Swal.fire({
            title: "Successfully Saved!",
            icon: "success",
            draggable: true
          });
           handleClose();
      
          }catch (err){
              console.error(err)
              throw err
          }
        }

return(
<> 
<Modal show={show} onHide={handleClose} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add Lending</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>
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
                   value={newLending.book}
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
                   value={newLending.member}
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
