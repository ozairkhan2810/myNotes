import { useEffect } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = ({ setSearch }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("userInfo", userInfo);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {}, [navigate, userInfo]);
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            myNotes
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form inline="true">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form>
          </Nav>

          {userInfo ? (
            <Nav
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Nav.Item>
                <Link
                  to="/mynotes"
                  className="mx-1"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  My Notes
                </Link>
              </Nav.Item>
              <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Link
                to="/mynotes"
                className="mx-1"
                style={{ color: "white", textDecoration: "none" }}
              >
                My Notes
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
