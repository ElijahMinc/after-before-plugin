export interface IAppOptions {
   width?: string | number
   imgBefore?: string
   imgAfter?: string
}

export interface IApp {
   selector: string | undefined
   options?: IAppOptions
   readonly $rootNode: HTMLElement | undefined
}
