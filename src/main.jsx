import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ToolSprite from './ToolSprite';
import Bench from './Bench';
import { tools } from './content';
import './styles.css';

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

