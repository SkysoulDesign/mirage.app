export interface ApiUserInterface {
    id:number,
    username:string,
    email:string,
    gender:string,
    country_id:number,
    api_token:string,
    newsletter: number,
    age_id:number,
    remember_token:string,
    created_at: string,
    updated_at: string,
    codes:ApiCodesInterface[]
}

export interface ApiCodesInterface {
    id: number,
    product_id: number,
    user_id: number,
    code: string,
    status: string,
    created_at: string,
    updated_at: string,
    product:ApiProductInterface
}

export interface ApiProductInterface {
    id: number,
    name: string,
    code: string,
    image: string,
    created_at: string,
    updated_at: string,
    extras: ApiExtraInterface[],
    profile: ApiProfileInterface,
}

export interface ApiExtraInterface {
    id: number,
    title: string,
    description: string,
    image: string,
    video: string,
    product_id: number,
    created_at: string,
    updated_at: string
}

export interface ApiProfileInterface {
    id: number,
    image: string,
    description: string,
    product_id: number,
    created_at: string,
    updated_at: string
}


