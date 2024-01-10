
const GLOBAL = require("./Global");
export async function UserPermission (UserPermissionsList,Type){
 const requestPermission = async () => {
 console.log(UserPermissionsList,'UserPermissionsList')
  console.log(eval(Type),'Type')
  const Filter=UserPermissionsList?.Type
  console.log(UserPermissionsList?.eval(Type),'Filter')
  return(UserPermissionsList)
 };

 return (
   requestPermission().then(res => {

    return res
   }));
}
