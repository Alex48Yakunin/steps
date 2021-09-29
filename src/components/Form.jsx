import { useState } from "react";
import PropTypes from "prop-types";

const Form = ({ onAddPosition }) => {

  const [form, setForm] = useState({   
    date: new Date(),
    km: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    onAddPosition(form);
    setForm({
      date: new Date(),
      km: ''
    });
  };


  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={onSubmit} action="" className="form">
      <div className="form__item">
          <label htmlFor="">Дата (мм-дд-гггг)</label>
          <input
              value={form.date}
              name="date"
              id="date"
              onChange={(e) => { 
                const { name, value } = e.target;
                setForm((prev) => ({ ...prev, [name]: value }));
                }}
              type="date" 
              data-date-format="DD MMMM YYYY" 
              className="form__input" 
              required />
      </div>
      <div className="form__item">
          <label htmlFor="">Пройдено км</label>
          <input 
              id="km" 
              name="km" 
              value={form.km} 
              onChange={onChange} 
              type="text" 
              className="form__input" 
              required />
      </div>
      <div className="form__item">
          <button className="form__btn">OK</button>
      </div>
    </form>
  )
}

Form.propTypes = {
  onAddPosition: PropTypes.func
};

Form.defaultProps = {
  onAddPosition: () => {}
};

export default Form;