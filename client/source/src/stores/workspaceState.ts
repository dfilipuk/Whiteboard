import { action, makeObservable, observable } from 'mobx';

enum FocusTarget {
  Whiteboard,
  Sidebar,
  PopUp,
}

enum PopUpKind {
  PenColor,
  PenSize,
  BackgroundColor,
}

class WorkspaceState {
  focus: FocusTarget;

  popUp: PopUpKind | null;

  constructor(focus: FocusTarget, popUp: PopUpKind | null) {
    makeObservable(this, {
      focus: observable,
      popUp: observable,
      setFocus: action,
      setPopUp: action,
    });
    this.focus = focus;
    this.popUp = popUp;
  }

  setFocus(focus: FocusTarget) {
    this.focus = focus;
  }

  setPopUp(popUp: PopUpKind | null) {
    this.popUp = popUp;
  }
}

export { FocusTarget, PopUpKind, WorkspaceState };
