export interface ApiUserInterface {
    username:string;
    email:string;
    gender:string;
    api_token:string;
    country_id:number;
    age_id:number;
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

export interface ApiProductInterface {
    id: number,
    name: string,
    code: string,
    image: string,
    video: string,
    extras: ApiExtraInterface
}

