import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  return (
    <MainScreen title={`Welcome Back ${userInfo && userInfo.name} ..`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {notes &&
        notes
          .filter((note) =>
            note.title.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((note) => (
            <Accordion key={note._id}>
              <Accordion.Item eventKey={note._id}>
                <Accordion.Header>
                  <Card.Header
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {note.title}
                    </span>
                    <div>
                      <Link
                        to={`/note/${note._id}`}
                        className="mx-2 btn btn-primary"
                      >
                        Edit
                      </Link>
                      <span
                        className="mx-2 btn btn-danger"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </span>
                    </div>
                  </Card.Header>
                </Accordion.Header>

                <Accordion.Body>
                  <h4>
                    <Badge bg="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <ReactMarkdown>{note.content}</ReactMarkdown>
                    <footer className="blockquote-footer mt-1">
                      Created On - {note.createdAt.substring(0, 10)}
                    </footer>
                  </blockquote>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))}
    </MainScreen>
  );
};

export default MyNotes;
