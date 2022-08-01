import { IApp, IAppOptions } from "./app.interface";
import * as styles from "../styles/style.module.css";

export class App implements IApp {
   private currentClientX: number = 0

   $rootNode: HTMLElement | undefined = undefined
   options: IAppOptions = {} as IAppOptions

   constructor(
      public selector: string = undefined,
      options: IAppOptions
   )
   {
      this.$rootNode = document.getElementById(selector)
      this.options = {
         ...options,
         width: options.width || 100

      } as IAppOptions



      this.init()
      this.render(this.options)
      this.setup()
   }

   private setup(){
      
      this.$rootNode.classList.add(`${styles['after-before__wrapper']}`)

      this.mouseUpHandler = this.mouseUpHandler.bind(this)
      this.mouseDownHandler = this.mouseDownHandler.bind(this)
      this.mouseMoveHandler = this.mouseMoveHandler.bind(this)

      this.$rootNode.addEventListener('mouseup', this.mouseUpHandler)
      this.$rootNode.addEventListener('mousedown', this.mouseDownHandler)

   }

   private mouseUpHandler(e: MouseEvent){
      console.log('up')
      
      this.$rootNode.removeEventListener('mousemove', this.mouseMoveHandler)
   }

   
   private mouseDownHandler(e: MouseEvent){
      console.log('down')
      const target = e.target as HTMLElement

      if(target.dataset.type !== 'resize') return


      console.log(target.offsetLeft)
      this.$rootNode.addEventListener('mousemove', this.mouseMoveHandler)
      this.currentClientX = e.clientX


   }

   
   private mouseMoveHandler(e: MouseEvent){

      const newClientX = this.currentClientX - e.clientX
      // const newClientX = this.currentClientX - e.clientX
      console.log(e)
      this.update({width: +this.options.width - newClientX})
      this.currentClientX = e.clientX
   }

   private init(): void {
     this.isInit && this.$rootNode.classList.add(`${styles['after-before__wrapper']}`)
   }
   
    private get isInit(): boolean {
      return !!this.$rootNode 
   }

   private getTemplate(props: IAppOptions): string | null{

      const objStylesBefore  = {
         width: props.width + 'px',
         ['background-image']: `url(${props.imgBefore})`
      }

      const objStylesAfter  = {
         ['background-image']: `url(${props.imgAfter})`
      }
      console.log(this.generateStyles(objStylesBefore))
      return  this.isInit ? (
         `
            <div class="${styles['after-before__left-slide']}"  style="${this.generateStyles(objStylesBefore)}">
               <div class="${styles['after-before__resize']}" data-type="resize"></div>
            </div>
            <div class="${styles['after-before__right-slide']}" style="${this.generateStyles(objStylesAfter)}">
            </div>
      `
      ) : null
   }

   private generateStyles(styles: {}){
      return Object.entries(styles).map(([key, value]) => {
         return `${key}:${value}`
      }).join(';')
   }

   private update(props: IAppOptions): void {
      this.options = {
         ...this.options,
         ...props
      }

      this.render(this.options)
   }

   private render(props: IAppOptions): void{
      this.$rootNode.innerHTML = this.getTemplate(props) 
   }
}