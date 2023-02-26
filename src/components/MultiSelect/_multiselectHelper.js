// Save a list of named combobox actions, for future readability
export const SelectActions = {
    Close: 0,
    CloseSelect: 1,
    First: 2,
    Last: 3,
    Next: 4,
    Open: 5,
    PageDown: 6,
    PageUp: 7,
    Previous: 8,
    Select: 9,
    Type: 10
  };

  
// map a key press to an action
export function getActionFromKey(event, menuOpen) {
    const { key, altKey, ctrlKey, metaKey } = event;
    const openKeys = ["ArrowDown", "ArrowUp", "Enter", " "]; // all keys that will do the default open action
    // handle opening when closed
    if (!menuOpen && openKeys.includes(key)) {
      return SelectActions.Open;
    }
  
    // home and end move the selected option when open or closed
    if (key === "Home") {
      return SelectActions.First;
    }
    if (key === "End") {
      return SelectActions.Last;
    }
  
    // handle typing characters when open or closed
    if (
      key === "Backspace" ||
      key === "Clear" ||
      (key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey)
    ) {
      return SelectActions.Type;
    }
  
    // handle keys when open
    if (menuOpen) {
      if (key === "ArrowUp" && altKey) {
        return SelectActions.CloseSelect;
      } else if (key === "ArrowDown" && !altKey) {
        return SelectActions.Next;
      } else if (key === "ArrowUp") {
        return SelectActions.Previous;
      } else if (key === "PageUp") {
        return SelectActions.PageUp;
      } else if (key === "PageDown") {
        return SelectActions.PageDown;
      } else if (key === "Escape") {
        return SelectActions.Close;
      } else if (key === "Enter" || key === " ") {
        return SelectActions.CloseSelect;
      }
    }
  }

  // get an updated option index after performing an action
export function getUpdatedIndex(currentIndex, maxIndex, action) {
    const pageSize = 10; // used for pageup/pagedown
  
    switch (action) {
      case SelectActions.First:
        return 0;
      case SelectActions.Last:
        return maxIndex;
      case SelectActions.Previous:
        return Math.max(0, currentIndex - 1);
      case SelectActions.Next:
        return Math.min(maxIndex, currentIndex + 1);
      case SelectActions.PageUp:
        return Math.max(0, currentIndex - pageSize);
      case SelectActions.PageDown:
        return Math.min(maxIndex, currentIndex + pageSize);
      default:
        return currentIndex;
    }
  }