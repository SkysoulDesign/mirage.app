export interface BaseModelInterface {
    initialized:boolean,
    initOnce(any):this,
    init():void,
    bind(any):this,
}