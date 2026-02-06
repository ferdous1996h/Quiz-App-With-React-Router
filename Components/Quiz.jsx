import { useEffect, useState, Fragment } from 'react';
import { decode } from 'html-entities';
import { clsx } from 'clsx';

export default function Quiz() {
  const [uniqueQ, setUniqueQ] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selection, setSelection] = useState({});
  const [gameOn, setGameOn] = useState(false);
  const [fetchTriger, setFetchTriger] = useState(0);
  const [point, setPoint] = useState(0);

  function shuffleArray(array) {
    return [...array].toSorted(() => Math.random() - 0.5);
  }

  function handlePunch(serial, select, currect) {
    setSelection((prev) => ({
      ...prev,
      [serial]: select,
    }));
    currect && setPoint((prev) => prev + 1);
  }
  function handleReset() {
    setUniqueQ([]);
    setChoices([]);
    setSelection({});
    setGameOn(false);
    setFetchTriger((prev) => prev + 1);
    setPoint(0);
  }
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=5&type=multiple`)
      .then((res) => res.json())
      .then((data) => {
        setUniqueQ(data.results);
        const multiOptions = data.results.map((ele) => {
          const correctAns = ele.correct_answer;
          console.log(correctAns);
          return shuffleArray([...ele.incorrect_answers, correctAns]);
        });
        setChoices(multiOptions);
      });
  }, [fetchTriger]);

  const spreedQuiz = uniqueQ.map((q, num) => {
    const correctOne = q.correct_answer;
    return (
      <section key={num}>
        <h3>{decode(q.question)}</h3>
        <div className="quiz_options">
          {choices[num]?.map((c, ind) => {
            const selected = selection[num] === c;
            const correct = correctOne === c;
            const allClass = clsx(
              selected && 'selected',
              gameOn && selected && correct && 'correct',
              gameOn && selected && !correct && 'incorrect',
              gameOn && correct && !selected && 'resultAns',
            );
            return (
              <Fragment key={ind}>
                <button
                  className={allClass}
                  onClick={() => handlePunch(num, c, correct)}
                  disabled={gameOn}
                >
                  {decode(c)}
                </button>
                {gameOn && selected && correct && '✔'}
                {gameOn && selected && !correct && '❌'}
              </Fragment>
            );
          })}
        </div>
        <div className="seperator"></div>
      </section>
    );
  });
  return (
    <main className="quiz_main">
      {/* <section>
        <h3>
          Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?
        </h3>
        <div className="quiz_options">
          <button>Mercury</button>
          <button>Venus</button>
          <button>Mars</button>
          <button>Saturn</button>
        </div>
        <div className="seperator"></div>
      </section> */}
      {spreedQuiz}

      {
        <section className="decide_Sec">
          {!gameOn && <button onClick={() => setGameOn(true)}>Check answers</button>}
          {gameOn && (
            <>
              <h3>You scored {point}/5 correct answers</h3>
              <button onClick={handleReset}>Play Again</button>
            </>
          )}
        </section>
      }
    </main>
  );
}
