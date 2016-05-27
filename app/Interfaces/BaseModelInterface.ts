import {Page} from "ui/page";

export interface BaseModelInterface {
    setup():void
    init(page:Page):this
}