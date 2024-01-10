export interface IUserPhotos {
    small: string | null;
    large: string | null;
}

export interface IUser {
    followed: false;
    id: number;
    name: string;
    photos: IUserPhotos;
    status: string | null;
    uniqueUrlName: string | null;
}

export interface IAuth {
    email: string;
    password: string;
}

export interface IProfileContacts {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export interface IProfile {
    userId: number;
    aboutMe: string;
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:IProfileContacts
    photos: IUserPhotos
}

export interface IAuthMe {
    id: number;
    email: string;
    login: string;
}

export interface IProfileForm {
    image: FileList;
    status: string;
}

export interface IUserCardProps {
    user: IUser
}