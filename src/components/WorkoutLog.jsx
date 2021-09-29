import { useState } from "react";
import Form from "./Form";
import moment from "moment";
import { nanoid } from "nanoid";


const WorkoutLog = () => {

  const [list, setList] = useState([]);

  const onAddPosition = (form) => {
    let newList = [],
        journalEntry = false;

    list.forEach(item => {
      if(item.date === form.date) {
        journalEntry = true;
      }
    });

    if(journalEntry === true) {
      newList = list.map(item => {
        if (item.date === form.date) {
          item.km = parseInt(form.km) + parseInt(item.km);
        }
        return item;
      });
    } else {
      newList = [...list,{
          id: nanoid(),
          date: form.date,
          km: form.km,
        },
      ];
    }

    newList.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));
    setList(newList);
  }

  const onDeletePosition = (id) => {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  };


  return (
    <div className="workout-log">
        <header className="workout-log__header">
            <Form  onAddPosition={onAddPosition}/>
        </header>

        <main className="workout-log__main">
            <div className="journal">
              <header className="journal__header">
                <div className="journal__item">Дата</div>
                <div className="journal__item">Пройдено км</div>
                <div className="journal__item">Действия</div>
              </header>

              <main className="journal__main">
                    {list.map((item) => (
                      <div key={item.id} className="journal__main-row">
                        <div className="journal__item">{moment(item.date).format("DD.MM.YYYY")}</div>
                        <div className="journal__item">{item.km}</div>
                        <div className="journal__item">
                          <span className="journal__item-edit"></span>
                          <span className="journal__item-delete" onClick={() => onDeletePosition(item.id)}></span>
                        </div>
                      </div>
                    ))}
              </main>
            </div>
        </main>
    </div>
  )

}


export default WorkoutLog;