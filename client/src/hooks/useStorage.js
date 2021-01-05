export const useStorage = () => {
    const user = JSON.parse(localStorage.getItem('CredsInfo'));
    
    if(user)return user;
    
    else return null;
}