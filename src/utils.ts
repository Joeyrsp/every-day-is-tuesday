import cc from "classcat";

export const mergeClasses = (props, element) => {
  element.props.class = cc([
    element.props.class,
    props.class
  ])
  return element;
}
