

declare type authRes = {
  token: string;
  user: User
}

declare type authInputType = {
  email: string;
  password: string;
  name?:string
  profileImageUrl?:string
}

declare type imageUploadRes = {
  imageUrl: string;
}
