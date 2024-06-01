const CheckboxComponent = ({ isRound }) => {
    const checkboxStyle = {
      width: '20px',
      height: '20px',
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: '#fff',
      border: '2px solid #ccc',
      borderRadius: isRound ? '50%' : '0'
    };
  
    const checkboxCheckedStyle = {
      backgroundColor: '#55a7ff'
    };
  
    return (
      <div className="checkbox-container">
        <input type="checkbox" id="checkbox1" className="hidden-checkbox" />
        <label htmlFor="checkbox1" style={checkboxStyle} />
      </div>
    );
  }
  
  export default CheckboxComponent;