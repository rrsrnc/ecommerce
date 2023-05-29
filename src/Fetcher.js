
const baseUrl="https://backenedecommerce-rrsrnc.onrender.com"



const fetcher=async(url)=>{
    let responseData={errMessage:"",data:[]}
    try {
        const response = await fetch(`${baseUrl}${url}`);
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
          }
        responseData.data = await response.json();
        // console.log(data);
        // debugger;
        return responseData;
      } catch (error) {

        responseData.errMessage=error
        return responseData
      }
    };

export const getCategories=()=>{
    return fetcher("/home/categories")
}    
export const getCategoryProduct=(id)=>{
   
    return fetcher(`/categories?id=${id}`)
}    

export const getProducts=(id)=>{
    return fetcher("/home/products/"+id)
}    
export const getAccessToken=()=>{
    return fetcher("/auth/login")
}


export default fetcher;