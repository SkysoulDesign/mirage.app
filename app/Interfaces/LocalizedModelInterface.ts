import {BaseModelInterface} from "./BaseModelInterface";

export interface LocalizedModelInterface extends BaseModelInterface {
    localize():string[],
}