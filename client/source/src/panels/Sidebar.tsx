import React, { useState } from 'react';
import { ColorPicker, SizePicker } from 'components';

import './Sidebar.css';

enum PopUp {
  PenColor,
  PenSize,
  BackgroundColor,
}

const Sidebar: React.FC = () => {
  const [currentPopUp, setCurrentPopUp] = useState<PopUp | null>(null);
  const togglePopUp = (popup: PopUp) =>
    currentPopUp === popup ? setCurrentPopUp(null) : setCurrentPopUp(popup);

  return (
    <div className="sidebar">
      <i
        className="sidebar__button sidebar__button--pen-color las la-pen"
        onClick={() => togglePopUp(PopUp.PenColor)}
      ></i>
      <i
        className="sidebar__button sidebar__button--pen-size las la-pencil-ruler"
        onClick={() => togglePopUp(PopUp.PenSize)}
      ></i>
      <i
        className="sidebar__button sidebar__button--background-color las la-fill-drip"
        onClick={() => togglePopUp(PopUp.BackgroundColor)}
      ></i>
      {currentPopUp === PopUp.PenColor && (
        <div className="pen-color-popup">
          <div className="pen-color-popup__content">
            <ColorPicker />
          </div>
        </div>
      )}
      {currentPopUp === PopUp.PenSize && (
        <div className="pen-size-popup">
          <div className="pen-size-popup__content">
            <SizePicker />
          </div>
        </div>
      )}
      {currentPopUp === PopUp.BackgroundColor && (
        <div className="background-color-popup">
          <div className="background-color-popup__content">
            <ColorPicker />
          </div>
        </div>
      )}
    </div>
  );
};

export { Sidebar };
