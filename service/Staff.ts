import axios from "axios";
const baseUrl = "http://localhost:8080/libmgmt/api/v1/staff";

const GetStaffs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getall`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

const DeleteStaffs = async (staffId: string) => {
  try {
    axios.delete(`${baseUrl}/${staffId}`);
  } catch (err) {
    console.error(err);
  }
}

const UpdateStaffs = async(staff :any) =>{
    try{
        axios.patch(
            `${baseUrl}?staffId=${staff.staffId}`,
            staff
        )
    }catch (err){
        console.error(err)
    }
}

const AddStaffData = async(staff :any) =>{
  try{
    console.log(staff)
    const response = await axios.post(
      baseUrl, 
      staff
    );
    return response.data;
      
  }catch (err){
      console.error(err)
      throw err
  }
}
 export {GetStaffs,DeleteStaffs,UpdateStaffs,AddStaffData}
