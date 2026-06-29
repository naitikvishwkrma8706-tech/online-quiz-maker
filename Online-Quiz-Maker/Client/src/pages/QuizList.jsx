import { useEffect, useState } from "react";
import axios from "axios";

const QuizList = ({ setSelectedQuiz }) => {
  const [quizzes, setQuizzes] = useState([]);

  const [editQuiz, setEditQuiz] = useState(null);

  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    const res = await axios.get("https://online-quiz-maker-ewm4.vercel.app");

    setQuizzes(res.data);
  };

  const deleteQuiz = async (id) => {
    await axios.delete(( `https://online-quiz-maker-ewm4.vercel.app/api/quiz/delete/${id}`);

    fetchQuiz();
  };

  const updateQuiz = async () => {
    await axios.put(( `https://online-quiz-maker-ewm4.vercel.app/api/quiz/delete/${id}`, {
      title: editTitle,
    });

    setEditQuiz(null);

    fetchQuiz();
  };

  return (
    <div
      style={{
        width: "100%",

        maxWidth: "900px",

        margin: "40px auto",

        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",

          marginBottom: "40px",
        }}
      >
        Quiz List
      </h1>

      <div
        style={{
          display: "grid",

          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",

          gap: "25px",
        }}
      >
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            style={{
              background: "#fff",

              padding: "24px",

              borderRadius: "20px",

              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <h2>{quiz.title}</h2>

            <p>Questions: {quiz.questions.length}</p>

            <div
              style={{
                display: "flex",

                gap: "10px",

                marginTop: "20px",

                flexWrap: "wrap",
              }}
            >
              <button onClick={() => setSelectedQuiz(quiz)} style={green}>
                Start
              </button>

              <button
                onClick={() => {
                  setEditQuiz(quiz);

                  setEditTitle(quiz.title);
                }}
                style={yellow}
              >
                Edit
              </button>

              <button onClick={() => deleteQuiz(quiz._id)} style={red}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editQuiz && (
        <div
          style={{
            position: "fixed",

            inset: "0",

            background: "rgba(0,0,0,.4)",

            display: "flex",

            justifyContent: "center",

            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",

              padding: "30px",

              borderRadius: "14px",

              width: "90%",

              maxWidth: "400px",
            }}
          >
            <h2>Edit Quiz</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <button onClick={updateQuiz} style={green}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const green = {
  padding: "12px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const yellow = {
  padding: "12px",
  background: "#f39c12",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

const red = {
  padding: "12px",
  background: "#e74c3c",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
};

export default QuizList;
