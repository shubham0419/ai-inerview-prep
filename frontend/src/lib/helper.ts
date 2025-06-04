export const validateEmail = (email:string) => {
  const regex = /^[^\s@]+@[^\s@]+\. [^\s@]+$/;
  return regex.test(email);
}

export const getInitials = (title:string)=>{

  const words = title.split(' ');

  let initials = "";

  for(let i = 0;i<Math.min(words.length,2);i++){
    initials += words[i].charAt(0).toUpperCase();
  }
  return initials;
}