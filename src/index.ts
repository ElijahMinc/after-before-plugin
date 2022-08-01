import "./styles/global.css"

import { App } from './app';

import beforeImg from './static/before.png'
import afterImg from './static/after.png'

const slide = new App('root', {
   imgBefore: beforeImg,
   imgAfter: afterImg
})
