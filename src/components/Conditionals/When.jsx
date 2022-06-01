
const When = ({ condition, children }) => {
  if (condition) {
    return children;
  }
  return null;
};


export default When;