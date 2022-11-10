import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { TextLayer } from '@deck.gl/layers';
import { OrbitView, } from '@deck.gl/core';
import { Display } from './display';

// Build deck
const INITIAL_VIEW_STATE = {
  zoom: 2,
  pitch: 100,
  rotationOrbit: 0,
  rotationX: 0,
};

const view = new OrbitView({
  id: 'orbit',
  controller: { dragPan: false, inertia: true },
  orbitAxis: 'Y',
  orthographic: true,
  dragMode: 'pan',
  inertia: 500,
  smooth: true,
  touchRotate: true,
  near: -100,
  far: 1100
});


export function Deck() {

  //Get data
  const [data, setData] = useState([]);
  const getData = () => {
    fetch(`finished.json`
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then(function(response) {
        // console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(() => {
    getData()
  }, [])

  const [hoverInfo, setHoverInfo] = useState([]);

  const layers = [
    new TextLayer({
      id: 'text-layer',
      data: data,
      getPosition: d => [d['X'], d['Y'], d['Z']],
      getText: d => d.prompt,
      getSize: d => d.size,
      getColor: d => d.color,

      getAngle: 0,
      billboard: false,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      maxWidth: 1000,
      characterSet: 'auto',

      pickable: true,
      onHover: info => setHoverInfo(info),
      onClick: info => window.open(`https://en.wikipedia.org/w/index.php?go=Go&search=${info.object.prompt.replace(
        / /g, '+')}`, "_blank")
    })
  ];


  return (
    <div className='gradient-background' style={{ height: '100vh', width: '100vw' }}>
      <DeckGL style={{ overflow: 'hidden', maxWidth: '100vw', maxHeight: '100vh' }}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        views={view}
      >
        {hoverInfo.object ?
          <Display
            info={hoverInfo.object}
            x={hoverInfo.x}
            y={hoverInfo.y}
          />
          : null
        }
      </DeckGL>
    </div>
  );
}

