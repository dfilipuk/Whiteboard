import './Workspace.css'
import { Sidebar } from './Sidebar';
import { Whiteboard } from './Whiteboard';

export function Workspace() {   
  return (
    <div className="workspace">
      <Sidebar />
      <Whiteboard />
    </div>
  )
}
