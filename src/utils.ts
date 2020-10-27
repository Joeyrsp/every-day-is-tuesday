import cc from "classcat";

export const mergeClasses = (props, element) => {
  element.props.class = cc([
    element.props.class,
    props.class
  ])
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
})
