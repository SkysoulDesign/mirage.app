export interface ApiUserInterface {
    username:string,
    email:string,
    gender:string,
    api_token:string,
    country_id:number,
    age_id:number,
    newsletter: number,
    codes:ApiCodesInterface[]
}

export interface ApiCodesInterface {
    id: number,
    product_id: number,
    user_id: number,
    code: string,
    status: number,
    created_at: string,
    updated_at: string,
    product:ApiProductInterface
}

export interface ApiProductInterface {
    id: number,
    name: string,
    code: string,
    image: string,
    extras: ApiExtraInterface[]
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



