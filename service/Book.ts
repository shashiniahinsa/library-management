import axios from "axios";
import { log } from "console";
const baseUrl = "http://localhost:8080/libmgmt/api/v1/books";

const fetchToken = () =>{
  const token =localStorage.getItem("cmjd109")
  return "Bearer "+token;
}

const GetBooks = async () => {
  try {
    const response = await axios.get(`
      ${baseUrl}/getall`,
       {
           headers:{
               Authorization: fetchToken()
           }
       }
   
      )
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

const DeleteBooks = async (bookId: string) => {
  try {
    axios.delete(
      `${baseUrl}/${bookId}`,
             {
                 headers:{
                     Authorization:fetchToken()
                 }
             });
  } catch (err) {
    console.error(err);
  }
}

const UpdateBooks = async(book :any) =>{
    try{
        axios.patch(
            `${baseUrl}?bookId=${book.bookId}`,
            book
        )
    }catch (err){
        console.error(err)
    }
}

const AddBookData = async(book :any) =>{
  try{
    console.log(book)
    const response = await axios.post(
      baseUrl, 
      book,
      {
          headers:{
              Authorization: fetchToken()
          }
      }
    );
    return response.data;
      
  }catch (err){
      console.error(err)
      throw err
  }
}
 export {GetBooks,DeleteBooks,UpdateBooks,AddBookData}
