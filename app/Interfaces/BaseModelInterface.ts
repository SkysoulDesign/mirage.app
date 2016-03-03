export interface BaseModelInterface {
    initialized:boolean,
    initOnce(any):this,
    init(any):this,
    bind(any):this,
    setup():void
}