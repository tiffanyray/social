import React, {useContext} from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { IActivity } from "../../../App/Models/activity";
import { format } from "date-fns";
import { RootStoreContext } from "../../../App/Stores/rootStore";

const activityImageStyle = {
  filter: "brightness(30%)",
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white",
};

const ActivityDetailedHeader: React.FC<{ activity: IActivity }> = ({
  activity,
}) => {
  const rootStore = useContext(RootStoreContext)
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  
  return <Segment.Group>
    <Segment basic attached="top" style={{padding: "0"}}>
      <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
      />
      <Segment basic style={activityImageTextStyle}>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header
                  size="huge"
                  content={activity.title}
                  style={{color: "white"}}
              />
              <p>{format(activity.date, "eeee do MMMM")}</p>
              <p>
                Hosted by
                <strong> Tiffany</strong>
              </p>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Segment>
    <Segment>
      {activity.isHost ? (
          <Button
              as={Link}
              to={`/manage/${activity.id}`}
              color="orange"
          >
            Manage Event
          </Button>
      ) : activity.isGoing ? (
          <Button onClick={cancelAttendance} loading={loading}>Cancel attendance</Button>
      ) : (
          <Button onClick={attendActivity} color="teal" loading={loading}>Join Activity</Button>
      )}
    </Segment>
  </Segment.Group>
};

export default observer(ActivityDetailedHeader);
