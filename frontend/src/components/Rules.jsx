import React, { useRef, useState } from 'react'


export default function Rules() {

  const [state, setState] = useState('첫번째')
  const rr1 = useRef();
  const rr2 = useRef();
  const rr3 = useRef();
  const rr4 = useRef();


  function r1() {
    setState('첫번째')
    rr1.current.style.width = '25px';
    rr2.current.style.width = '15px';
    rr3.current.style.width = '15px';
    rr4.current.style.width = '15px';
  }
  function r2() {
    setState('두번째')
    rr1.current.style.width = '15px';
    rr2.current.style.width = '25px';
    rr3.current.style.width = '15px';
    rr4.current.style.width = '15px';
  }
  function r3() {
    setState('세번째')
    rr1.current.style.width = '15px';
    rr2.current.style.width = '15px';
    rr3.current.style.width = '25px';
    rr4.current.style.width = '15px';
  }
  function r4() {
    setState('네번째')
    rr1.current.style.width = '15px';
    rr2.current.style.width = '15px';
    rr3.current.style.width = '15px';
    rr4.current.style.width = '25px';
  }

  return (
    <>
      <div className='box'>
        {state}
        <div className='rbox'>
          <div className='r1' ref={rr1} onClick={r1}></div>
          <div className='r2' ref={rr2} onClick={r2}></div>
          <div className='r3' ref={rr3} onClick={r3}></div>
          <div className='r4' ref={rr4} onClick={r4}></div>
        </div>
      </div>
    </>
  )
}
