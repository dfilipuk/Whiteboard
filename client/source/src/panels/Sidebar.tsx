import './Sidebar.css'
import { ColorPicker } from '../components/ColorPicker';
import { SizePicker } from '../components/SizePicker';

export function Sidebar() {
  return (
    <div className="sidebar">
      <i className="sidebar__button las la-pen" style={{gridArea: '1 / 1 / 1 / 1'}}></i>
      <i className="sidebar__button las la-pencil-ruler" style={{gridArea: '2 / 1 / 2 / 1'}}></i>
      <i className="sidebar__button las la-fill-drip" style={{gridArea: '3 / 1 / 3 / 1'}}></i>
      <div style={{gridArea: '2 / 2 / 2 / 2', alignSelf: 'center'}}>
        <div className="size-picker-popup">
          <SizePicker />
        </div>
      </div>
      <div style={{gridArea: '3 / 2 / 3 / 2'}}>
        <div className="color-picker-popup">
          <ColorPicker />
        </div>
      </div>
    </div>
  );
}
