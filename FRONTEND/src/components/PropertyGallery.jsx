import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi'
import { placeholder } from '../utils/format'

export default function PropertyGallery({ images = [], title }) {
  const gallery = images.length ? images.map((i) => i.url) : [placeholder]
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const move = (step) => setIndex((index + step + gallery.length) % gallery.length)
  return <div className="gallery">
    <div className="main-photo"><img onClick={() => setOpen(true)} src={gallery[index]} alt={title} /><button onClick={() => move(-1)}><FiChevronLeft /></button><button onClick={() => move(1)}><FiChevronRight /></button></div>
    <div className="thumbs">{gallery.map((src, i) => <button key={src} className={i === index ? 'active' : ''} onClick={() => setIndex(i)}><img src={src} alt="" /></button>)}</div>
    {open && <div className="lightbox" onClick={() => setOpen(false)}><button><FiX /></button><img src={gallery[index]} alt={title} /></div>}
  </div>
}
