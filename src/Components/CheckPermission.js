
export async function UserPermission (UserPermissionsList){
 const requestPermission = async () => {
 console.log(UserPermissionsList,'UserPermissionsList')

  return(UserPermissionsList)
 };

 return (
   requestPermission().then(res => {

    return res
   }));
}
