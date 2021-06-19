import './Sidebar.css'

export function Sidebar() {
  return (
    <div className="sidebar">
      <i className="sidebar__button las la-pen" style={{gridArea: '1 / 1 / 1 / 1'}}></i>
      <i className="sidebar__button las la-pencil-ruler" style={{gridArea: '2 / 1 / 2 / 1'}}></i>
      <i className="sidebar__button las la-fill-drip" style={{gridArea: '3 / 1 / 3 / 1'}}></i>
      <div className="popup">
        <div className="popup__content"></div>
      </div>
    </div>
  );
}
