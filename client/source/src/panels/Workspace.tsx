import React from 'react';

import { Sidebar } from './Sidebar';
import { Whiteboard } from './Whiteboard';

import './Workspace.css';

const Workspace: React.FC = () => {
  return (
    <div className="workspace">
      <Sidebar />
      <Whiteboard />
    </div>
  );
};

export { Workspace };
