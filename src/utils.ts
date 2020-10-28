import cc from "classcat";

export const mergeProps = (props, element) => {
  element.props = {
    ...element.props,
    ...props,
    class: cc([
      element.props.class,
      props.class
    ])
  }
  element.key = props.key;
  return element;
}

export const pathify = (branch) => {
  if (typeof branch != 'object') {
    return [branch];
  } else {
    branch = Object.entries(branch).map((entry) => [entry[0], ...pathify(entry[1])]);
    if (branch.length == 1) {
      return branch[0];
    } else {
      return [branch];
    }
  }
}

export const machineHasAll = (machine, query) => {
  let path = pathify(machine).flat(Infinity);

  return [query].flat().reduce((acc, cur) => acc && path.includes(cur), true);
}

export const newBubble = (type: string) => ({
  type,
  state: 'idle',
  x: Math.random() * 30 - 15,
  y: window.innerHeight - 25 + 50,
  dx: 0,
  dy: 0,
  rand1: Math.random(),
  size: type == 'custom' ? 60 : 50,
})

export const clamp = (min: number, x: number, max: number) => x < min ? min : x > max ? max : x;

export const sign = (x: number) => x === 0 ? 0 : x > 0 ? 1 : -1;
