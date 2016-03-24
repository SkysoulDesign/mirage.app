import {Observable} from "data/observable";
import {Mirage as App} from "../app";
import {LocalizedModelInterface} from "../Interfaces/LocalizedModelInterface";
import {LocalizedModelWithNavigation} from "./LocalizedModelWithNavigation";


export class MirageNewsPageModel extends LocalizedModelWithNavigation implements LocalizedModelInterface {

    constructor() {
        super({
            "myItems": [
                {
                    "icon": "Icon1",
                    "title": "Title1",
                    "date": "Date1",
                    "content": "Content1"
                }, {
                    "icon": "Icon2",
                    "title": "Title2",
                    "date": "Date2",
                    "content": "Content2"
                }, {
                    "icon": "Icon3",
                    "title": "Title3",
                    "date": "Date3",
                    "content": "Content3"
                }, {
                    "icon": "Icon3",
                    "title": "Title3",
                    "date": "Date3",
                    "content": "Content3"
                }
                , {
                    "icon": "Icon3",
                    "title": "Title3",
                    "date": "Date3",
                    "content": "Content3"
                }
                , {
                    "icon": "Icon3",
                    "title": "Title3",
                    "date": "Date3",
                    "content": "Content3"
                }
                , {
                    "icon": "Icon3",
                    "title": "Title3",
                    "date": "Date3",
                    "content": "Content3"
                }
                , {
                    "icon": "Icon3111111111111111111111111111111111111111111111111",
                    "title": "Title3111111111111111111111111111111111111111111111111",
                    "date": "Date3111111111111111111111111111111111111111111111111111111",
                    "content": "Content3111111111111111111111111111111111111111111111111111111"
                }

            ]
        });
    }

    /**
     * Localize Model
     * @returns {string[]}
     */
    public localize() {
        return ['MIRAGE_NEWS'];
    }

}
