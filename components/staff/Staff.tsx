import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { AddStaffData, DeleteStaffs, GetStaffs, UpdateStaffs } from '../../service/Staff';
import { StaffEdit } from './StaffEdit';
import { AddStaff } from './AddStaff';

export const Staff = () => {
    const theadings:String [] =[
    "Staff Id",
    "First name",
    "Last name",
    "Email",
    "Join Date",
    "Last Updated",
    "Role",
    "Options",
    ]

      interface Staff {
          staffId: string;
          firstname: string;
          lastname: string;
          email: string;
          joinDate:number;
          lastUpdated:number;
          role:string   
      }

      const [staffs, setStaffs] = useState<Staff[]>([]);
      const [showEditForm, setShowEditForm] = useState(false);
      const [showAddForm,setShowAddForm] = useState(false);
      const [selectedRow, setSelectedRow] = useState<Staff | null>(null);
    
      const handleOnEdit = (row: Staff) => {
        setShowEditForm(true);
        setSelectedRow(row);
      };

      const handleAdd= (newStaff:Staff) =>{
        setStaffs((prev)=> [...prev,newStaff])
       }
    
      const handleOnClose = () => setShowEditForm(false);
    
      const handleOnDelete = async (staffId: string) => {
        try {
          await DeleteStaffs(staffId);
          setStaffs(
            staffs.filter((staff) => staff.staffId !== staffId)
          );
        } catch (err) {
          console.error(err);
        }
      };
    
      const handleUpdateState = (updatedstaff: Staff) => {
        const updatedStaffs = staffs.map((staff) =>
          staff.staffId === updatedstaff.staffId ? updatedstaff : staff
        );
        setStaffs(updatedStaffs);
      };
      useEffect(() => {
        //load staff data
        const loadData = async () => {
          const getAllStaffs = await GetStaffs();
          setStaffs(getAllStaffs);
          console.log("Get All Staffs", getAllStaffs);
        };
        loadData();
      }, []);
    
      return (
        <>
        <div className="d-flex justify-content-end p-3">  
         <Button variant="outline-primary" onClick={()=> setShowAddForm(true)}>Add Staff</Button>
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
              {staffs.map((row) => (
                <tr key={row.staffId}>
                  {Object.values(row).map((cell, index) => (
                    <td key={index}>{cell}</td>
                  ))}
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="outline-success"onClick={() => handleOnEdit(row)}>Edit</Button>
                      <Button variant="outline-danger"onClick={() => handleOnDelete(row.staffId)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Staffs Edit */}
          <StaffEdit
            show={showEditForm}
            selectedRow={selectedRow}
            handleOnClose={handleOnClose}
            updateStaffs={UpdateStaffs}
            handleUpdateState={handleUpdateState}
          />
           <AddStaff
      show={showAddForm}
      handleClose={()=>setShowAddForm(false)}
      handleAdd={handleAdd}
      addStaff={AddStaffData}
      />
        </>
      )
    }