import { NextPage } from 'next';
import Image from 'next/image';
import React, { useState, useLayoutEffect } from 'react'
import { getStaticProps } from '.';

export interface DisplayParams {
  info: object;
  x: number;
  y: number;
}

export const Display: NextPage<DisplayParams> = ({ info, x, y }) => {

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 100,
        pointerEvents: 'none',
        top: y,
        left: x,
        padding: '1ch',
        borderStyle: 'solid',
        border: '1px 1px',
        backgroundColor: '#FFF',
        fontFamily: 'sans-serif',
        fontSize: '16pt',
        color: `rgba(${info.color})`
      }}>
      {info.prompt}
      <br />
      <Image
        src={info.image_url}
        width={
          '512px'
        }
        height={
          '512px'
        }
      />
      <br />
    </div>
  );
}

