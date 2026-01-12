import { Key, useEffect, useState } from 'react';
import { Button} from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { DeleteMembers, GetMembers, UpdateMembers,AddMemberData } from '../../service/Member';
import { MemberEdit } from './MemberEdit';
import { AddMember } from './AddMember';

export const Member = () => {
    const theadings:String [] =[
    "Member Id",
    "First name",
    "Last name",
    "Email",
    "Membership Date",
    "Options"
    ];

    interface Member {
      memberId: string;
      firstname: string;
      lastname: string;
      email: string;
      membershipDate:string;
      
  }
  const [members,setMembers] = useState<Member[]>([]);
  const [showEditForm,setShowEditForm] = useState(false);
  const [showAddForm,setShowAddForm] = useState(false);
  const [ selectedRow, setSelectedRow]  =useState<Member | null>(null);

  const handleOnEdit = (row : Member) =>{
    setShowEditForm(true)
    setSelectedRow(row)
  }

  const handleAdd= (newMember:Member) =>{
    setMembers((prev)=> [...prev,newMember])
   }
  const handleOnClose = () => setShowEditForm(false);

  const handleOnDelete = async (memberId :string) =>{
    try{
     await DeleteMembers(memberId);
     setMembers(members.filter((member)=> member.memberId!== memberId))
    }catch(err){
      console.error(err);  
    }    
 }

 const handleUpdateState = (updatedmember : Member)=>{
    const updatedMembers  = members.map((member)=> 
        member.memberId === updatedmember.memberId ? updatedmember : member
    );
    setMembers(updatedMembers)
 }
  useEffect(()=>{
      //load member data
      const loadData = async ()=>{
         const getAllMembers = await GetMembers()
         setMembers(getAllMembers)
         console.log("Get All Members",getAllMembers)
      };
      loadData();
  },[])

  return (
    <>
      <div className="d-flex justify-content-end p-3">  
         <Button variant="outline-primary" onClick={()=> setShowAddForm(true)}>Add Member</Button>
         </div>
    <Table striped bordered hover>
      <thead>
        <tr>
          {theadings.map((headings)=>(
            <th>{headings}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {members.map((row) =>(
           <tr key={row.memberId}>
              {Object.values(row).map((cell,index)=>(
                <td key={index}>{cell}</td>
              ))}
              <td>
                <div className='d-flex gap-2'>
                <Button variant="outline-success" onClick={() =>handleOnEdit(row)}>Edit</Button>
                <Button variant="outline-danger" onClick={() => handleOnDelete(row.memberId)}>Delete</Button>
                </div>
              </td>
           </tr>
        ))}
      </tbody>
      </Table>
    {/* Member Edit */}
    <MemberEdit
      show={showEditForm}
      selectedRow={selectedRow}
      handleOnClose = {handleOnClose}
      updateMembers = {UpdateMembers}
      handleUpdateState = {handleUpdateState}
      />
      <AddMember
      show={showAddForm}
      handleClose={()=>setShowAddForm(false)}
      handleAdd={handleAdd}
      addMember={AddMemberData}
      />
    </>
   )
}

