import React, { useContext, useEffect, useState, SyntheticEvent } from "react";
import { Header } from "../Features/Navigation/Header";
import { IActivity } from "./Models/activity";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../Features/activities/dashboard/ActivityDashboard";
import { LoadingComponent } from "../App/Api/Layout/LoadingComponent";
import agent from "./Api/agent";
import ActivityStore from "./Stores/activityStore";
import { observer } from "mobx-react-lite";

const App = () => {
  let activityStore = useContext(ActivityStore);

  let [activities, setActivities] = useState<IActivity[]>([]);
  let [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );
  let [editForm, setEditForm] = useState<boolean>(false);
  let [loading, setLoading] = useState<boolean>(true);
  let [submitting, setSubmitting] = useState<boolean>(false);
  let [target, setTarget] = useState("");

  const selectActivity = (id: string) => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const openCreateForm = () => {
    setSelectedActivity(null);
    setEditForm(true);
  };

  const createActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditForm(false);
      })
      .then(() => setSubmitting(false))
      .catch(err => {
        console.error(err);
      });
  };

  const editActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditForm(false);
      })
      .then(() => setSubmitting(false))
      .catch(err => {
        console.error(err);
      });
  };

  const deleteActivity = (
    id: string,
    event: SyntheticEvent<HTMLButtonElement>
  ) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false))
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading Activities..." inverted />;

  return (
    <div>
      <Header openForm={openCreateForm} />
      <Container style={{ marginTop: "6rem" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createActivity={createActivity}
          editActivity={editActivity}
          deleteActivity={deleteActivity}
          selectActivity={selectActivity}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          setEditForm={setEditForm}
          submitting={submitting}
          target={target}
        />
      </Container>
    </div>
  );
};

export default observer(App);
