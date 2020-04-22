import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./HomePage.scss";
import { RootStoreContext } from "../../App/Stores/rootStore";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Social
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back ${user.displayName}`}
            />
            <Button as={Link} to="/activities" size="huge" inverted>
              Go to activities!
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Social" />
            <Button as={Link} to="/login" size="huge" inverted>
              Login
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default HomePage;
