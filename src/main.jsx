import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ToolSprite from './ToolSprite';
import { tools } from './content';
import './styles.css';

function Bench() {
  return <svg className="bench-illustration" viewBox="0 0 1100 650" preserveAspectRatio="none" fill="none" aria-hidden="true">
    <defs>
      <clipPath id="bench-surface"><path d="M99 45h902l49 347H50Z"/></clipPath>
      <linearGradient id="wood-top" x1="550" y1="25" x2="550" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#dbccb2"/><stop offset="1" stopColor="#cbbb9e"/></linearGradient>
      <linearGradient id="wood-front" x2="0" y2="1"><stop stopColor="#bba483"/><stop offset="1" stopColor="#aa9070"/></linearGradient>
      <filter id="wood-grain"><feTurbulence type="fractalNoise" baseFrequency=".014 .55" numOctaves="2" seed="8"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".055"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
    </defs>
    <ellipse cx="550" cy="612" rx="447" ry="21" fill="#786853" opacity=".09"/>
    <path d="M154 396h45l-9 190-41 3Z" fill="#a58d6d" stroke="#88765d" strokeWidth="1.5"/>
    <path d="M905 396h43l7 193-40-3Z" fill="#aa9272" stroke="#88765d" strokeWidth="1.5"/>
    <path d="M160 526h780v25H160Z" fill="#a88f70" stroke="#88765d" strokeWidth="1.5"/>
    <path d="m171 526 45-28h670l52 28Z" fill="#c4ae8d" stroke="#9e8768" strokeWidth="1.5"/>
    <path d="M109 393h49l-18 212-45 4Z" fill="#bda17c" stroke="#8d775a" strokeWidth="1.5"/>
    <path d="m158 393 15-8-17 213-16 7Z" fill="#9e8462"/>
    <path d="M942 393h49l14 216-45-4Z" fill="#bda17c" stroke="#8d775a" strokeWidth="1.5"/>
    <path d="m942 393-15-8 16 213 17 7Z" fill="#9e8462"/>
    <path d="M119 388h862v82H119Z" fill="url(#wood-front)" stroke="#90795c" strokeWidth="1.5"/>
    <path d="M185 412h342v43H185Zm389 0h342v43H574Z" fill="#c1aa88" stroke="#9b8160" strokeWidth="1.5"/>
    <path d="M328 432h56m335 0h56" stroke="#6d6555" strokeWidth="5" strokeLinecap="round"/>
    <path d="M99 45h902l49 347H50Z" fill="url(#wood-top)" stroke="#aa9576" strokeWidth="2" filter="url(#wood-grain)" clipPath="url(#bench-surface)"/>
    <path d="M50 392h1000v24H50Z" fill="#b19a78" stroke="#917a59" strokeWidth="1.5"/>
    <path d="M53 394h994" stroke="#e4d5b9" strokeWidth="2"/>
    <g stroke="#a28a66" opacity=".28" strokeWidth="1.2"><path d="M85 145h931M71 262h959"/><path d="M111 79c145-5 204 5 356 0s308-3 517 1M105 92c180-3 243 2 356 0M87 212c87-4 136 5 225 1m362 13c86-5 186 5 348-1M77 333c127-4 237 4 359 0m46 26c121-3 310 4 551-1"/></g>
    <g fill="#8d785b" opacity=".5"><circle cx="109" cy="60" r="2"/><circle cx="991" cy="60" r="2"/><circle cx="66" cy="377" r="2"/><circle cx="1034" cy="377" r="2"/></g>
  </svg>;
}
function Toolbox({onSelect}) {
  return <section className="toolbox"><h1>THE WRITER’S TOOLBOX</h1><div className="workbench"><Bench/><div className="tool-grid" aria-label="Writing tools">{tools.map(tool=><button key={tool.id} className={`tool tool-${tool.id}`} onClick={()=>onSelect(tool.id)}><span className="object"><ToolSprite type={tool.id}/></span><span className="tool-label">{tool.title}</span></button>)}</div></div></section>;
}
function GuideView({tool,onBack}) {
  const heading=useRef(null);
  useEffect(()=>{heading.current?.focus();window.scrollTo(0,0)},[tool.id]);
  return <article className="guide">
    <button className="back-button" onClick={onBack}>← Back to Toolbox</button>
    <div className="guide-heading"><h1 ref={heading} tabIndex={-1}>{tool.title}</h1><div className="guide-object"><ToolSprite type={tool.id}/></div></div>
    <p className="definition">{tool.description}</p>
    <ul className="guide-points">{tool.points.map(([label,text])=><li key={label}><strong>{label}</strong> {text}</li>)}</ul>
    {tool.devices&&<details className="device-reference"><summary>Seven common devices <span aria-hidden="true">+</span></summary><dl>{tool.devices.map(([name,meaning])=><div key={name}><dt>{name}</dt><dd>{meaning}</dd></div>)}</dl></details>}
    {tool.id==='journalism'&&<figure className="pyramid"><figcaption>Inverted pyramid</figcaption><div>Essential facts</div><div>Supporting details</div><div>Background</div></figure>}
    <section className="example"><h2>Example</h2>{tool.example.map(([label,text])=><div className="example-line" key={label}><h3>{label}</h3><blockquote>{text}</blockquote></div>)}<p>{tool.note}</p></section>
  </article>;
}
function App(){
  const [selected,setSelected]=useState(null);
  const scrollPosition=useRef(0);
  function select(id){scrollPosition.current=window.scrollY;setSelected(id)}
  function back(){setSelected(null);requestAnimationFrame(()=>{window.scrollTo(0,scrollPosition.current);document.querySelector(`.tool-${selected}`)?.focus({preventScroll:true})})}
  useEffect(()=>{function escape(event){if(event.key==='Escape'&&selected)back()}window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape)},[selected]);
  return <main>{selected?<GuideView tool={tools.find(tool=>tool.id===selected)} onBack={back}/>:<Toolbox onSelect={select}/>}</main>;
}
createRoot(document.getElementById('root')).render(<App/>);
