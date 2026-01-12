import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import { GetLendings, UpdateLendings, DeleteLendings, AddLendingData } from "../../service/Lending";
import { LendingEdit } from "./LendingEdit";
import { AddLending } from "./AddLending";

export const Lending = () => {
  const theadings: String[] = [
    "Lending Id",
    "Book",
    "Member",
    "Lending Date",
    "Return Date",
    "Is Active",
    "OverDue",
    "Fine Amount",
    "Options",
  ];

  interface Lending {
    lendingId: string;
    book: string;
    member: string;
    isActive: boolean;
    overDue: number;
    fineAmount: number;
  }

  const [lendings, setLendings] = useState<Lending[]>([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm,setShowAddForm] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Lending | null>(null);

  const handleOnEdit = (row: Lending) => {
    setShowEditForm(true);
    setSelectedRow(row);
  };

  const handleAdd= (newLending:Lending) =>{
    setLendings((prev)=> [...prev,newLending])
   }

  const handleOnClose = () => setShowEditForm(false);

  const handleOnDelete = async (lendingId: string) => {
    try {
      await DeleteLendings(lendingId);
      setLendings(
        lendings.filter((lending) => lending.lendingId !== lendingId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateState = (updatedlending: Lending) => {
    const updatedLendings = lendings.map((lending) =>
      lending.lendingId === updatedlending.lendingId ? updatedlending : lending
    );
    setLendings(updatedLendings);
  };
  useEffect(() => {
    //load lending data
    const loadData = async () => {
      const getAllLendings = await GetLendings();
      setLendings(getAllLendings);
      console.log("Get All Lendings", getAllLendings);
    };
    loadData();
  }, []);

  return (
    <>
     <div className="d-flex justify-content-end p-3">  
         <Button variant="outline-primary" onClick={()=> setShowAddForm(true)}>Add Lending</Button>
         </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {theadings.map((headings) => (
              <th>{headings}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lendings.map((row) => (
            <tr key={row.lendingId}>
              {Object.values(row).map((cell, index) => (
                <td key={index}>
                  {index === 5 ? (cell ?"Yes" : "No" ):cell} {" "}</td>
              ))}
              <td>
                <div className="d-flex gap-2">
                  <Button variant="outline-success"onClick={() => handleOnEdit(row)}>Edit</Button>
                  <Button variant="outline-danger"onClick={() => handleOnDelete(row.lendingId)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Lendings Edit */}
      <LendingEdit
        show={showEditForm}
        selectedRow={selectedRow}
        handleOnClose={handleOnClose}
        updateLendings={UpdateLendings}
        handleUpdateState={handleUpdateState}
      />
       <AddLending
      show={showAddForm}
      handleClose={()=>setShowAddForm(false)}
      handleAdd={handleAdd}
      addLending={AddLendingData}
      />
    </>
  )
}


