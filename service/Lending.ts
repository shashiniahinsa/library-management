import axios from "axios";
const baseUrl = "http://localhost:8080/libmgmt/api/v1/lending";

const GetLendings = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getall`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

const DeleteLendings = async (lendingId: string) => {
  try {
    axios.delete(`${baseUrl}/${lendingId}`);
  } catch (err) {
    console.error(err);
  }
}

const UpdateLendings = async(lending :any) =>{
    try{
        axios.patch(
            `${baseUrl}/${lending.lendingId}`,
            lending
        )
    }catch (err){
        console.error(err)
    }
}

const AddLendingData = async(lending :any) =>{
  try{
    console.log(lending)
    const response = await axios.post(
      baseUrl, 
      lending
    );
    return response.data;
      
  }catch (err){
      console.error(err)
      throw err
  }
}
 export {GetLendings,DeleteLendings,UpdateLendings,AddLendingData}
