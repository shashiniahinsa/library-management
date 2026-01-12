import axios from "axios";
const baseUrl = "http://localhost:8080/libmgmt/api/v1/members";

const GetMembers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getall`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

const DeleteMembers = async (memberId: string) => {
  try {
    axios.delete(`${baseUrl}/${memberId}`);
  } catch (err) {
    console.error(err);
  }
}

const UpdateMembers = async(member :any) =>{
    try{
        axios.patch(
            `${baseUrl}?memberId=${member.memberId}`,
            member
        )
    }catch (err){
        console.error(err)
    }
}
const AddMemberData = async(member :any) =>{
  try{
    console.log(member)
    const response = await axios.post(
      baseUrl, 
      member
    );
    return response.data;
      
  }catch (err){
      console.error(err)
      throw err
  }
}
 export {GetMembers,DeleteMembers,UpdateMembers,AddMemberData}
