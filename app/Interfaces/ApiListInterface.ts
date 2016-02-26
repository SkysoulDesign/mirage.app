export interface ApiListInterface {
    base:string;
    login:{POST:string};
    checkLogin:{POST:string};
    register:{POST:string};
    product:{POST:string};
    products: { POST: string };
    countries:{GET:string};
    ages:{GET:string};
    registerProduct:{ POST: string };
}