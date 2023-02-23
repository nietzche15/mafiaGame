import React, { useCallback, useEffect, useRef, useState } from 'react'
import Carousel from 'react-material-ui-carousel'

export default function Rules() {
  useEffect(() => {
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className='box'>

      <Carousel indicators={true} autoPlay={true} height={430} interval={4000}>
        <div>
        <h3>Tip.</h3>
          소수의 마피아와 다수의 시민으로 나눈다. 시민은 자신 외 남들의 직업을 모르며 마피아끼리는 서로의 정체를 안다.
        </div>
        <div>
        <h3>Tip.</h3>
          게임의 목표는 상대측의 전멸이다. 마피아 수와 시민 수가 같아지기만 해도 시민측의 무기인 인민재판이 무력화되어 더 이상 게임을 진행할 의미가 없어지기 때문에 마피아의 승리로 결정한다.
        </div>
        <div>
        <h3>Tip.</h3>
          '낮'과 '밤'이 번갈아 진행되며, 낮에는 모두가 참여하는 인민재판으로, 밤에는 마피아들만의 비밀회의로 죽을 사람을 한 명 결정한다.
        </div>
        <div>
        <h3>Tip.</h3>
          일부 시민의 죽음은 불가피한 것이며 시민 하나하나의 목숨은 기본적으로 내다버리면서 소모되는 것이다.
        </div>
        <div>
        <h3>Tip.</h3>
          죽은 사람들은 딱히 할 게 없다. 특히 극초반에 죽어버린 참가자는 한 게임 내내 구경만 하게 된다.
        </div>
      </Carousel>
    </div>
  );
}